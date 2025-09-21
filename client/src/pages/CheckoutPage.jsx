

import React, { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../api";
import { AuthContext } from "../context/AuthContext";
import styles from "./CheckoutPage.module.css";

const CheckoutPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  
  const [fullName, setFullName] = useState(user ? user.name : "");
  const [email, setEmail] = useState(user ? user.email : "");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card"); 

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { trip, selectedSeats, totalAmount } = state || {};

  useEffect(() => {
    if (!trip) {
      navigate("/");
    }
  }, [trip, navigate]);

  const handleCompletePayment = async () => {
  
    if (!fullName || !email || !phone) {
      setError("Please fill in all your information.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const { data } = await API.post(
        "/bookings",
        {
          tripId: trip._id,
          seats: selectedSeats,
          totalAmount: totalAmount,
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      navigate("/confirmation", { state: { bookingDetails: data, trip } });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Booking failed. The seats may have been taken."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!trip) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.pageContainer}>
      <h1>Checkout & Payment</h1>
      <div className={styles.checkoutLayout}>
        
        <div className={styles.formSection}>
          <div className={styles.infoCard}>
            <h3>Your Information</h3>
            <p className={styles.infoSubtitle}>
              Please provide your contact details for this booking.
            </p>
            <div className={styles.inputGroup}>
              <label>Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your Name"
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Your Phone Number"
              />
            </div>
          </div>

          <div className={styles.infoCard}>
            <h3>Payment Method</h3>
            <div className={styles.paymentOptions}>
              <div
                className={`${styles.paymentMethod} ${
                  paymentMethod === "card" ? styles.selected : ""
                }`}
                onClick={() => setPaymentMethod("card")}
              >
                <input
                  type="radio"
                  id="creditCard"
                  name="payment"
                  value="card"
                  checked={paymentMethod === "card"}
                  readOnly
                />
                <label htmlFor="creditCard">Credit or Debit Card</label>
              </div>
              <div
                className={`${styles.paymentMethod} ${
                  paymentMethod === "digital" ? styles.selected : ""
                }`}
                onClick={() => setPaymentMethod("digital")}
              >
                <input
                  type="radio"
                  id="digitalWallet"
                  name="payment"
                  value="digital"
                  checked={paymentMethod === "digital"}
                  readOnly
                />
                <label htmlFor="digitalWallet">
                  Digital Wallet (e.g., PayPal, Apple Pay)
                </label>
              </div>
            </div>
            {paymentMethod === "card" && (
              <div className={styles.cardDetails}>
                <div className={styles.inputGroup}>
                  <label>Card Number</label>
                  <input type="text" placeholder="**** **** **** ****" />
                </div>
                <div className={styles.inputGroup}>
                  <label>Cardholder Name</label>
                  <input type="text" placeholder="Name on Card" />
                </div>
                <div className={styles.gridTwo}>
                  <div className={styles.inputGroup}>
                    <label>Expiry Date</label>
                    <input type="text" placeholder="MM/YY" />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>CVV</label>
                    <input type="text" placeholder="***" />
                  </div>
                </div>
              </div>
            )}
            <p className={styles.mockNotice}>
              This is a mock payment. No real transaction will occur.
            </p>
          </div>
        </div>

      
        <div className={styles.summarySection}>
          <h3>Booking Summary</h3>
          <div className={styles.summaryCard}>
            <div className={styles.summaryImage}>✈️</div>
            <p>
              <strong>Route:</strong> {trip.source} to {trip.destination}
            </p>
            <p>
              <strong>Date:</strong> {new Date(trip.date).toLocaleDateString()}
            </p>
            <p>
              <strong>Time:</strong> {trip.time}
            </p>
            <p>
              <strong>Seats:</strong> {selectedSeats.join(", ")}
            </p>
            <hr className={styles.divider} />
            <p className={styles.totalFare}>
              <strong>Total Fare:</strong>{" "}
              <span>USD ${totalAmount.toFixed(2)}</span>
            </p>
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <button
            onClick={handleCompletePayment}
            className={styles.paymentButton}
            disabled={loading}
          >
            {loading ? "Processing..." : "Complete Payment"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;