const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

//This creates a file path to a folder called codes
const dirCodes = path.join(__dirname, "codes");

if (!fs.existsSync(dirCodes)) {
  fs.mkdirSync(dirCodes, { recursive: true });
}

const generateFile = (language, code) => {
  const jobId = uuid();

  // For Java, extract class name and use it as filename
  if (language === "java") {
    const classMatch = code.match(/public\s+class\s+(\w+)/);
    if (classMatch) {
      const className = classMatch[1];
      const fileName = `${className}.java`;
      const filePath = path.join(dirCodes, fileName);
      fs.writeFileSync(filePath, code);
      return filePath;
    }
  }

  // For other languages, use UUID as filename with correct extensions
  const extensions = {
    cpp: "cpp",
    c: "c",
    java: "java",
    python: "py",
  };

  const extension = extensions[language] || language;
  const fileName = `${jobId}.${extension}`;
  const filePath = path.join(dirCodes, fileName);
  fs.writeFileSync(filePath, code);
  return filePath;
};

module.exports = {
  generateFile,
};
