# Create new README for PolyCode

@"

# PolyCode - Multi-Language Online Code Compiler

A modern, full-stack web application that provides an interactive online code compiler supporting multiple programming languages. Built with React, Node.js, and MongoDB, it offers a seamless coding experience with real-time compilation and execution.

## ✨ Key Features

### Multi-Language Support

- **C++** - Full compilation and execution with g++
- **C** - Complete C language support with gcc
- **Java** - Java compilation and runtime with javac/java
- **Python** - Python script execution with python/python3

### User Authentication System

- **Secure Registration & Login** - JWT-based authentication
- **User Session Management** - Persistent login sessions
- **Protected Code Editor** - Only accessible to authenticated users

### Advanced Code Editor

- **Syntax Highlighting** - Language-specific code highlighting
- **Real-time Compilation** - Instant code execution
- **Custom Input Support** - Test your code with custom inputs
- **Error Handling** - Comprehensive error messages and debugging

### Modern UI/UX

- **Responsive Design** - Works on desktop, tablet, and mobile
- **Dark Theme** - Eye-friendly dark gradient interface
- **Interactive Elements** - Smooth animations and transitions
- **Language Selection** - Easy switching between programming languages

## 🛠️ Technology Stack

### Frontend

- **React 19** - Modern React with hooks and functional components
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API communication
- **Prism.js** - Syntax highlighting library

### Backend

- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing and security
- **Child Process** - Code compilation and execution

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud)
- C++ compiler (g++)
- Java JDK (javac/java)
- Python (python/python3)

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/jhaayushofficial/PolyCode.git
   cd PolyCode
   \`\`\`

2. **Backend Setup**
   \`\`\`bash
   cd backend
   npm install

   # Create .env file with MongoDB connection and JWT secret

   npm start
   \`\`\`

3. **Frontend Setup**
   \`\`\`bash
   cd frontend
   npm install
   # Create .env file with backend URL
   npm run dev
   \`\`\`

### Environment Variables

**Backend (.env)**
\`\`\`env
MONGO_URL=mongodb://localhost:27017/polycode
SECRET_KEY=your_jwt_secret_key
PORT=8000
\`\`\`

**Frontend (.env)**
\`\`\`env
VITE_BACKEND_URL=http://localhost:8000
\`\`\`

## 🎯 Use Cases

- **Learning Programming** - Practice coding in multiple languages
- **Algorithm Testing** - Test solutions with custom inputs
- **Code Sharing** - Share code snippets with others
- **Educational Platform** - Teachers can use for programming classes
- **Personal Projects** - Quick code testing and prototyping

## 🔮 Future Enhancements

- **More Languages** - JavaScript, Go, Rust, C#, etc.
- **Code Sharing** - Public/private code sharing features
- **Execution History** - Save and view past code executions
- **Collaborative Coding** - Real-time collaborative editing
- **Code Templates** - Pre-built code templates for common tasks
- **Performance Metrics** - Execution time and memory usage tracking

## 📄 License

This project is licensed under the MIT License.

## ��‍💻 Author

**Ayush Jha** - [jhaayushofficial](https://github.com/jhaayushofficial)

---

**PolyCode** - Where multiple languages meet in one powerful compiler! 🚀
"@ | Out-File -FilePath README.md -Encoding UTF8
