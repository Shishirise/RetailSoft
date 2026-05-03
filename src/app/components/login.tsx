import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const storedEmail = localStorage.getItem("user");
    const storedPass = localStorage.getItem("pass");

    if (!email || !pass) {
      setError("Enter all fields");
      return;
    }

    if (email === storedEmail && pass === storedPass) {
      localStorage.setItem("loggedIn", "true");
      navigate("/dashboard");
    } else {
      setError("Invalid Credentials");
    }
  };

  return (
    <div className="container">
      <h2>RetailSoft Login</h2>

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Enter Password"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
      />

      <div className="error">{error}</div>

      <button onClick={handleLogin}>Login</button>

      <div className="link" onClick={() => navigate("/signup")}>
        Create Account
      </div>
    </div>
  );
}