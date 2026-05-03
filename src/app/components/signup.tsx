import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Create Account</h1>
      <button onClick={() => navigate("/")}>Back to Login</button>
    </div>
  );
}