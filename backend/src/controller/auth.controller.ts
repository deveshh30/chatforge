import type { Request, Response } from "express";

export const signUp = (req: Request, res: Response) => {
    res.send("sign up route");
}

export const logIn = (req: Request, res: Response) => {
    res.send("Log In route");
}

export const logOut = (req: Request, res: Response) => {
    res.send("Log Out route");
}
