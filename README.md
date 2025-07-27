# C++ Compiler

A full-stack web application that allows users to write, compile, and execute C++ code directly from their browser. Features a modern, responsive frontend with a secure backend that compiles and runs user-submitted C++ code in a Dockerized environment.

## 🚀 Features

- **Real-time C++ Compilation**: Write, compile, and run C++ code instantly
- **Modern Dark UI**: Beautiful, responsive interface with syntax highlighting
- **Custom Input Support**: Provide custom input for your C++ programs
- **Error Handling**: Comprehensive error reporting and debugging
- **Secure Backend**: Dockerized environment for safe code execution
- **Cross-platform**: Works on any device with a modern web browser

## 🛠️ Tech Stack

### Frontend

- **React 19** - Modern UI framework
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Prism.js** - Syntax highlighting
- **Axios** - HTTP client for API calls

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Docker** - Containerization for secure code execution
- **C++ Compiler** - GCC for code compilation

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Docker** (for backend code execution)
- **Git**

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/jhaayushofficial/Cpp-Compiler-with-user-input.git
cd Cpp-Compiler-with-user-input
```

### 2. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 3. Install Backend Dependencies

```bash
cd ../backend
npm install
```

### 4. Set up Environment Variables

Create a `.env` file in the frontend directory:

```bash
cd ../frontend
echo "VITE_BACKEND_URL=http://localhost:8000/run" > .env
```

## 🏃‍♂️ Running the Application

### Start the Backend Server

```bash
cd backend
npm start
```

The backend will start on `http://localhost:8000`

### Start the Frontend Development Server

In a new terminal:

```bash
cd frontend
npm run dev
```

The frontend will start on `http://localhost:5173`

## 🎯 Usage

1. **Open your browser** and navigate to `http://localhost:5173`
2. **Write C++ code** in the code editor
3. **Add custom input** (optional) in the input field
4. **Click "Run Code"** to compile and execute your program
5. **View the output** in the output section

### Example C++ Code

```cpp
#include <iostream>
using namespace std;

int main() {
    int num1, num2, sum;
    cin >> num1 >> num2;
    sum = num1 + num2;
    cout << "The sum of the two numbers is: " << sum;
    return 0;
}
```

## 📁 Project Structure

```
Cpp-Compiler-with-user-input/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── App.jsx          # Main application component
│   │   ├── App.css          # Application styles
│   │   └── main.jsx         # Application entry point
│   ├── public/
│   │   └── cpp-icon.svg     # Application icon
│   ├── package.json         # Frontend dependencies
│   └── vite.config.js       # Vite configuration
├── backend/                  # Node.js backend server
│   ├── index.js             # Main server file
│   ├── executeCpp.js        # C++ execution logic
│   ├── generateFile.js      # File generation utilities
│   ├── generateInputFile.js # Input file handling
│   ├── codes/               # Generated C++ files
│   ├── inputs/              # Generated input files
│   ├── outputs/             # Program outputs
│   ├── package.json         # Backend dependencies
│   └── Dockerfile           # Docker configuration
└── README.md               # Project documentation
```

## 🔧 Configuration

### Backend Configuration

The backend server runs on port 8000 by default. You can modify this in `backend/index.js`:

```javascript
app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
```

### Frontend Configuration

The frontend connects to the backend via the `VITE_BACKEND_URL` environment variable. Make sure this points to your backend server.

## 🐳 Docker Support

The backend uses Docker for secure code execution. Make sure Docker is running on your system.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - Frontend framework
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Prism.js](https://prismjs.com/) - Syntax highlighting
- [Express.js](https://expressjs.com/) - Backend framework
- [Docker](https://www.docker.com/) - Containerization

## 📞 Support

If you encounter any issues or have questions, please:

1. Check the [Issues](https://github.com/jhaayushofficial/Cpp-Compiler-with-user-input/issues) page
2. Create a new issue with detailed information about your problem
3. Include your operating system, Node.js version, and any error messages

## 🚀 Deployment

### Frontend Deployment

The frontend can be deployed to platforms like:

- Vercel
- Netlify
- GitHub Pages

Build the frontend for production:

```bash
cd frontend
npm run build
```

### Backend Deployment

The backend can be deployed to platforms like:

- Heroku
- Railway
- DigitalOcean
- AWS

Make sure to set the appropriate environment variables for production.

---

**Happy Coding! 🎉**
