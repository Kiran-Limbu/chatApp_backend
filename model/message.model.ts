import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
        },
        sender: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        },
        time: {
            type: Date.now(),
        },
    },

    {timestamps: true}
);

const messageModel = mongoose.model("Msg", messageSchema);

export default messageModel;