// import React, { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// // Note the direct CSS import - NOT a CSS module
// import "../styles/ProfilePage.css";

// const ProfilePage = () => {
//   const { user } = useContext(AuthContext);

//   // If the user data hasn't loaded yet, show a loading message
//   if (!user) {
//     return (
//       <div className="profile-container">
//         <p>Loading profile...</p>
//       </div>
//     );
//   }

//   // Format the account creation date for display
//   const accountCreationDate = new Date(
//     user.accountCreationDate
//   ).toLocaleDateString("en-US", {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   });

//   return (
//     <div className="profile-container">
//       <div className="profile-card">
//         <div className="profile-header">
//           {/* Using a placeholder avatar */}
//           <img
//             src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
//             alt="User Avatar"
//             className="profile-avatar"
//           />
//           <h2>{user.name}</h2>
//           <p>{user.email}</p>
//         </div>

//         <div className="account-section">
//           <h3>Account</h3>
//           <div className="info-row">
//             <div>
//               <p className="info-label">Name</p>
//               <p className="info-value">{user.name}</p>
//             </div>
//             <button className="change-button">Change</button>
//           </div>
//           <div className="info-row">
//             <div>
//               <p className="info-label">Email</p>
//               <p className="info-value">{user.email}</p>
//             </div>
//             <button className="change-button">Change</button>
//           </div>
//           <div className="info-row">
//             <div>
//               <p className="info-label">Password</p>
//               <p className="info-value">**********</p>
//             </div>
//             <button className="change-button">Change</button>
//           </div>
//           <div className="info-row">
//             <div>
//               <p className="info-label">Member Since</p>
//               <p className="info-value">{accountCreationDate}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;







// import React, { useContext, useEffect, useState } from "react";
// import API from "../api";
// import { AuthContext } from "../context/AuthContext";
// import "../styles/ProfilePage.css";


// const ProfilePage = () => {
//   const { user } = useContext(AuthContext);
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchBookings = async () => {
//       if (!user) return;
//       try {
//         setLoading(true);
//         const { data } = await API.get("/bookings/mybookings", {
//           headers: {
//             Authorization: `Bearer ${user.token}`,
//           },
//         });
//         setBookings(data);
//       } catch (err) {
//         setError("Failed to fetch your bookings.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBookings();
//   }, [user]);

//   if (!user) {
//     return <div className="profile-wrapper">Loading profile...</div>;
//   }

//   // Split bookings
//   const today = new Date();
//   today.setHours(0, 0, 0, 0);
//   const upcoming = bookings.filter((b) => new Date(b.trip.date) >= today);
//   const past = bookings.filter((b) => new Date(b.trip.date) < today);

//   const accountCreationDate = new Date(
//     user.accountCreationDate
//   ).toLocaleDateString("en-US", {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   });

//   return (
//     <div className="profile-wrapper">
//       {/* Profile Summary */}
//       <div className="profile-summary">
//         <img
//           src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
//           alt="User Avatar"
//           className="profile-summary-avatar"
//         />
//         <div>
//           <h2>{user.name}</h2>
//           <p>{user.email}</p>
//           <button className="manage-profile-btn">Manage Profile</button>
//         </div>
//       </div>

//       {/* Account Info */}
//       <div className="account-section">
//         <h3>Account Details</h3>
//         <div className="info-card">
//           <p>
//             <span>Name:</span> {user.name}
//           </p>
//           <p>
//             <span>Email:</span> {user.email}
//           </p>
//           <p>
//             <span>Password:</span> ********
//           </p>
//           <p>
//             <span>Member Since:</span> {accountCreationDate}
//           </p>
//         </div>
//       </div>

//       {/* Bookings */}
//       <div className="booking-section">
//         <h3>Upcoming Bookings</h3>
//         {loading ? (
//           <p>Loading bookings...</p>
//         ) : error ? (
//           <p className="error">{error}</p>
//         ) : upcoming.length > 0 ? (
//           <div className="booking-grid">
//             {upcoming.map((b) => (
//               <BookingCard key={b._id} booking={b} isUpcoming={true} />
//             ))}
//           </div>
//         ) : (
//           <p>No upcoming trips.</p>
//         )}
//       </div>

//       <div className="booking-section">
//         <h3>Past Bookings</h3>
//         {loading ? (
//           <p>Loading bookings...</p>
//         ) : error ? (
//           <p className="error">{error}</p>
//         ) : past.length > 0 ? (
//           <div className="booking-grid">
//             {past.map((b) => (
//               <BookingCard key={b._id} booking={b} isUpcoming={false} />
//             ))}
//           </div>
//         ) : (
//           <p>No past trips.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// // Booking Card Component
// const BookingCard = ({ booking, isUpcoming }) => {
//   return (
//     <div className={`booking-card ${isUpcoming ? "upcoming" : "completed"}`}>
//       <div className="card-header">
//         <span>Booking ID: #{booking._id.slice(-6).toUpperCase()}</span>
//         <span className={isUpcoming ? "tag upcoming-tag" : "tag past-tag"}>
//           {isUpcoming ? "Upcoming" : "Completed"}
//         </span>
//       </div>
//       <div className="card-body">
//         <h4>
//           {booking.trip.source} → {booking.trip.destination}
//         </h4>
//         <p>Date: {new Date(booking.trip.date).toLocaleDateString()}</p>
//         <p>Time: {booking.trip.time}</p>
//         <p>Seats: {booking.seats.join(", ")}</p>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;






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

  // Split bookings
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const upcoming = bookings.filter(
    (b) => b.trip && new Date(b.trip.date) >= today
  );
  const past = bookings.filter((b) => b.trip && new Date(b.trip.date) < today);

  // const accountCreationDate = new Date(
  //   user.accountCreationDate
  // ).toLocaleDateString("en-US", {
  //   year: "numeric",
  //   month: "long",
  //   day: "numeric",
  // });

  const accountCreationDate = user.accountCreationDate
    ? new Date(user.accountCreationDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Not available";

  return (
    <div className="profile-wrapper">
      {/* Profile Summary */}
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

      {/* --- ACCOUNT INFO SECTION (UPDATED) --- */}
      <div className="account-section">
        <h3>Account Details</h3>
        <div className="info-card">
          {/* Row for Name */}
          <div className="info-row">
            <p>
              <span className="info-label">Name:</span> {user.name}
            </p>
            <button className="change-button">Change</button>
          </div>
          {/* Row for Email */}
          <div className="info-row">
            <p>
              <span className="info-label">Email:</span> {user.email}
            </p>
            <button className="change-button">Change</button>
          </div>
          {/* Row for Password */}
          <div className="info-row">
            <p>
              <span className="info-label">Password:</span> ********
            </p>
            <button className="change-button">Change</button>
          </div>
          {/* Row for Member Since */}
          <div className="info-row">
            <p>
              <span className="info-label">Member Since:</span>{" "}
              {accountCreationDate}
            </p>
          </div>
        </div>
      </div>

      {/* Bookings */}
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

// Booking Card Component
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