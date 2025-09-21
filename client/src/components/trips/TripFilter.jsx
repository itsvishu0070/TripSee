import React from "react";
import styles from "./TripFilter.module.css";

const TripFilter = ({ filters, onFilterChange, onSearch }) => {
  const handleChange = (e) => {
    onFilterChange(e.target.name, e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <div className={styles.filterCard}>
      <form onSubmit={handleSubmit} className={styles.filterForm}>
        <div className={styles.inputGroup}>
          <label htmlFor="source">From</label>
          <input
            type="text"
            id="source"
            name="source"
            placeholder="Departure Location"
            value={filters.source}
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="destination">To</label>
          <input
            type="text"
            id="destination"
            name="destination"
            placeholder="Arrival Location"
            value={filters.destination}
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={filters.date}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className={styles.searchButton}>
          Search Trips
        </button>
      </form>
    </div>
  );
};

export default TripFilter;
