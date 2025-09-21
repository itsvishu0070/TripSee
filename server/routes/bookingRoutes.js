import express from "express";
import {
  createBooking,
  getUserBookings,
  getAllBookings,
} from "../controllers/bookingController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// User-specific routes
router.post("/", protect, createBooking);
router.get("/mybookings", protect, getUserBookings);

// Admin-only route
router.get("/all", protect, admin, getAllBookings);

export default router;
