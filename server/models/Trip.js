import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
  source: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  totalSeats: {
    type: Number,
    required: true,
  },
  bookedSeats: {
    type: [String],
    default: [],
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

const Trip = mongoose.model("Trip", tripSchema);

export default Trip;
