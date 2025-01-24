import express from "express";
import dotenv from "dotenv";
import dbConect from "./db/dbConect.js";
import userRoutes from "./Routes/userRoutes.js"
import bookRoutes from "./Routes/bookRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// environment variables
dotenv.config();
// database configuration
dbConect();

// middleware

app.use(express.json());
app.use(cookieParser());
const corsOption = {
  origin: "http://localhost:5173",
  credentials: true,
};


app.use(cors(corsOption));

// routes
app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);

// server static assets if in production
// listen
app.use(express.static(path.join(__dirname,"/Frontend/dist")));

app.use("*",(_,res)=>{
  res.sendFile(path.join(__dirname,"/Frontend/dist/index.html"));
 });

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
