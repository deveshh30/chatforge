import type { Request, Response } from "express";
import User from "../models/user.model.ts";
import bcrypt from "bcryptjs";
import {generateToken} from "../lib/utils.ts"

export const signUp = async (req: Request, res: Response) => {
    const {fullName , email , password , userName  } = req.body;
    
    try {
        if (!fullName || !email || !password || !userName) {
            return res.status(400).json({message: "All fields are required"});
        }

        if (password.length < 6) {
            return res.status(400)
            .json({message : "password must be atleast 6 character"})
        }

        const user = await User.findOne({ $or: [{email}, {userName}] });
        if (user) {
            return res.status(400).json({message: "User already exists"});
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(password , salt)

        const newUser = new User({
            fullName,
            email,
            password : hashedPass,
            userName,
            // ProfileImage,
        })

        if(newUser) {
            await newUser.save();
            generateToken(newUser._id, res);

            res.status(201)
            .json({
                _id : newUser._id,
                fullName : newUser.fullName,
                email : newUser.email,
                // ProfileImage : newUser.ProfileImage,
            });
        } else {
            res.status(400)
            .json({message : "invalid user data"});
        }
    } catch (error: any) {
        console.log("error in signup controller" , error.message);
        res.status(500)
        .json({error})
        
    }
}

export const logIn = async (req: Request, res: Response) => {
    try {
        const { email, userName, password } = req.body;

        if (!userName && !email) {
            return res.status(400).json({ message: "username or email is required" });
        }

        if (!password) {
            return res.status(400).json({ message: "password is required" });
        }

        const user = await User.findOne({
            $or: [{ userName }, { email }]
        });

        if (!user) {
            return res.status(404).json({ message: "user does not exist" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "invalid user credentials" });
        }

        generateToken(user._id, res);

        return res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            userName: user.userName,
            // ProfileImage: user.ProfileImage,
            message: "user logged in successfully"
        });
    } catch (error) {
        console.log("error in login controller", error);
        res.status(500).json({ error });
    }
};

export const logOut = async (req: Request, res: Response) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "logged out successfully" });
    } catch (error) {
        console.log("error in logout controller", error);
        res.status(500).json({ message: "error in logging out" });
    }
}
 