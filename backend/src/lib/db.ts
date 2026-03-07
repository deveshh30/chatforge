import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL as string);
        console.log(`DATABASE CONNECTED : ${conn.connection.host}`)
    } catch (error) {
        console.log("DATABASE CONNECTION ERROR : ", error);
    }
}
