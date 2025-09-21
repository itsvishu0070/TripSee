

import React, { useState, useEffect, useContext } from "react";
import API from "../api";
import { AuthContext } from "../context/AuthContext";
import styles from "./MyBookingsPage.module.css";

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return;
      try {
        setLoading(true);
        const { data } = await API.get("/bookings/mybookings", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setBookings(data);
      } catch (err) {
        setError("Failed to fetch your bookings.");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [user]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // --- THE FIX IS HERE ---
  // We add 'b.trip &&' to ensure we only process bookings with a valid trip.
  const upcomingBookings = bookings.filter(
    (b) => b.trip && new Date(b.trip.date) >= today
  );
  const pastBookings = bookings.filter(
    (b) => b.trip && new Date(b.trip.date) < today
  );

  if (loading)
    return <p className={styles.centeredMessage}>Loading your bookings...</p>;
  if (error)
    return (
      <p className={`${styles.centeredMessage} ${styles.error}`}>{error}</p>
    );

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>My Bookings</h1>
      <section>
        <h2 className={styles.sectionTitle}>Upcoming Bookings</h2>
        {upcomingBookings.length > 0 ? (
          <div className={styles.bookingsGrid}>
            {upcomingBookings.map((booking) => (
              <BookingCard
                key={booking._id}
                booking={booking}
                isUpcoming={true}
              />
            ))}
          </div>
        ) : (
          <p>You have no upcoming trips.</p>
        )}
      </section>
      <section className={styles.pastSection}>
        <h2 className={styles.sectionTitle}>Past Bookings</h2>
        {pastBookings.length > 0 ? (
          <div className={styles.bookingsGrid}>
            {pastBookings.map((booking) => (
              <BookingCard
                key={booking._id}
                booking={booking}
                isUpcoming={false}
              />
            ))}
          </div>
        ) : (
          <p>You have no past trips.</p>
        )}
      </section>
    </div>
  );
};

// This helper component now gracefully handles deleted trips
const BookingCard = ({ booking }) => {
  const isUpcoming = booking.trip && new Date(booking.trip.date) >= new Date();

  // --- AND THE FIX IS HERE ---
  if (!booking.trip) {
    return (
      <div className={`${styles.card} ${styles.invalidCard}`}>
        <div className={styles.cardHeader}>
          <span>Booking ID: #{booking._id.slice(-6).toUpperCase()}</span>
        </div>
        <div className={styles.cardBody}>
          <h3>Trip No Longer Available</h3>
          <p>
            This trip may have been cancelled or removed by the administrator.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${styles.card} ${
        isUpcoming ? styles.upcomingCard : styles.pastCard
      }`}
    >
      <div className={styles.cardHeader}>
        <span>Booking ID: #{booking._id.slice(-6).toUpperCase()}</span>
        <span className={isUpcoming ? styles.upcomingTag : styles.pastTag}>
          {isUpcoming ? "Upcoming" : "Completed"}
        </span>
      </div>
      <div className={styles.cardBody}>
        <h3>
          {booking.trip.source} to {booking.trip.destination}
        </h3>
        <p>Date: {new Date(booking.trip.date).toLocaleDateString()}</p>
        <p>Time: {booking.trip.time}</p>
        <p>Seats: {booking.seats.join(", ")}</p>
      </div>
    </div>
  );
};

export default MyBookingsPage;