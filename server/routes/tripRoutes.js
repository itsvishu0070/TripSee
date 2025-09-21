import express from "express";
import {
  createTrip,
  getTrips,
  getTripById,
  updateTrip,
  deleteTrip,
  getTripBookings
} from "../controllers/tripController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import upload from "../config/cloudinaryConfig.js";

const router = express.Router();

// Public routes
router.get("/", getTrips);
router.get("/:id", getTripById);

// Admin-only routes
router.get("/:id/bookings", protect, admin, getTripBookings);
router.get("/:id", getTripById);
router.post("/", protect, admin, upload.single("imageUrl"), createTrip);
router.put("/:id", protect, admin, updateTrip);
router.delete("/:id", protect, admin, deleteTrip);

export default router;



