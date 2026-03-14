import { SignOptions } from "jsonwebtoken";

export const jwtConfig: {
  accessTokenSecret: string;
  accessTokenExpiry: SignOptions["expiresIn"];
} = {
  accessTokenSecret: process.env.JWT_SECRET ?? "fallbacksecret",
  accessTokenExpiry: (process.env.JWT_EXPIRES_IN ?? "1h") as SignOptions["expiresIn"],
};