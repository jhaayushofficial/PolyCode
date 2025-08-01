const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const executePython = async (filePath, inputFilePath) => {
  console.log(`Executing: python ${filePath} < ${inputFilePath}`);

  return new Promise((resolve, reject) => {
    // Use Windows-compatible command
    const isWindows = process.platform === "win32";
    const pythonCommand = isWindows ? "python" : "python3";
    const runCommand = `${pythonCommand} ${filePath} < ${inputFilePath}`;

    exec(runCommand, (error, stdout, stderr) => {
      if (error) {
        console.error("Execution error:", error);
        reject(new Error(`Execution failed: ${error.message}`));
        return;
      }
      if (stderr) {
        console.error("stderr:", stderr);
        reject(new Error(`Program produced errors: ${stderr}`));
        return;
      }
      console.log("stdout:", stdout);
      resolve(stdout);
    });
  });
};

module.exports = executePython;
