const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

const dirInputs = path.join(__dirname, "inputs");

if (!fs.existsSync(dirInputs)) {
  fs.mkdirSync(dirInputs, { recursive: true });
}

const generateInputFile = (input) => {
  const jobId = uuid();
  const inputFileName = `${jobId}.txt`;
  const InputFilePath = path.join(dirInputs, inputFileName);
  fs.writeFileSync(InputFilePath, input);
  return InputFilePath;
};

module.exports = {
  generateInputFile,
};
