import { useState } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-java";
import "prismjs/components/prism-python";
import "prismjs/themes/prism.css";
import axios from "axios";

function CodeEditor({ user, onLogout }) {
  // State to manage user's code, input, output, and loading status
  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState(`#include <bits/stdc++.h>
using namespace std;

int main() {
    //Write your code here
    return 0;
}`);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Function to send code to backend for compilation and execution
  const handleSubmit = async () => {
    if (isLoading) return;

    setIsLoading(true);
    setOutput("");

    const payload = {
      language,
      code,
      input,
    };

    try {
      const backendUrl =
        import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";
      console.log("Backend URL:", backendUrl);
      const { data } = await axios.post(`${backendUrl}/run`, payload);
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

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    onLogout();
  };

  // Function to handle language change
  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);

    // Set default code template based on language
    const templates = {
      cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    //Write your code here
    return 0;
}`,
      c: `#include <stdio.h>

int main() {
    //Write your code here
    return 0;
}`,
      java: `public class Main {
    public static void main(String[] args) {
        // Write your code here
    }
}
`,
      python: `def main():
    # Write your code here
    pass

if __name__ == "__main__":
    main()
`,
    };

    setCode(templates[newLanguage] || templates.cpp);
  };

  // Alternative Python template for single-line input
  const getAlternativePythonTemplate = () => {
    return `#Write your code here
# For single-line input (e.g., "2 3")
print("Enter two numbers separated by space:")
a, b = map(int, input().split())
sum = a + b
print("Sum =", sum)`;
  };

  // Get file extension for display
  const getFileExtension = () => {
    const extensions = {
      cpp: "main.cpp",
      c: "main.c",
      java: "Main.java",
      python: "main.py",
    };
    return extensions[language] || "main.cpp";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-gray-100 py-4 px-4 lg:px-16 font-sans">
      {/* Header Section */}
      <div className="text-center mb-8 pt-2">
        <div className="flex justify-between items-center mb-4">
          <div className="text-left">
            <p className="text-gray-300 text-sm">
              Welcome, {user.firstname} {user.lastname}!
            </p>
            <p className="text-gray-400 text-xs">{user.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm transition-colors"
          >
            Logout
          </button>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
          PolyCode
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Write, compile, and run code in C++, C, Java, and Python with
          real-time execution. Test your algorithms with custom input.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
        {/* Code Editor Section */}
        <div className="lg:w-1/2 space-y-6">
          {/* Language Selector */}
          <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 overflow-hidden">
            <div className="bg-gray-700 px-4 py-3 border-b border-gray-600">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-gray-300 text-sm ml-4 font-medium">
                    {getFileExtension()}
                  </span>
                </div>
                <select
                  value={language}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                  className="bg-gray-600 text-gray-200 px-3 py-1 rounded-md text-sm border border-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="cpp">C++</option>
                  <option value="c">C</option>
                  <option value="java">Java</option>
                  <option value="python">Python</option>
                </select>
              </div>
            </div>
            <div style={{ height: "450px", overflowY: "auto" }}>
              <Editor
                value={code}
                onValueChange={setCode}
                highlight={(code) => {
                  const languageMap = {
                    cpp: languages.cpp || languages.clike,
                    c: languages.c || languages.clike,
                    java: languages.java,
                    python: languages.python,
                  };
                  return highlight(
                    code,
                    languageMap[language] || languages.clike
                  );
                }}
                padding={16}
                style={{
                  fontFamily: '"JetBrains Mono", "Fira Code", monospace',
                  fontSize: 14,
                  height: "100%",
                  overflowY: "auto",
                  outline: "none",
                  backgroundColor: "#0f172a",
                  color: "#e2e8f0",
                }}
              />
            </div>
          </div>

          {/* Run button with enhanced styling */}
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl text-white font-semibold text-lg transition-all duration-300 transform ${
              isLoading
                ? "bg-gray-600 cursor-not-allowed scale-95"
                : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105 shadow-lg hover:shadow-xl"
            }`}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                <span>Compiling & Running...</span>
              </>
            ) : (
              <>
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.6 3.11a.375.375 0 0 1-.56-.327V8.887c0-.285.308-.465.56-.326l5.6 3.11z"
                  />
                </svg>
                <span>Run Code</span>
              </>
            )}
          </button>
        </div>

        {/* Input and Output Section */}
        <div className="lg:w-1/2 space-y-6">
          {/* Input Box for program input */}
          <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 overflow-hidden">
            <div className="bg-gray-700 px-4 py-3 border-b border-gray-600">
              <h3 className="text-gray-200 font-semibold flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                  />
                </svg>
                Program Input
              </h3>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={6}
              className="w-full p-4 bg-gray-800 text-gray-100 border-0 resize-none focus:outline-none focus:ring-0"
              placeholder="Enter your input here (optional)..."
              style={{ fontFamily: '"JetBrains Mono", monospace' }}
            />
          </div>

          {/* Output Display */}
          <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 overflow-hidden">
            <div className="bg-gray-700 px-4 py-3 border-b border-gray-600">
              <h3 className="text-gray-200 font-semibold flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Output
              </h3>
            </div>
            <div className="p-4 h-32 bg-gray-800 border-0 overflow-y-auto font-mono text-sm text-gray-100">
              {output ? (
                <pre className="whitespace-pre-wrap">{output}</pre>
              ) : (
                <span className="text-gray-500">
                  Output will appear here...
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CodeEditor;
