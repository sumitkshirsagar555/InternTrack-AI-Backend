const { PDFParse } = require("pdf-parse");

const { analyzeResume } = require("../services/geminiService");


// Analyze Resume PDF
const analyzeResumeController = async (req, res) => {

    try {

        // Check uploaded file
        if (!req.file) {

            return res.status(400).json({
                message: "Please upload a resume PDF"
            });

        }


        // Create PDF parser
        const parser = new PDFParse({
            data: req.file.buffer
        });


        // Extract text from PDF
        const pdfData = await parser.getText();


        // Destroy parser resources
        await parser.destroy();


        const resumeText = pdfData.text;


        // Check extracted text
        if (!resumeText || resumeText.trim().length < 20) {

            return res.status(400).json({
                message: "Could not extract enough text from the PDF"
            });

        }


        console.log(
            "Resume text extracted successfully"
        );


        // Send extracted text to Gemini
        const result = await analyzeResume(resumeText);


        // Send AI result
        res.status(200).json({

            message: "Resume analyzed successfully",

            analysis: result

        });


    } catch (error) {

        console.log(
            "Resume Analysis Error:",
            error
        );


        res.status(500).json({

            message: "Failed to analyze resume",

            error: error.message

        });

    }

};


module.exports = {
    analyzeResumeController
};