import express from "express";
import userModel from "../model/user.model.ts";
import authMiddleware from "../middlewares/authUser.ts";

const router = express.Router();


router.get("/me",  async (req, res) => {
  try {
    const user = await userModel.findById(req.user);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      user,
    });
  } catch (error) {
    console.error("Get current user error:", error);

    return res.status(500).json({
      message: "Failed to get user",
    });
  }
});
export default router;
