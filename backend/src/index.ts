import express from "express";
import authRoutes from "./routes/auth.route.ts"
import dotenv from "dotenv"
import { connectDB } from "./lib/db.ts";
import cookieParser from "cookie-parser"
import messageRoute from "./routes/message.route.ts"
import cors from "cors"

const app = express();
dotenv.config()
const PORT = process.env.PORT

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());
app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}
));

app.use("/api/auth" , authRoutes);
app.use("/api/message" , messageRoute);

app.listen(PORT , () => {
    console.log(`server is running on port : ${PORT} `);
    connectDB()
});
