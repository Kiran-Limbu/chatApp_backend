import express from "express";
import userModel from "../model/user.model.ts";
import authMiddleware from "../middlewares/authUser.ts";

const router = express.Router();

router.get("/me/:id", authMiddleware, async (req, res) => {
  try {
     const userId = req.params.id;
     if(!userId){
      return res.status(404).json({
        message: "URL not match",
      });
     }
    const user = await userModel.findById(userId)

    if (!user) {
       return res.status(404).json({
        message: "User not found",
      });
    }

  return res.status(200).json(user);
  } catch (error) {
     return res.status(500).json({
      message: "Failed to get user",
    });
  }
});

router.get("/logout", (req, res) =>{
   res.cookie('jwtAuth', '', {
        httpOnly: true,
        sameSite: 'lax',
        secure: false,
        expires: new Date(0),
    });
    res.status(200).json({ message: "User logout sucessfully" });
})


export default router;
