import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
const URL = " https://games-theory-frontend.vercel.app";
const LOCALURL = "http://localhost:8080";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Added for error handling
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset error message before new submission

    try {
      const response = await axios.post(
        `https://games-theory-frontend.vercel.app/api/auth/login`,
        {
          email,
          password,
        }
      );

      console.log("Login successful", response.data);

      // Save user ID and authToken in local storage
      localStorage.setItem("userId", response.data.userId); // userId1 from the backend response
      localStorage.setItem("authToken", response.data.authToken); // Store the authToken if needed

      // Redirect to the home page
      navigate("/home");
    } catch (error) {
      if (error.response) {
        // Handle specific status codes
        if (error.response.status === 401) {
          setErrorMessage("Invalid email or password."); // Show the error from the backend
        } else if (error.response.status === 500) {
          setErrorMessage("Server error. Unable to login. Please try again.");
        } else {
          setErrorMessage(
            error.response.data.message ||
              "Login failed. Please check your credentials."
          );
        }
      } else if (error.request) {
        // Request was made but no response received
        setErrorMessage("No response from the server. Please try again.");
      } else {
        // Other errors
        setErrorMessage(error.message);
      }
    }

    // Clear the form
    setEmail("");
    setPassword("");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Login</h2>

      {/* Display error message if any */}
      {errorMessage && <div style={styles.error}>{errorMessage}</div>}

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
      <p style={styles.footer}>
        Don't have an account?{" "}
        <a href="/register" style={styles.link}>
          Register here
        </a>
      </p>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f4f4f4",
    fontFamily: "'Arial', sans-serif",
  },
  title: {
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "300px",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    backgroundColor: "white",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  label: {
    marginBottom: "5px",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    transition: "border-color 0.3s",
  },
  button: {
    padding: "10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s",
  },
  footer: {
    marginTop: "20px",
    color: "#666",
  },
  link: {
    color: "#007bff",
    textDecoration: "none",
  },
  error: {
    color: "red",
    marginBottom: "15px",
    fontWeight: "bold",
  },
};

export default Login;
