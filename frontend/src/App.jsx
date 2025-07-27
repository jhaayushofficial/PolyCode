import { useState } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/themes/prism.css";
import axios from "axios";
import "./App.css";

function App() {
  // State to manage user's C++ code, input, output, and loading status
  const [code, setCode] = useState(
    `#include <iostream>\nusing namespace std;\n\nint main() {\n    int num1, num2, sum;\n    cin >> num1 >> num2;\n    sum = num1 + num2;\n    cout << \"The sum of the two numbers is: \" << sum;\n    return 0;\n}`
  );
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Function to send code to backend for compilation and execution
  const handleSubmit = async () => {
    if (isLoading) return;

    setIsLoading(true);
    setOutput("");

    const payload = {
      language: "cpp",
      code,
      input,
    };

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const { data } = await axios.post(backendUrl, payload);
      setOutput(data.output);
    } catch (error) {
      // Handle different types of errors and show user-friendly messages
      if (error.response) {
        setOutput(
          `Error: ${error.response.data.error || "Server error occurred"}`
        );
      } else if (error.request) {
        setOutput("Error: Could not connect to server.");
      } else {
        setOutput(`Error: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "0",
        margin: "0",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: "48px 16px 0 16px",
        }}
      >
        <div
          style={{
            background: "#fff",
            borderRadius: 24,
            boxShadow: "0 8px 32px rgba(76, 81, 255, 0.12)",
            padding: "40px 32px 32px 32px",
            marginTop: 32,
          }}
        >
          <h1
            style={{
              fontSize: 40,
              fontWeight: 800,
              textAlign: "center",
              marginBottom: 32,
              background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: 1.5,
            }}
          >
            C++ Code Compiler
          </h1>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 32,
              flexWrap: "wrap",
            }}
          >
            {/* Code Editor Section */}
            <div style={{ flex: 1, minWidth: 320 }}>
              <div
                style={{
                  borderRadius: 12,
                  boxShadow: "0 2px 8px rgba(76, 81, 255, 0.08)",
                  border: "1px solid #e2e8f0",
                  background: "#f8fafc",
                  overflow: "hidden",
                  minHeight: 350,
                  marginBottom: 16,
                }}
              >
                <Editor
                  value={code}
                  onValueChange={setCode}
                  highlight={(code) =>
                    highlight(code, languages.cpp || languages.clike)
                  }
                  padding={16}
                  style={{
                    fontFamily: "Fira Code, monospace",
                    fontSize: 15,
                    minHeight: 350,
                    background: "#f8fafc",
                    outline: "none",
                  }}
                />
              </div>
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                style={{
                  width: "100%",
                  padding: "12px 0",
                  borderRadius: 8,
                  fontWeight: 700,
                  fontSize: 18,
                  background: isLoading
                    ? "#a0aec0"
                    : "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
                  color: "#fff",
                  border: "none",
                  boxShadow: isLoading
                    ? "none"
                    : "0 2px 8px rgba(76, 81, 255, 0.10)",
                  cursor: isLoading ? "not-allowed" : "pointer",
                  transition: "background 0.2s, box-shadow 0.2s",
                  marginTop: 8,
                }}
              >
                {isLoading ? "Running..." : "Run Code"}
              </button>
            </div>

            {/* Input and Output Section */}
            <div
              style={{
                flex: 1,
                minWidth: 320,
                display: "flex",
                flexDirection: "column",
                gap: 24,
              }}
            >
              <div>
                <label
                  style={{
                    fontWeight: 600,
                    color: "#4c51bf",
                    marginBottom: 6,
                    display: "block",
                  }}
                >
                  Program Input
                </label>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  rows={5}
                  style={{
                    width: "100%",
                    padding: 12,
                    borderRadius: 8,
                    border: "1px solid #e2e8f0",
                    fontSize: 15,
                    background: "#f8fafc",
                    resize: "none",
                  }}
                  placeholder="Enter input (optional)"
                />
              </div>
              <div>
                <label
                  style={{
                    fontWeight: 600,
                    color: "#4c51bf",
                    marginBottom: 6,
                    display: "block",
                  }}
                >
                  Output
                </label>
                <div
                  style={{
                    minHeight: 80,
                    background: "#f3f0fa",
                    border: "1.5px solid #d6bcfa",
                    borderRadius: 8,
                    padding: 14,
                    fontFamily: "Fira Mono, monospace",
                    fontSize: 16,
                    color: "#4c51bf",
                    boxShadow: "0 1px 4px rgba(76, 81, 255, 0.07)",
                    overflowY: "auto",
                  }}
                >
                  {output ? output : "Output will appear here..."}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
