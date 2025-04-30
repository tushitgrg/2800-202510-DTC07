const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getGeminiOutput = async(filePart, prompt)=>{

    const model = genAI.getGenerativeModel({ model: 'models/gemini-2.0-flash' });

    const result = await model.generateContent([
      { text: prompt },
      filePart,
    ]);
    const response = await result.response;
    return response.text()
}

