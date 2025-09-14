import mongoose from "mongoose";

const boardSchema = new mongoose.Schema({
  name: { type: String, required: true },          // Board name (e.g., "Team Project")
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Owner
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]  // Team members
}, { timestamps: true });

export default mongoose.model("Board", boardSchema);
