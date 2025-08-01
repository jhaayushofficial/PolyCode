const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const executeJava = async (filePath, inputFilePath) => {
  const className = path.basename(filePath).split(".")[0]; // Class name is the filename without .java
  const outPath = path.join(outputPath, `${className}.class`);

  console.log(`Compiling: javac ${filePath}`);
  console.log(
    `Then running: cd ${outputPath} && java ${className} < ${inputFilePath}`
  );

  return new Promise((resolve, reject) => {
    // Use Windows-compatible command
    const isWindows = process.platform === "win32";
    const runCommand = isWindows
      ? `cd ${outputPath} && java ${className} < ${inputFilePath}`
      : `cd ${outputPath} && java ${className} < ${inputFilePath}`;

    exec(
      `javac ${filePath} -d ${outputPath} && ${runCommand}`,
      (error, stdout, stderr) => {
        if (error) {
          console.error("Execution error:", error);
          reject(
            new Error(`Compilation or execution failed: ${error.message}`)
          );
          return;
        }
        if (stderr) {
          console.error("stderr:", stderr);
          reject(new Error(`Program produced errors: ${stderr}`));
          return;
        }
        console.log("stdout:", stdout);
        resolve(stdout);
      }
    );
  });
};

module.exports = executeJava;
