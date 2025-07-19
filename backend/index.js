const express = require("express");
const cors = require("cors");
const app = express();
const { generateFile } = require("./generateFile");
const executeCpp = require("./executeCpp");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/run", async (req, res) => {
  // const code = req.body.code;
  // const language = req.body.language;

  const { language = "cpp", code } = req.body;

  if (code == undefined) {
    return res.status(400).json({ success: false, error: "Empty code body" });
  }

  try {
    const filePath = generateFile(language, code);
    console.log("filePath", filePath);
    const output = await executeCpp(filePath);
    res.json({ filePath, output });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
