

import React from "react";
import styles from "./SeatSelector.module.css";

const SeatSelector = ({
  bookedSeats = [],
  selectedSeats = [],
  onSeatSelect,
}) => {
 
  const seats = [
    ...["A", "B", "C", "D", "E", "F"].flatMap((row) =>
      [1, 2, 3, 4, 5, 6].map((num) => `${row}${num}`)
    ),
  ];

  const handleSeatClick = (seat) => {
    if (bookedSeats.includes(seat)) return; 
    if (selectedSeats.includes(seat)) {
      onSeatSelect(selectedSeats.filter((s) => s !== seat));
    } else {
      onSeatSelect([...selectedSeats, seat]);
    }
  };

  return (
    <div className={styles.seatSelector}>
      <h3 className={styles.title}>Select Your Seat(s)</h3>

      <div className={styles.seatGrid}>
        {seats.map((seat) => (
          <button
            key={seat}
            type="button"
            onClick={() => handleSeatClick(seat)}
            className={`${styles.seat} 
              ${bookedSeats.includes(seat) ? styles.booked : ""} 
              ${selectedSeats.includes(seat) ? styles.selected : ""}`}
          >
            {seat}
          </button>
        ))}
      </div>

      <div className={styles.legend}>
        <p>
          <span className={`${styles.legendItem} ${styles.available}`}></span>
          Available
        </p>
        <p>
          <span className={`${styles.legendItem} ${styles.booked}`}></span>
          Booked
        </p>
        <p>
          <span className={`${styles.legendItem} ${styles.selected}`}></span>
          Selected
        </p>
      </div>

      <div className={styles.bookedSeatsInfo}>
        <strong>Booked Seats:</strong> {bookedSeats.join(", ") || "None"}
      </div>
    </div>
  );
};

export default SeatSelector;
