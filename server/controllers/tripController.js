import Trip from "../models/Trip.js";
import Booking from "../models/Booking.js";

export const createTrip = async (req, res) => {
  try {
    const { source, destination, date, time, price, totalSeats } = req.body;

    
    const imageUrl = req.file.path;

    const trip = new Trip({
      source,
      destination,
      date,
      time,
      price,
      totalSeats,
      imageUrl,
    });

    const createdTrip = await trip.save();
    res.status(201).json(createdTrip);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating trip", error: error.message });
  }
};


export const getTrips = async (req, res) => {
  try {
  
    const filter = {};
    if (req.query.source) {
      filter.source = { $regex: req.query.source, $options: "i" }; 
    }
    if (req.query.destination) {
      filter.destination = { $regex: req.query.destination, $options: "i" };
    }
    if (req.query.date) {
      
      const searchDate = new Date(req.query.date);
      const nextDay = new Date(req.query.date);
      nextDay.setDate(searchDate.getDate() + 1);
      filter.date = { $gte: searchDate, $lt: nextDay };
    }

    const trips = await Trip.find(filter);
    res.json(trips);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching trips", error: error.message });
  }
};


export const getTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (trip) {
      res.json(trip);
    } else {
      res.status(404).json({ message: "Trip not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching trip", error: error.message });
  }
};


export const updateTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (trip) {
    
      trip.source = req.body.source || trip.source;
      trip.destination = req.body.destination || trip.destination;
     
      const updatedTrip = await trip.save();
      res.json(updatedTrip);
    } else {
      res.status(404).json({ message: "Trip not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating trip", error: error.message });
  }
};


export const deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (trip) {
      await trip.deleteOne();
      res.json({ message: "Trip removed" });
    } else {
      res.status(404).json({ message: "Trip not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting trip", error: error.message });
  }
};


export const getTripBookings = async (req, res) => {
  try {
   
    const bookings = await Booking.find({ trip: req.params.id }).populate(
      "user",
      "name email"
    );

    if (!bookings) {
      return res
        .status(404)
        .json({ message: "No bookings found for this trip" });
    }

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};





