import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    time: {
      type: String,
    },
  },

  { timestamps: true },
);

const messageModel = mongoose.model("Msg", messageSchema);

export default messageModel;
