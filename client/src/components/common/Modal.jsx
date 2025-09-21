import React from "react";
import styles from "./Modal.module.css";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
   
    <div className={styles.modalOverlay} onClick={onClose}>
    
      <div className={styles.modalContent} onClick={handleContentClick}>
        
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
       
        {children}
      </div>
    </div>
  );
};

export default Modal;
