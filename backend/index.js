const express = require("express");
const cors = require("cors");
const app = express();
const { generateFile } = require("./generateFile");
const executeCpp = require("./executeCpp");
const { generateInputFile } = require("./generateInputFile");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/run", async (req, res) => {
  // const code = req.body.code;
  // const language = req.body.language;

  const { language = "cpp", code, input } = req.body;

  console.log("Received request:", {
    language,
    code: code ? code.substring(0, 100) + "..." : "undefined",
    input,
  });

  if (code == undefined) {
    return res.status(400).json({ success: false, error: "Empty code body" });
  }

  try {
    console.log("Generating file...");
    const filePath = generateFile(language, code);
    console.log("File generated at:", filePath);

    console.log("Generating input file...");
    const inputFilePath = generateInputFile(input);
    console.log("Input file generated at:", inputFilePath);

    console.log("Executing C++ code...");
    const output = await executeCpp(filePath, inputFilePath);
    console.log("Execution completed, output:", output);

    res.json({ success: true, filePath, inputFilePath, output });
  } catch (error) {
    console.error("Error details:", error);
    res
      .status(500)
      .json({
        success: false,
        error: error.message || "Unknown error occurred",
      });
  }
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
