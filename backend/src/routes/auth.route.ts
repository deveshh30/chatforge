import express from "express";
import { signUp, logIn, logOut } from "../controller/auth.controller.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", logIn);
router.post("/logout", logOut);

export default router;
