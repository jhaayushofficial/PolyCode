const fs = require("fs");
const path = require("path");

//This line imports a tool that lets your Node.js program run commands on your computer, like typing commands in the terminal.
const { exec } = require("child_process");

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = async (filePath, inputFilePath) => {
  const jobId = path.basename(filePath).split(".")[0];
  const outPath = path.join(outputPath, `${jobId}.exe`);

  console.log(`Executing: g++ ${filePath} -o ${outPath}`);
  console.log(
    `Then running: cd ${outputPath} && ${jobId}.exe < ${inputFilePath}`
  );

  //Promise = "I'll do this task and let you know when it's done"
  return new Promise((resolve, reject) => {
    // Use Windows-compatible command
    const isWindows = process.platform === "win32";
    const executableName = isWindows ? `${jobId}.exe` : `${jobId}.out`;
    const runCommand = isWindows
      ? `cd ${outputPath} && ${executableName} < ${inputFilePath}`
      : `cd ${outputPath} && ./${executableName} < ${inputFilePath}`;

    exec(
      `g++ ${filePath} -o ${outPath} && ${runCommand}`,
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
