import React from "react";
import { Link } from "react-router-dom";
import styles from "./TripCard.module.css";

const TripCard = ({ trip }) => {
 
  const tripDate = new Date(trip.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className={styles.card}>
      <img
        src={trip.imageUrl}
        alt={`Trip to ${trip.destination}`}
        className={styles.cardImage}
      />
      <div className={styles.cardBody}>
        <div className={styles.tripInfo}>
          <h3 className={styles.tripTitle}>
            {trip.source} to {trip.destination}
          </h3>
          <p className={styles.tripDate}>{tripDate}</p>
        </div>
        <div className={styles.priceSection}>
          <p className={styles.price}>${trip.price}</p>
          <Link to={`/trip/${trip._id}`} className={styles.bookButton}>
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TripCard;
