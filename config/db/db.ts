import mongoose from "mongoose";

export default async function connectToDB() {
    try {
        const dburl = process.env.DB_PRODUCTION_URL as string;
        await mongoose.connect(dburl);
        console.log("DB connect successfully");
    } catch (error) {
        console.error(error);
    }
}