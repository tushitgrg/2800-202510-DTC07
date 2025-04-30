const {GoogleGenerativeAI}  = require('@google/generative-ai')
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getGeminiOutput = async(filePart, prompt)=>{

    const model = genAI.getGenerativeModel({ model: 'models/gemini-2.0-flash' });

    const result = await model.generateContent([
      { text: prompt },
      filePart,
    ]);
    const response = await result.response;
    let text = response.text()
    text = text.replace(/```json|```/g, '').trim()
    return JSON.parse(text)
}


module.exports = {getGeminiOutput}