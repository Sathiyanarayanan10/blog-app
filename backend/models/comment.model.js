import { Schema } from "mongoose";
import mongoose from "mongoose";

const commentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectID,
      ref: "User",
      required: true,
    },
    post: {
        type: Schema.Types.ObjectID,
        ref: "Post",
        required: true,
      },
    desc: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Comment", commentSchema);
