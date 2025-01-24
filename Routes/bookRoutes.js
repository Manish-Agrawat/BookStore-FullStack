import express from "express";
import { addBook, getBooks } from "../controllers/booksControllers.js";
import upload from "../Middleware/multer.js";
import auth from "../Middleware/auth.js";


const router =express.Router();

router.post("/addBook" , auth , upload.single('coverImage') , addBook);

router.get("/getBook", getBooks);

export default router;