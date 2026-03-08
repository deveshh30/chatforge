import jwt from "jsonwebtoken";
import type { Response } from "express";
import type { Types } from "mongoose";

export const generateToken = (userId: Types.ObjectId, res: Response) => {
    const token = jwt.sign(
        {userId: userId.toString()} ,
        process.env.JWT_SECRET as string,
        {expiresIn : "7d"}    
    );

    res.cookie("jwt" , token , {
        maxAge : 7 * 24 * 60 * 60 * 1000,
        httpOnly : true, //this will help to prevent xss attack ie cross-site scripting attacks
        sameSite : "strict",
        secure : process.env.NODE_ENV !== "development"
    })
    return token;
};