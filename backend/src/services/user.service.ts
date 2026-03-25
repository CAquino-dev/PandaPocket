import bcrypt from "bcrypt";
import { User } from "../models/user.model";
import { jwtConfig } from "../config/jwt";
import jwt from "jsonwebtoken";
import Account from "../models/accounts.model"

interface RegisterUserInput {
  name: string;
  email: string;
  password: string;
}

interface LoginUserInput {
  email: string;
  password: string;
}

const DEFAULT_ACCOUNTS = [
  { name: "Cash",    type: "cash",    balance: 0, currency: "PHP" },
  { name: "Bank",    type: "bank",    balance: 0, currency: "PHP" },
  { name: "Savings", type: "savings", balance: 0, currency: "PHP" },
  { name: "Wallet",  type: "ewallet", balance: 0, currency: "PHP" },
];

export const registerUser = async (data: RegisterUserInput) => {
  const { name, email, password } = data;

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("Email already registered");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  await Account.insertMany(
    DEFAULT_ACCOUNTS.map((account) => ({
      ...account,
      userId: user._id,
    }))
  );

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
};

export const userLogin = async (data: LoginUserInput) => {
  const { email, password } = data;

  const user = await User.findOne({
    email: email.toLowerCase(),
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid Email or Password");
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    jwtConfig.accessTokenSecret,
    { expiresIn: jwtConfig.accessTokenExpiry }
  );

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  };
};