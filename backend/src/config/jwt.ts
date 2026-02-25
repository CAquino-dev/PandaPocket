export const jwtConfig = {
  accessTokenSecret: process.env.JWT_SECRET || "fallbacksecret", // fallback only for dev
  accessTokenExpiry: process.env.JWT_EXPIRES_IN || "15m",
};