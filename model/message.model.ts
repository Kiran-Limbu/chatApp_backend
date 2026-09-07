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
        userId:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }]
    },

    {timestamps: true}
);

const messageModel = mongoose.model("Msg", messageSchema);

export default messageModel;