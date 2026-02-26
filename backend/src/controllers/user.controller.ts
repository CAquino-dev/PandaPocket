import { Request, Response } from "express";
import { 
    registerUser,
    userLogin 
} from "../services/user.service";

export const register = async (req: Request, res: Response) => {
  try {
    const user = await registerUser(req.body);

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const result = await userLogin({ email, password });

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    return res.status(401).json({
      success: false,
      message: error.message || "Invalid credentials",
    });
  }
};