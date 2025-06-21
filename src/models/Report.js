import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  whatWasDone: {
    type: String,
    required: true,
  },
  whatToDoTomorrow: {
    type: String,
    required: true,
  },
  blockers: {
    type: String,
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("Report", reportSchema);
