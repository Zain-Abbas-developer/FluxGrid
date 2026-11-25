import dotenv from "dotenv";

dotenv.config();

const getEnv = (key: string): string => {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
};

export const env = {
  nodeEnv: process.env.NODE_ENV || "development",

  port: Number(process.env.PORT || 3000),

  mongoUri: getEnv("MONGO_URI"),

  redisUrl: getEnv("REDIS_URL"),

  jwtSecret: getEnv("JWT_SECRET"),

  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",

  corsOrigin: getEnv("CORS_ORIGIN"),
};