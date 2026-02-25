import bcrypt from "bcrypt";
import { User } from "../models/user.model";

interface RegisterUserInput {
  name: string;
  email: string;
  password: string;
}

interface LoginUserInput {
  email: string;
  password: string;
}

export const registerUser = async (data: RegisterUserInput) => {
  const { name, email, password } = data;

  // 1. Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email already registered");
  }

  // 2. Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // 3. Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  // 4. Return safe user data
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
};

export const userLogin = async(data: LoginUserInput) => {
    const { email, password } = data;

    

};