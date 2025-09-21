import React from "react";
import Modal from "../../components/common/Modal";
import styles from "./AdminDashboardPage.module.css"; 

const TripBookingsModal = ({ isOpen, onClose, bookings, trip }) => {
  
  if (!trip) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2>
        Bookings for {trip.source} to {trip.destination}
      </h2>

      {bookings.length > 0 ? (
        <div className={styles.tableContainer}>
          <table>
            <thead>
              <tr>
                <th>User Name</th>
                <th>Email</th>
                <th>Seats</th>
                <th>Amount Paid</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id}>
                  <td>{booking.user.name}</td>
                  <td>{booking.user.email}</td>
                  <td>{booking.seats.join(", ")}</td>
                  <td>${booking.totalAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>There are no bookings for this trip yet.</p>
      )}
    </Modal>
  );
};

export default TripBookingsModal;
