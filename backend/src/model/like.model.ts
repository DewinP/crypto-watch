import mongoose from "mongoose";
import { UserDocument } from "./user.model";

export interface FavoriteDocument extends mongoose.Document {
  user_id: UserDocument["_id"];
  coin_id: string;
}

const likeSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    coin_id: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const FavoriteModel = mongoose.model<FavoriteDocument>(
  "like",
  likeSchema
);

export default FavoriteModel;
