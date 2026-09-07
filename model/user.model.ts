import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            unique: true,
            required: true
        },
        googleId: {
            type: String,
            unique: true,
            sparse: true,
        },
        userName: {
            type: String,
            required: true
        },
        isOnline: {
            type: Boolean,
            required: true,
            default: false,
        },
        avatar: {
            type: String,
        },
        userMsg: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Msg"
        }]
    },

    { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);

export default userModel;

