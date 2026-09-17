import express from "express"
import messageModel from "../model/message.model.ts";

const route = express.Router();

route.get("", async (req, res) =>{
    try{
        const allMsg = await messageModel.find({}).sort({ createdAt: -1 })
        res.status(200).json({ allMsg });
    } catch (error){
        console.error(error);
        res.status(400).json({ message: `Can't fetch the user ${error}`})
    }
})

export default route;