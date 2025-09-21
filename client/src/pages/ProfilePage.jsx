
import React, { useContext, useEffect, useState } from "react";
import API from "../api";
import { AuthContext } from "../context/AuthContext";
import "../styles/ProfilePage.css";



const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  if (!user) {
    return <div className="profile-wrapper">Loading profile...</div>;
  }

  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const upcoming = bookings.filter(
    (b) => b.trip && new Date(b.trip.date) >= today
  );
  const past = bookings.filter((b) => b.trip && new Date(b.trip.date) < today);

 
  const accountCreationDate = user.accountCreationDate
    ? new Date(user.accountCreationDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Not available";

  return (
    <div className="profile-wrapper">
      
      <div className="profile-summary">
        <img
          src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
          alt="User Avatar"
          className="profile-summary-avatar"
        />
        <div>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      </div>

     
      <div className="account-section">
        <h3>Account Details</h3>
        <div className="info-card">
       
          <div className="info-row">
            <p>
              <span className="info-label">Name:</span> {user.name}
            </p>
            <button className="change-button">Change</button>
          </div>
         
          <div className="info-row">
            <p>
              <span className="info-label">Email:</span> {user.email}
            </p>
            <button className="change-button">Change</button>
          </div>
          
          <div className="info-row">
            <p>
              <span className="info-label">Password:</span> ********
            </p>
            <button className="change-button">Change</button>
          </div>
        
          <div className="info-row">
            <p>
              <span className="info-label">Member Since:</span>{" "}
              {accountCreationDate}
            </p>
          </div>
        </div>
      </div>

      
      <div className="booking-section">
        <h3>Upcoming Bookings</h3>
        {loading ? (
          <p>Loading bookings...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : upcoming.length > 0 ? (
          <div className="booking-grid">
            {upcoming.map((b) => (
              <BookingCard key={b._id} booking={b} isUpcoming={true} />
            ))}
          </div>
        ) : (
          <p>No upcoming trips.</p>
        )}
      </div>

      <div className="booking-section">
        <h3>Past Bookings</h3>
        {loading ? (
          <p>Loading bookings...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : past.length > 0 ? (
          <div className="booking-grid">
            {past.map((b) => (
              <BookingCard key={b._id} booking={b} isUpcoming={false} />
            ))}
          </div>
        ) : (
          <p>No past trips.</p>
        )}
      </div>
    </div>
  );
};


const BookingCard = ({ booking, isUpcoming }) => {
  if (!booking.trip) return null;
  return (
    <div className={`booking-card ${isUpcoming ? "upcoming" : "completed"}`}>
      <div className="card-header">
        <span>Booking ID: #{booking._id.slice(-6).toUpperCase()}</span>
        <span className={isUpcoming ? "tag upcoming-tag" : "tag past-tag"}>
          {isUpcoming ? "Upcoming" : "Completed"}
        </span>
      </div>
      <div className="card-body">
        <h4>
          {booking.trip.source} → {booking.trip.destination}
        </h4>
        <p>Date: {new Date(booking.trip.date).toLocaleDateString()}</p>
        <p>Time: {booking.trip.time}</p>
        <p>Seats: {booking.seats.join(", ")}</p>
      </div>
    </div>
  );
};

export default ProfilePage;
