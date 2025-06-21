import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  idAuthor: {
    type: String,
    required: true,
  },
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
    required: false,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("Report", reportSchema);
