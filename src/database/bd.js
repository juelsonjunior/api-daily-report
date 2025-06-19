import mongoose from "mongoose";

async function conectBD() {
  await mongoose.connect(
    "***REMOVED***"
  );
}

export default conectBD()
