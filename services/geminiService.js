const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});


const analyzeResume = async (resumeText) => {

    const prompt = `
You are an expert technical recruiter and professional resume analyzer.

Analyze the following resume carefully and provide a practical assessment for software and IT job opportunities.

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
- skills should contain important technical and professional skills actually found in the resume.
- missingSkills should contain useful skills that would improve the candidate's profile for relevant software/IT roles.
- Recommend missing skills based on the candidate's existing skills, projects, education, and likely job roles.
- Do not invent experience, projects, certifications, or skills that are not present in the resume.
- strengths should contain strong and relevant points from the resume.
- improvements should contain practical and specific suggestions.
- atsKeywords should contain relevant ATS keywords for the candidate's profile.
- Keep the analysis relevant to the candidate's actual resume.
- Return ONLY valid JSON.
- Do not use markdown or code fences.
`;


    const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt
    });


    const text = response.text;


    const cleanText = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();


    try {

        return JSON.parse(cleanText);

    } catch (error) {

        console.error("Invalid JSON received from Gemini");

        throw new Error(
            "AI returned an invalid analysis format"
        );

    }

};


module.exports = {
    analyzeResume
};