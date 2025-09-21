
import Booking from "../models/Booking.js";
import Trip from "../models/Trip.js";


export const createBooking = async (req, res) => {
  const { tripId, seats, totalAmount } = req.body;
  const userId = req.user._id;

  try {
    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }
    const isSeatTaken = seats.some((seat) => trip.bookedSeats.includes(seat));
    if (isSeatTaken) {
      return res
        .status(400)
        .json({ message: "One or more selected seats are already booked" });
    }
    const booking = new Booking({
      user: userId,
      trip: tripId,
      seats,
      totalAmount,
    });
    const createdBooking = await booking.save();
    trip.bookedSeats.push(...seats);
    await trip.save();
    res.status(201).json(createdBooking);
  } catch (error) {
    res.status(500).json({
      message: "Server error while creating booking",
      error: error.message,
    });
  }
};


export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate(
      "trip"
    );
    res.json(bookings);
  } catch (error) {
    res.status(500).json({
      message: "Server error while fetching bookings",
      error: error.message,
    });
  }
};


export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({})
      .populate("user", "name email")
      .populate("trip", "source destination date");
    res.json(bookings);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error while fetching all bookings" });
  }
};