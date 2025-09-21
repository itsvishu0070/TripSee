

import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

import { jsPDF } from "jspdf";
import html2canvas from "html2canvas"; 
import styles from "./ConfirmationPage.module.css";

const ConfirmationPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const ticketRef = useRef(null); 

  const { bookingDetails, trip } = state || {};

  useEffect(() => {
    if (!bookingDetails || !trip) {
      navigate("/");
    }
  }, [bookingDetails, trip, navigate]);

  if (!bookingDetails || !trip) {
    return null;
  }

const handleDownload = async () => {
  const ticketElement = document.querySelector(`.${styles.ticketCard}`);
  if (!ticketElement) return;


  const canvas = await html2canvas(ticketElement, {
    scale: 3, 
    backgroundColor: null, 
  });

  const imgData = canvas.toDataURL("image/png");

  
  const pdf = new jsPDF("p", "mm", "a4");
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  
  const imgProps = pdf.getImageProperties(imgData);
  const pdfWidth = pageWidth * 0.85; 
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  const x = (pageWidth - pdfWidth) / 2;
  const y = (pageHeight - pdfHeight) / 2;

  pdf.addImage(imgData, "PNG", x, y, pdfWidth, pdfHeight);
  pdf.save(`Ticket_${bookingDetails._id.slice(-6).toUpperCase()}.pdf`);
};
  return (
    <div className={styles.pageContainer}>
      <div className={styles.confirmationBox}>
        <div className={styles.successIcon}>✓</div>
        <h1 className={styles.title}>Booking Confirmed!</h1>
        <p className={styles.subtitle}>
          Your trip is successfully booked. Enjoy your journey!
        </p>

     
        <div className={styles.ticketCard} ref={ticketRef}>
          <div className={styles.ticketHeader}>
            <p>Flight Ticket</p>
            <p className={styles.bookingId}>
              Booking ID: #{bookingDetails._id.slice(-6).toUpperCase()}
            </p>
          </div>
          <div className={styles.ticketBody}>
            <div className={styles.routeInfo}>
              <div className={styles.location}>
                <h2>{trip.source.substring(0, 3).toUpperCase()}</h2>
                <p>{trip.time}</p>
              </div>
              <div className={styles.planeIcon}>✈️</div>
              <div className={styles.location}>
                <h2>{trip.destination.substring(0, 3).toUpperCase()}</h2>
              </div>
            </div>
            <div className={styles.detailsGrid}>
              <div>
                <p className={styles.detailLabel}>Date</p>
                <p className={styles.detailValue}>
                  {new Date(trip.date).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className={styles.detailLabel}>Seats</p>
                <p className={styles.detailValue}>
                  {bookingDetails.seats.join(", ")}
                </p>
              </div>
              <div>
                <p className={styles.detailLabel}>Total Fare Paid</p>
                <p className={`${styles.detailValue} ${styles.price}`}>
                  ${bookingDetails.totalAmount.toFixed(2)}
                </p>
              </div>
            </div>

            <div className={styles.qrCodeSection}>
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=BookingID:${bookingDetails._id}`}
                alt="Booking QR Code"
                className={styles.qrCodeImage}
              />
              <p className={styles.qrCodeText}>
                Scan this QR code at the boarding gate.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.buttonGroup}>
          <button onClick={handleDownload} className={styles.downloadButton}>
            Download Ticket
          </button>
          <Link to="/my-bookings" className={styles.viewBookingsButton}>
            View All Bookings
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
