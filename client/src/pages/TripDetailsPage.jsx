
import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";
import SeatSelector from "../components/trips/SeatSelector";
import { AuthContext } from "../context/AuthContext";
import styles from "./TripDetailsPage.module.css";
import toast, { Toaster } from "react-hot-toast"; 

const TripDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    const fetchTripDetails = async () => {
      try {
        setLoading(true);
        const { data } = await API.get(`/trips/${id}`);
        setTrip(data);
      } catch (err) {
        setError("Failed to load trip details.");
      } finally {
        setLoading(false);
      }
    };
    fetchTripDetails();
  }, [id]);

  const handleConfirmBooking = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (selectedSeats.length === 0) {
      
      toast.error("Please select at least one seat.");
      return;
    }
    navigate("/checkout", {
      state: {
        trip,
        selectedSeats,
        totalAmount: trip.price * selectedSeats.length,
      },
    });
  };

  if (loading) return <p>Loading trip details...</p>;
  if (error) return <p className={styles.error}>{error}</p>;
  if (!trip) return <p>Trip not found.</p>;

  return (
    <div className={styles.pageContainer}>
      
      <Toaster position="top-center" reverseOrder={false} />

      <img
        src={trip.imageUrl}
        alt={`View of ${trip.destination}`}
        className={styles.tripImage}
      />

      <div className={styles.detailsCard}>
        <div className={styles.tripHeader}>
          <h1>
            {trip.source} → {trip.destination}
          </h1>
          <p className={styles.tripPrice}>${trip.price} per seat</p>
        </div>

        <p className={styles.tripDate}>
          {new Date(trip.date).toLocaleDateString()} at {trip.time}
        </p>

        <SeatSelector
          bookedSeats={trip.bookedSeats}
          selectedSeats={selectedSeats}
          onSeatSelect={setSelectedSeats}
        />

        <div className={styles.summary}>
          <span>Selected Seats: {selectedSeats.join(", ") || "None"}</span>
          <span>Total: ${trip.price * selectedSeats.length}</span>
        </div>

        <button onClick={handleConfirmBooking} className={styles.confirmButton}>
          Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default TripDetailsPage;