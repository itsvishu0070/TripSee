import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.links}>
          <div>
            <h4>Company</h4>
            <a href="#">About Us</a>
            <a href="#">Careers</a>
          </div>
          <div>
            <h4>Resources</h4>
            <a href="#">Help Center</a>
            <a href="#">Contact</a>
          </div>
          <div>
            <h4>Legal</h4>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
        <div className={styles.bottom}>
          <p>
            &copy; {new Date().getFullYear()} TripSee All rights
            reserved.
          </p>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;
