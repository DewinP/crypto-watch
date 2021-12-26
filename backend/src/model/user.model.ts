import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

export interface UserInput {
  username: string;
  email: string;
  password: string;
}

export interface UserDocument extends mongoose.Document {
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword: (candidatePassword: string) => Promise<boolean>;
}

// User Schema
const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  let user = this as UserDocument;

  if (!user.isModified("password")) return next();
  const salt = await bcrypt.genSalt(config.get<number>("saltRounds"));
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
  next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as UserDocument;
  return await bcrypt.compare(candidatePassword, user.password);
};

// User Model
const UserModel = mongoose.model<UserDocument>("User", userSchema);

export default UserModel;
