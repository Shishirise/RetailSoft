import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem("user", "true");
    navigate("/dashboard");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>RetailSoft Login</h1>

      <input placeholder="Email" /><br /><br />
      <input type="password" placeholder="Password" /><br /><br />

      <button onClick={handleLogin}>Sign In</button>
    </div>
  );
}