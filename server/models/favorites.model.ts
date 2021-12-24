import mongoose from "mongoose";
import { UserDocument } from "./user.model";

export interface FavoriteDocument extends mongoose.Document {
  user: UserDocument["_id"];
  sessionId: string;
  amount: number;
  userName: string;
  projectName: string;
}

const favoriteSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
    sessionId: { type: String, required: true, unique: true },
    amount: { type: Number, required: true },
    userName: { type: String, required: true },
    projectName: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const FavoriteModel = mongoose.model<FavoriteDocument>(
  "favorite",
  favoriteSchema
);

export default FavoriteModel;
