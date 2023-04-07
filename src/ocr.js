const vision = require("@google-cloud/vision");
const { sendOCREmbed } = require("./discord");

const visionClient = new vision.ImageAnnotatorClient({
  keyFilename: "./ocr.json",
});

const solveOCR = async (channel, imageUrl) => {
  console.log("Solving OCR... 🔃");
  const [result] = await visionClient.textDetection(imageUrl);
  const detections = result.textAnnotations;
  const OCR = detections[0].description;
  sendOCREmbed(channel, OCR);
};

module.exports = { solveOCR };
