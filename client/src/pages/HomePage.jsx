import React, { useState, useEffect, useCallback } from "react";
import API from "../api";
import TripCard from "../components/trips/TripCard";
import TripFilter from "../components/trips/TripFilter";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  const [filters, setFilters] = useState({
    source: "",
    destination: "",
    date: "",
  });

  
  const fetchTrips = useCallback(async () => {
    try {
      setLoading(true);
     
      const params = new URLSearchParams();
      if (filters.source) params.append("source", filters.source);
      if (filters.destination)
        params.append("destination", filters.destination);
      if (filters.date) params.append("date", filters.date);

      const { data } = await API.get(`/trips?${params.toString()}`);
      setTrips(data);
    } catch (err) {
      setError("Failed to fetch trips. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [filters]);

 
  useEffect(() => {
    fetchTrips();
  }, []); 

  
  const handleFilterChange = (name, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

 
  const handleSearch = () => {
    fetchTrips(); 
  };

  return (
    <div className={styles.homePage}>
      <header className={styles.hero}>
        <h1 className={styles.heroTitle}>Find Your Next Journey</h1>
        <p className={styles.heroSubtitle}>
          Discover available trips and book your seats with ease.
        </p>
        <TripFilter
          filters={filters}
          onFilterChange={handleFilterChange}
          onSearch={handleSearch}
        />
      </header>

      <main className={styles.mainContent}>
        <h2 className={styles.sectionTitle}>Available Trips </h2>
        
        {loading && <p>Loading trips...</p>}
        {error && <p className={styles.error}>{error}</p>}
        {!loading && !error && (
          <div className={styles.tripGrid}>
            {trips.length > 0 ? (
              trips.map((trip) => <TripCard key={trip._id} trip={trip} />)
            ) : (
              <p>No trips match your search criteria. Try different filters!</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;
