import express from "express";
import userModel from "../model/user.model.ts";
import authMiddleware from "../middlewares/authUser.ts";

const router = express.Router();

router.post("/", async (req, res) =>{
    const {email} = req.body;
    const findUser = await userModel.findOne({email});
    res.status(200).json(findUser)
})
router.get("/me", authMiddleware, async (req, res) => {
    try {
    if (!req.user) {
      return res.status(401).json({
        message: "Not authenticated",
      });
    }

    const user = await userModel.findById(req.user.userId);

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
