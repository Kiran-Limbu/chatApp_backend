import mongoose from "mongoose";

export default function connectToDB(){
    const dburl = process.env.DBURL as string;

    try {
        mongoose.connect(dburl);
        console.log("DB Connected Sucessfully ✅");
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}