import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { loginUser, registerUser } from "../services/api"; // Import register function
import AlertModal from "../components/AlertModal";
import Footer from "../components/Footer";
import LoginIcon from "@mui/icons-material/Login";
import HowToRegIcon from "@mui/icons-material/HowToReg"; // Registration icon
import { Collapse } from '@mui/material';

function AuthForm() {
  const location = useLocation();
  const isRegistering = location.pathname === "/register"; // Toggle mode based on route

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("info");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        await registerUser(username, email, password);
        setAlertSeverity("success");
        setAlertMessage("Registration successful! Please log in.");
        navigate("/login");
      } else {
        const data = await loginUser(email, password);
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.user.username);
        navigate("/notes");
      }
    } catch (err) {
      setAlertSeverity("error");
      setAlertMessage(err?.response?.data?.message || "Invalid email or password. Please try again.");
    }
  };

    // Auto-close the alert after 3 seconds
    useEffect(() => {
      if (alertMessage) {
        const timer = setTimeout(() => {
          setAlertMessage("");
        }, 5000);
        return () => clearTimeout(timer); // cleanup on unmount or message change
      }
    }, [alertMessage]);

  return (
    <div className="login-container">
      <div className="login-card">

      <div className="login-img">
          <img src="./public/NoteNest.img.png" alt="Login" />
        </div>

        <div className="login-form">
          <h2>NoteNest</h2>
          <h4>{isRegistering ? "Sign up to create and view your notes.": ""}</h4>
          <form onSubmit={handleSubmit}>
            {isRegistering && (
              <input
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                className="input-field"
                min={4}
                max={20}
                required
              />
            )}
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              min={10}
              max={50}
              required
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              min={8}
              max={20}
              required
            />
            <button
            type="submit"
            className={!email || !password ? "login-btn-disabled" : "login-btn"}
            disabled={!email || !password}>
              {isRegistering ? <HowToRegIcon /> : <LoginIcon />}
              {isRegistering ? " Register" : " Login"}
            </button>
            <span>
              <hr />
              OR
              <hr />
              </span>
          </form>
          <div className="login-footer">
            {isRegistering ? (
              <p>Already have an account? <Link to="/login">Login here</Link> </p>
            ) : (
              <>
              <Link to="/changepass">Forgot password?</Link>
              <p>Don't have an account? <Link to="/register">Sing up</Link> </p>
              </>
            )}
        </div>
        </div>
          <Collapse in={!!alertMessage}>
            {alertMessage && (
              <AlertModal
                props={{ severity: alertSeverity }}
                message={alertMessage}
                handleClose={() => setAlertMessage("")}
              />
            )}
          </Collapse>
      </div>
      <Footer />
    </div>
  );
}

export default AuthForm;