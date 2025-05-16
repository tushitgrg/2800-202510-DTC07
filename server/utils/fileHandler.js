function processFile(file) {
  const pdfBuffer = file.buffer;

  const filePart = {
    inlineData: {
      data: pdfBuffer.toString("base64"),
      mimeType: "application/pdf",
    },
  };
  return filePart;
}
module.exports = { processFile };
