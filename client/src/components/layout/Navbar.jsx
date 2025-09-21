import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };


  const handleAdminClick = () => {
    
    navigate("/login", { state: { defaultRole: "admin" } });
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link to="/" className={styles.brand}>
          TripSee
        </Link>
        <div className={styles.navLinks}>
          <Link to="/" className={styles.navLink}>
            Home
          </Link>

          
          {user && user.role === "admin" ? (
            
            <Link to="/admin" className={styles.navLink}>
              Admin
            </Link>
          ) : (
            
            <button onClick={handleAdminClick} className={styles.navLinkButton}>
              Admin
            </button>
          )}

          {user ? (
            <>
            
              <Link to="/my-bookings" className={styles.navLink}>
                My Bookings
              </Link>
              <Link to="/profile" className={styles.navLink}>
                Profile
              </Link>
              <button onClick={handleLogout} className={styles.logoutButton}>
                Logout
              </button>
            </>
          ) : (
            <>
              
              <Link to="/login" className={styles.navLink}>
                Login
              </Link>
              <Link to="/signup" className={styles.navLink}>
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;




