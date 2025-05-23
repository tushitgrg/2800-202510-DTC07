/**
 * Processes a file buffer into a format suitable for API requests,
 * specifically for inline PDF data.
 *
 * @param {Object} file - The file object, expected to contain a `buffer` property.
 * @param {Buffer} file.buffer - The raw buffer content of the file (e.g., a PDF).
 * @returns {Object} An object formatted for API consumption, containing base64 encoded inline data.
 */
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
