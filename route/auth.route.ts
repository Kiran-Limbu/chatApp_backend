import express from "express"
import passport from "passport";
import createAuthToken from "../utils/createToken.ts";
import userModel from "../model/user.model.ts";

const router = express.Router();

router.get("/login/failed", (req, res) =>{
    res.send(401).json({
        error: true,
        message: "Login failure !"
    });
});

router.get("/login/success", (req, res) =>{
    if(req.user){
        res.status(200).json({
            error: false,
            message: "Successfully Loged In",
            user: req.user,
        });
    } else{
        res.status(403).json({ error: true, message: "Not Authorized"});
    }
});

router.get(
  "/google/callback",

  passport.authenticate("google", {
    session: false,
    failureRedirect: process.env.CLIENT_URL,
  }),

   async (req, res) => {
    try {
      const user = await userModel.find({});

       createAuthToken(res, user[0]._id);

      res.redirect(`${process.env.CLIENT_URL}/wellcome`);
    } catch (error) {
      console.error("Token creation failed:", error);

      res.redirect(process.env.CLIENT_URL!);
    }
  }
);
     router.get("/google", passport.authenticate("google",{ 
        scope: ["profile", "email"],
    })
);


export default router;