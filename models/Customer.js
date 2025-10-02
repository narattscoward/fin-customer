import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  memberNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  interests: {
    type: String,
  },
});

// Prevent recompilation of model if it already exists
export default mongoose.models.Customer || mongoose.model("Customer", CustomerSchema);