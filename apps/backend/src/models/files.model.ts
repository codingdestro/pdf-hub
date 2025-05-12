import { Schema, model } from "mongoose";

const FileSchema = new Schema({
  user_id: String,
  file_id: String,
  filename: String,
});

const File = model("files", FileSchema);
export default File;
