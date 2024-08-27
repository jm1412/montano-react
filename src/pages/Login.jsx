import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import styles from "./Login.module.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve the original page the user was trying to access
  const from = location.state?.from?.pathname || "/";

  // Function to handle form submission and perform login
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/accounts/api/token/",
        {
          username,
          password,
        }
      );

      // Store tokens in localStorage and update the authentication state
      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);
      setError("");
      login();
      navigate(from, { replace: true }); // Redirect to the original page after login
    } catch (err) {
      // Show error message if authentication fails
      if (err.response && err.response.status === 401) {
        setError("Invalid username or password");
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className={`${styles.loginContainer} container`}>
      {/* Login form */}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>} {/* Display error if any */}
    </div>
  );
};

export default Login;
