// const { GoogleGenAI } = require("@google/genai");

// const ai = new GoogleGenAI({
//     apiKey: process.env.GEMINI_API_KEY
// });


// const analyzeResume = async (resumeText) => {

//     const prompt = `
// You are an expert technical recruiter and professional resume analyzer.

// Analyze the following resume carefully and provide a practical assessment for software and IT job opportunities.

// RESUME:
// ${resumeText}

// Return the result in this exact JSON format:

// {
//     "score": 0,
//     "summary": "",
//     "skills": [],
//     "missingSkills": [],
//     "strengths": [],
//     "improvements": [],
//     "atsKeywords": []
// }

// Rules:
// - score must be between 0 and 100.
// - skills should contain important technical and professional skills actually found in the resume.
// - missingSkills should contain useful skills that would improve the candidate's profile for relevant software/IT roles.
// - Recommend missing skills based on the candidate's existing skills, projects, education, and likely job roles.
// - Do not invent experience, projects, certifications, or skills that are not present in the resume.
// - strengths should contain strong and relevant points from the resume.
// - improvements should contain practical and specific suggestions.
// - atsKeywords should contain relevant ATS keywords for the candidate's profile.
// - Keep the analysis relevant to the candidate's actual resume.
// - Return ONLY valid JSON.
// - Do not use markdown or code fences.
// `;


//     const response = await ai.models.generateContent({
//         model: "gemini-3.6-flash",
//         contents: prompt
//     });


//     const text = response.text;


//     const cleanText = text
//         .replace(/```json/g, "")
//         .replace(/```/g, "")
//         .trim();


//     try {

//         return JSON.parse(cleanText);

//     } catch (error) {

//         console.error("Invalid JSON received from Gemini");

//         throw new Error(
//             "AI returned an invalid analysis format"
//         );

//     }

// };


// module.exports = {
//     analyzeResume
// };




const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const sleep = (ms) =>
    new Promise((resolve) => setTimeout(resolve, ms));

const analyzeResume = async (resumeText) => {
    const prompt = `
You are an expert technical recruiter and professional resume analyzer.

Analyze the following resume for software and IT job opportunities.

RESUME:
${resumeText}

Return the result in this exact JSON format:
{
    "score": 0,
    "summary": "",
    "skills": [],
    "missingSkills": [],
    "strengths": [],
    "improvements": [],
    "atsKeywords": []
}

Rules:
- score must be between 0 and 100.
- Include only skills actually found in the resume.
- Recommend relevant missing skills based on the candidate's profile.
- Do not invent experience, projects, certifications, or skills.
- Give practical and specific improvements.
- Return only valid JSON without markdown.
`;

    const models = [
        process.env.GEMINI_MODEL || "gemini-3.6-flash",
        process.env.GEMINI_FALLBACK_MODEL || "gemini-3.5-flash"
    ].filter((model, index, arr) =>
        arr.indexOf(model) === index
    );

    let lastError;

    for (const model of models) {
        for (let attempt = 0; attempt < 3; attempt++) {
            try {
                console.log(
                    `Resume analysis: model=${model}, attempt=${attempt + 1}`
                );

                const response = await ai.models.generateContent({
                    model,
                    contents: prompt,
                    config: {
                        responseMimeType: "application/json",
                        maxOutputTokens: 4096
                    }
                });

                const text = response.text;

                if (!text) {
                    throw new Error("Gemini returned an empty response");
                }

                const result = JSON.parse(text);

                const requiredKeys = [
                    "score",
                    "summary",
                    "skills",
                    "missingSkills",
                    "strengths",
                    "improvements",
                    "atsKeywords"
                ];

                for (const key of requiredKeys) {
                    if (!(key in result)) {
                        throw new Error(
                            `Gemini response is missing field: ${key}`
                        );
                    }
                }

                return result;

            } catch (error) {
                lastError = error;

                const status = Number(
                    error.status || error.code || 0
                );

                console.error(
                    `Gemini error on ${model}, attempt ${attempt + 1}:`,
                    status,
                    error.message
                );

                const retryable =
                    status === 429 ||
                    status === 500 ||
                    status === 502 ||
                    status === 503 ||
                    status === 504 ||
                    status === 0;

                if (!retryable) {
                    break;
                }

                if (attempt < 2) {
                    const delay = Math.min(
                        2000 * (2 ** attempt),
                        10000
                    );

                    await sleep(delay);
                }
            }
        }

        console.warn(`Trying next model after failure: ${model}`);
    }

    throw new Error(
        `Resume analysis failed after retries: ${
            lastError?.message || "Unknown Gemini API error"
        }`
    );
};

module.exports = {
    analyzeResume
};
