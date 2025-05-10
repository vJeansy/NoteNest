import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { loginUser, registerUser } from "../services/api"; // Import register function
import Footer from "../components/Footer";
import LoginIcon from "@mui/icons-material/Login";
import HowToRegIcon from "@mui/icons-material/HowToReg"; // Registration icon

function AuthForm() {
  const location = useLocation();
  const isRegistering = location.pathname === "/register"; // ✅ Toggle mode based on route

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        await registerUser(username, email, password);
        alert("Registration successful! A confirmation email has been sent.");
        navigate("/login");
      } else {
        const data = await loginUser(email, password);
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.user.username);
        navigate("/notes");
      }
    } catch (err) {
      console.error("Authentication failed", err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Welcome to NoteNest</h1>
          <p>{isRegistering ? "Create an account" : "Login to access your notes"}</p>
          <p>
            {isRegistering ? (
              <Link to="/login">Already have an account? Login here</Link>
            ) : (
              <Link to="/register">Don't have an account? Register here</Link>
            )}
          </p>
        </div>

        <div className="login-form">
          <h2>{isRegistering ? "User Registration" : "User Login"}</h2>
          <hr /> <br />
          <form onSubmit={handleSubmit}>
            {isRegistering && (
              <input
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                className="input-field"
              />
            )}
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
            />
            <button type="submit" className="login-btn">
              {isRegistering ? <HowToRegIcon /> : <LoginIcon />}
              {isRegistering ? " Register" : " Login"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AuthForm;