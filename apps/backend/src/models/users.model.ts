import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  user_id: { type: String },
  name: String,
  email: String,
  password: String,
});

const User = model("user", UserSchema);

export default User;
