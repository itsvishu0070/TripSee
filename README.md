#TripSee

This is a full-stack web application built with the MERN (MongoDB, Express.js, React, Node.js) stack. It is a comprehensive trip booking. The application allows users to search for, book, and manage trips, while providing a powerful dashboard for administrators to manage the platform's offerings.


Features
For Users 
Authentication: Secure user registration and login using JWT (JSON Web Tokens).

Trip Search & Filtering: Users can browse and filter available trips by source, destination, and date.

Detailed Trip View: View detailed information about a specific trip, including price and available seats.

Seat Selection: A user-friendly interface to select seats for a booking.

Booking Flow: A complete checkout and (mock) payment process.

Booking Confirmation: Users receive an instant confirmation with ticket details upon successful booking.

Downloadable Tickets: Ability to download a PDF version of the flight ticket.

My Bookings: A dedicated page to view a history of all upcoming and past bookings.

Profile Page: A dashboard-style profile page showing user details and their booking history.

Robust Error Handling: The application gracefully handles cases where trips are full, completed, or deleted by an admin.

For Admins 
Role-Based Access Control: The admin dashboard is a protected route, accessible only to users with an 'admin' role.

Trip Management (CRUD):

Create: Admins can add new trips, including details like route, date, time, price, total seats, and an image upload.

Read: View all created trips in a comprehensive table.

Update: Edit the details of any existing trip.

Delete: Remove trips from the platform.

Booking Management:

View a complete list of all bookings made by all users.

See detailed booking information for a specific trip, including the user's name, email, seats booked, and amount paid.

Secure Operations: All admin actions are protected by JWT and role-based middleware on the backend.


Setup and Installation
To run this project locally, you will need to have Node.js and MongoDB installed on your machine.

Prerequisites
Node.js (v18 or later recommended)

MongoDB (You can use a local instance or a free cloud instance from MongoDB Atlas)

1. Backend Setup
# 1. Navigate to the server directory
cd server

# 2. Install dependencies
npm install

# 3. Create a .env file in the /server directory and add the following variables:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key_for_jwt
PORT=5000
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# 4. Start the backend server
npm run dev

The server will be running on http://localhost:5000.

2. Frontend Setup
# 1. Open a new terminal and navigate to the client directory
cd client

# 2. Install dependencies
npm install

# 3. Create a .env file in the /client directory and add the following variable:
VITE_API_URL=http://localhost:5000/api

# 4. Start the frontend development server
npm run dev

The application will open in your browser, usually at http://localhost:5173.

How to Create an Admin User
The first admin user must be created manually for security.

Register a new user through the application's Sign Up page.

Connect to your MongoDB database using a tool like MongoDB Compass or the Atlas web interface.

Navigate to the users collection.

Find the user you just registered and edit the document.

Change the role field's value from "user" to "admin" and save the change.

You can now log in with that user's credentials on the "Admin Login" tab to access the admin dashboard




Tech Stack
Backend
Runtime: Node.js

Framework: Express.js

Database: MongoDB (with Mongoose ODM)

Authentication: JWT (jsonwebtoken) & bcrypt.js for password hashing

Image Uploads: Cloudinary for cloud storage, with Multer for handling file uploads.

Middleware: CORS

Frontend
Framework: React (using Vite for a fast development experience)

Routing: React Router DOM

State Management: React Context API

API Communication: Axios

Styling:

CSS Modules for component-scoped styling.

Vanilla CSS for the Profile Page

PDF Generation: jsPDF

