const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = async (filePath, inputFilePath) => {
  const jobId = path.basename(filePath).split(".")[0];
  const outPath = path.join(outputPath, `${jobId}.out`);

  console.log(`Executing: g++ ${filePath} -o ${outPath}`);
  console.log(
    `Then running: cd ${outputPath} && ${jobId}.out < ${inputFilePath}`
  );

  return new Promise((resolve, reject) => {
    exec(
      `g++ ${filePath} -o ${outPath} && cd ${outputPath} && ./` +
        jobId +
        `.out < ${inputFilePath}`,
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

module.exports = executeCpp;
