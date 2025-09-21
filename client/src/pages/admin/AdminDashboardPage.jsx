

import React, { useState, useEffect, useContext } from "react";
import API from "../../api";
import { AuthContext } from "../../context/AuthContext";
import AddEditTripModal from "./AddEditTripModal";
import TripBookingsModal from "./TripBookingModal";
import styles from "./AdminDashboardPage.module.css";

const AdminDashboardPage = () => {
  // --- STATES ---
  const [trips, setTrips] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTrip, setEditingTrip] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // States for the details modal
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedTripBookings, setSelectedTripBookings] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);

  const { user } = useContext(AuthContext);

  
  const fetchData = async () => {
    try {
      setLoading(true);
      
      const [tripsRes, bookingsRes] = await Promise.all([
        API.get("/trips"),
        API.get("/bookings/all", {
          headers: { Authorization: `Bearer ${user.token}` },
        }),
      ]);
      setTrips(tripsRes.data);
      setBookings(bookingsRes.data);
    } catch (error) {
      console.error("Failed to fetch dashboard data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  
  const handleOpenModal = (trip = null) => {
    setEditingTrip(trip);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTrip(null);
  };

  const handleSaveTrip = async (tripData) => {
    const formData = new FormData();
    Object.keys(tripData).forEach((key) => {
      formData.append(key, tripData[key]);
    });
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${user.token}`,
      },
    };

    try {
      setIsSaving(true);
      if (editingTrip) {
        
        await API.put(`/trips/${editingTrip._id}`, tripData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
      } else {
        await API.post("/trips", formData, config);
      }
      fetchData();
      handleCloseModal();
    } catch (error) {
      console.error("Failed to save trip", error);
      alert("Failed to save trip. Please check the console for details.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteTrip = async (tripId) => {
    if (window.confirm("Are you sure you want to delete this trip?")) {
      try {
        await API.delete(`/trips/${tripId}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        fetchData(); 
      } catch (error) {
        console.error("Failed to delete trip", error);
      }
    }
  };


  const handleViewDetails = async (trip) => {
    setSelectedTrip(trip);
    try {
      const { data } = await API.get(`/trips/${trip._id}/bookings`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setSelectedTripBookings(data);
      setIsDetailsModalOpen(true);
    } catch (error) {
      console.error("Failed to fetch trip bookings", error);
      alert("Could not load booking details.");
    }
  };

  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
  };

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div className={styles.dashboardContainer}>
      <h1>Admin Dashboard</h1>
      <button
        onClick={() => handleOpenModal()}
        className={styles.addTripButton}
      >
        + Add New Trip
      </button>

     
      <div className={styles.tableContainer}>
        <h2>Trip Management</h2>
        <table>
          <thead>
            <tr>
              <th>Source</th>
              <th>Destination</th>
              <th>Date</th>
              <th>Price</th>
              <th>Seats</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {trips.map((trip) => (
              <tr key={trip._id}>
                <td>{trip.source}</td>
                <td>{trip.destination}</td>
                <td>{new Date(trip.date).toLocaleDateString()}</td>
                <td>${trip.price}</td>
                <td>
                  {trip.bookedSeats.length} / {trip.totalSeats}
                </td>
                <td>
                  <button
                    onClick={() => handleViewDetails(trip)}
                    className={styles.detailsButton}
                  >
                    Details
                  </button>
                  <button
                    onClick={() => handleOpenModal(trip)}
                    className={styles.editButton}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTrip(trip._id)}
                    className={styles.deleteButton}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

     
      <div className={styles.tableContainer} style={{ marginTop: "2rem" }}>
        <h2>Booking Management</h2>
        <table>
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>User</th>
              <th>Trip Route</th>
              <th>Seats</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>#{booking._id.slice(-6).toUpperCase()}</td>
                <td>{booking.user ? booking.user.name : "N/A"}</td>
                <td>
                  {booking.trip
                    ? `${booking.trip.source} to ${booking.trip.destination}`
                    : "N/A"}
                </td>
                <td>{booking.seats.join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

     
      <AddEditTripModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveTrip}
        tripToEdit={editingTrip}
        isSaving={isSaving}
      />

      <TripBookingsModal
        isOpen={isDetailsModalOpen}
        onClose={handleCloseDetailsModal}
        bookings={selectedTripBookings}
        trip={selectedTrip}
      />
    </div>
  );
};

export default AdminDashboardPage;



