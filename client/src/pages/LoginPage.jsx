import React, { useState, useContext, useEffect } from "react"; 
import { useNavigate, Link, useLocation } from "react-router-dom"; 
import API from "../api";
import { AuthContext } from "../context/AuthContext";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
  
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [selectedRole, setSelectedRole] = useState("user");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

 
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation(); 


  useEffect(() => {
    if (location.state?.defaultRole === "admin") {
      setSelectedRole("admin");
    }
  }, [location.state]);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data } = await API.post("/auth/login", formData);

      
      if (selectedRole === "admin" && data.role !== "admin") {
        setError("Access Denied: You are not an authorized administrator.");
        setLoading(false);
        return; 
      }

      login(data);
      
      if (data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className={styles.container}>
      <div className={styles.card}>
       
        <div className={styles.roleSelector}>
          <button
            className={`${styles.roleTab} ${
              selectedRole === "user" ? styles.activeTab : ""
            }`}
            onClick={() => setSelectedRole("user")}
          >
            User Login
          </button>
          <button
            className={`${styles.roleTab} ${
              selectedRole === "admin" ? styles.activeTab : ""
            }`}
            onClick={() => setSelectedRole("admin")}
          >
            Admin Login
          </button>
        </div>

        <h1 className={styles.title}>Log In to Your Account</h1>
        <p className={styles.subtitle}>
          Welcome back! Please enter your details.
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <p className={styles.error}>{error}</p>}
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? "Logging In..." : "Log In"}
          </button>
        </form>

        <p className={styles.footerText}>
          Don't have an account?{" "}
          <Link to="/signup" className={styles.link}>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
