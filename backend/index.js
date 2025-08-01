const express = require("express");
const cors = require("cors");
const app = express();
const { generateFile } = require("./generateFile");
const executeCpp = require("./executeCpp");
const executeJava = require("./executeJava");
const executePython = require("./executePython");
const { generateInputFile } = require("./generateInputFile");
const DBConnection = require("./database/db");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

DBConnection();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/register", async (req, res) => {
  //get all the dat from the frontend
  const { firstname, lastname, email, password } = req.body;

  //check that all the data already exists
  if (!(firstname && lastname && email && password)) {
    return res.status(400).send("All fields are required");
  }

  //check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  //hashing/encrypt the password
  const hashedPassword = await bcrypt.hash(password, 10);

  //save the user in the db
  const user = await User.create({
    firstname,
    lastname,
    email,
    password: hashedPassword,
  });

  //generate a token for the user and send
  const token = jwt.sign({ id: user._id, email }, process.env.SECRET_KEY, {
    expiresIn: "2h",
  });

  user.token = token;
  user.password = undefined;

  res.status(200).json({ message: "You are registered successfully", user });
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if all fields are provided
    if (!(email && password)) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate token
    const token = jwt.sign({ id: user._id, email }, process.env.SECRET_KEY, {
      expiresIn: "2h",
    });

    user.token = token;
    user.password = undefined;

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/run", async (req, res) => {
  const { language = "cpp", code, input } = req.body;

  console.log("Received request:", {
    language,
    code: code ? code.substring(0, 100) + "..." : "undefined",
    input,
  });

  if (code == undefined) {
    return res.status(400).json({ success: false, error: "Empty code body" });
  }

  // Validate supported languages
  const supportedLanguages = ["cpp", "c", "java", "python"];
  if (!supportedLanguages.includes(language)) {
    return res.status(400).json({
      success: false,
      error: `Language '${language}' is not supported. Supported languages: ${supportedLanguages.join(
        ", "
      )}`,
    });
  }

  try {
    console.log("Generating file...");
    const filePath = generateFile(language, code);
    console.log("File generated at:", filePath);

    console.log("Generating input file...");
    const inputFilePath = generateInputFile(input);
    console.log("Input file generated at:", inputFilePath);

    console.log(`Executing ${language} code...`);
    let output;

    switch (language) {
      case "cpp":
      case "c":
        output = await executeCpp(filePath, inputFilePath);
        break;
      case "java":
        output = await executeJava(filePath, inputFilePath);
        break;
      case "python":
        output = await executePython(filePath, inputFilePath);
        break;
      default:
        throw new Error(`Language '${language}' is not supported`);
    }

    console.log("Execution completed, output:", output);

    res.json({ success: true, filePath, inputFilePath, output });
  } catch (error) {
    console.error("Error details:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Unknown error occurred",
    });
  }
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
