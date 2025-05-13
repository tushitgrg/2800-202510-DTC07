const PDFDocument = require('pdfkit');
const { PassThrough } = require("stream");
const { YoutubeTranscript } = require('youtube-transcript');
async function getTranscriptAsFilePart(videoId) {
    try {
        let transcript = await YoutubeTranscript.fetchTranscript(videoId);
        transcript = transcript.slice(0, 4000)

        const doc = new PDFDocument();
        const stream = new PassThrough();
        doc.pipe(stream);

        doc.fontSize(20).text(`Transcript for Video ID: ${videoId}`, { underline: true });
        doc.moveDown();

        transcript.forEach((item) => {
            const date = new Date(null);
            date.setSeconds(item.duration);
            const time = date.toISOString().substr(11, 8);
            doc.fontSize(12).text(`[${time}] ${item.text}`);
        });

        doc.end();
        const chunks = [];
        return new Promise((resolve, reject) => {
            stream.on("data", (chunk) => chunks.push(chunk));
            stream.on("end", () => {
                const buffer = Buffer.concat(chunks);
                resolve({
                    inlineData: {
                        data: buffer.toString("base64"),
                        mimeType: "application/pdf",
                    },
                });
            });
            stream.on("error", reject);
        });
    }
    catch(e) {
        console.log(e)
        return null
    }
}
module.exports = { getTranscriptAsFilePart }