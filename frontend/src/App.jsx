import { useState, useEffect } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import CodeEditor from "./components/CodeEditor";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);

  // Check if user is already logged in on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleRegister = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const switchToRegister = () => {
    setShowLogin(false);
  };

  const switchToLogin = () => {
    setShowLogin(true);
  };

  // If user is authenticated, show the code editor
  if (user) {
    return <CodeEditor user={user} onLogout={handleLogout} />;
  }

  // If user is not authenticated, show login or register form
  return showLogin ? (
    <Login onLogin={handleLogin} onSwitchToRegister={switchToRegister} />
  ) : (
    <Register onRegister={handleRegister} onSwitchToLogin={switchToLogin} />
  );
}

export default App;
