# Multi-Language Code Compiler Setup Guide

## **Supported Languages**

- ✅ **C++** (g++)
- ✅ **C** (gcc)
- ✅ **Java** (javac/java)
- ✅ **Python** (python/python3)

## **Prerequisites**

### **1. Install Required Compilers/Interpreters**

#### **For Windows:**

```bash
# Install MinGW for C/C++
# Download from: https://www.mingw-w64.org/

# Install Java JDK
# Download from: https://adoptium.net/

# Install Python
# Download from: https://www.python.org/downloads/
```

#### **For Mac:**

```bash
# Install Xcode Command Line Tools (includes gcc/g++)
xcode-select --install

# Install Java
brew install openjdk

# Install Python (usually pre-installed)
python3 --version
```

#### **For Linux (Ubuntu/Debian):**

```bash
# Install C/C++ compiler
sudo apt update
sudo apt install build-essential

# Install Java
sudo apt install openjdk-11-jdk

# Install Python
sudo apt install python3
```

### **2. Verify Installations**

Run these commands to verify everything is installed:

```bash
# Check C++ compiler
g++ --version

# Check C compiler
gcc --version

# Check Java
javac --version
java --version

# Check Python
python --version  # or python3 --version
```

## **Backend Setup**

### **1. Environment Variables**

Create a `.env` file in the `backend` directory:

```env
MONGO_URL=mongodb://localhost:27017/your_database_name
SECRET_KEY=your_super_secret_jwt_key_here
PORT=8000
```

### **2. Start Backend Server**

```bash
cd backend
npm start
```

## **Frontend Setup**

### **1. Environment Variables**

Create a `.env` file in the `frontend` directory:

```env
VITE_BACKEND_URL=http://localhost:8000
```

### **2. Start Frontend Server**

```bash
cd frontend
npm run dev
```

## **Testing Each Language**

### **C++ Example:**

```cpp
#include <iostream>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;
    cout << "Sum: " << a + b << endl;
    return 0;
}
```

### **C Example:**

```c
#include <stdio.h>

int main() {
    int a, b;
    scanf("%d %d", &a, &b);
    printf("Sum: %d\n", a + b);
    return 0;
}
```

### **Java Example:**

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int a = scanner.nextInt();
        int b = scanner.nextInt();
        System.out.println("Sum: " + (a + b));
        scanner.close();
    }
}
```

### **Python Example:**

```python
a, b = map(int, input().split())
print(f"Sum: {a + b}")
```

## **Features**

### **✅ What Works:**

- **Language Selection**: Dropdown to choose C++, C, Java, or Python
- **Syntax Highlighting**: Proper highlighting for each language
- **Code Templates**: Default templates for each language
- **Input/Output**: Custom input support for all languages
- **Error Handling**: Proper error messages for compilation/runtime errors
- **Cross-Platform**: Works on Windows, Mac, and Linux

### **🔧 Technical Details:**

- **C++/C**: Uses g++/gcc for compilation
- **Java**: Uses javac for compilation, java for execution
- **Python**: Uses python/python3 for interpretation
- **File Extensions**: .cpp, .c, .java, .py
- **Output Files**: .exe (Windows), .out (Mac/Linux) for compiled languages

## **Troubleshooting**

### **Common Issues:**

1. **"Command not found" errors:**

   - Make sure compilers are installed and in PATH
   - Restart terminal after installation

2. **Java class name issues:**

   - Java file name must match class name
   - Class name must be "Main" for the default template

3. **Python version conflicts:**

   - Use `python` on Windows, `python3` on Mac/Linux
   - The code automatically detects the correct command

4. **Permission errors:**
   - Make sure the backend has write permissions to create files
   - Check that output directories exist

### **Testing Commands:**

```bash
# Test C++ compilation
g++ test.cpp -o test.exe && test.exe

# Test C compilation
gcc test.c -o test.exe && test.exe

# Test Java compilation
javac Main.java && java Main

# Test Python execution
python test.py
```

## **Security Notes**

- ✅ **File Cleanup**: Temporary files are created but not automatically deleted
- ✅ **Input Validation**: Basic validation on language selection
- ✅ **Error Handling**: Proper error messages for failed compilations
- ⚠️ **File System**: Compiler has access to create files in the backend directory

## **Next Steps**

Consider adding:

- **File cleanup** after execution
- **Memory/time limits** for code execution
- **More languages** (JavaScript, Go, Rust, etc.)
- **Code sharing** between users
- **Execution history** for users

Your multi-language compiler is now ready! 🚀
