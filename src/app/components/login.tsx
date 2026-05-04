import { useState } from "react";
<<<<<<< HEAD
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
=======
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

export function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login, signup } = useAuth();

  const clearErrors = () => {
    setError("");
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    clearErrors();

    if (!email || !password || !confirmPassword) {
      setError("All fields required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const result = await signup(email, password);
    if (result.success) {
      alert("Account created! Now login.");
      setIsSignup(false);
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } else {
      setError(result.error || "Signup failed");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    clearErrors();

    if (!email || !password) {
      setError("Enter email and password");
      return;
    }

    const result = await login(email, password);
    if (result.success) {
      navigate("/");
    } else {
      setError(result.error || "Login failed");
    }
  };

  const switchToSignup = () => {
    setIsSignup(true);
    clearErrors();
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const switchToLogin = () => {
    setIsSignup(false);
    clearErrors();
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat relative"
         style={{ backgroundImage: "url('https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=2070')" }}>
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative z-10 w-[360px] p-[30px] rounded-[15px] backdrop-blur-[15px] bg-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] text-center text-white">
        {!isSignup ? (
          <form onSubmit={handleLogin}>
            <h2 className="mb-5">RetailSoft Manager Login</h2>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-3 my-2.5 border-none rounded-lg text-black"
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-3 my-2.5 border-none rounded-lg text-black"
            />

            <button
              type="submit"
              className="w-full p-3 border-none rounded-lg bg-[#00c6ff] text-white cursor-pointer hover:bg-[#0072ff] transition-colors"
            >
              Login
            </button>

            {error && (
              <div className="bg-red-500/10 text-red-400 p-2.5 rounded-lg mt-2.5 text-center text-sm border border-red-400 animate-in fade-in duration-300">
                {error}
              </div>
            )}

            <div
              className="mt-3 cursor-pointer text-gray-300 hover:text-white transition-colors"
              onClick={switchToSignup}
            >
              Create Manager Account
            </div>
          </form>
        ) : (
          <form onSubmit={handleSignup}>
            <h2 className="mb-5">Create Manager Account</h2>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-3 my-2.5 border-none rounded-lg text-black"
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-3 my-2.5 border-none rounded-lg text-black"
            />

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="w-full p-3 my-2.5 border-none rounded-lg text-black"
            />

            <button
              type="submit"
              className="w-full p-3 border-none rounded-lg bg-[#00c6ff] text-white cursor-pointer hover:bg-[#0072ff] transition-colors"
            >
              Signup
            </button>

            {error && (
              <div className="bg-red-500/10 text-red-400 p-2.5 rounded-lg mt-2.5 text-center text-sm border border-red-400 animate-in fade-in duration-300">
                {error}
              </div>
            )}

            <div
              className="mt-3 cursor-pointer text-gray-300 hover:text-white transition-colors"
              onClick={switchToLogin}
            >
              Back to Login
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
>>>>>>> 005beb18e (Initial commit - connect local project)
