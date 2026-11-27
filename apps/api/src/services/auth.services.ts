import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export const registerService = async (input: RegisterInput) => {
  const hashedPassword = await bcrypt.hash(input.password, 12);

  return {
    name: input.name,
    email: input.email,
    password: hashedPassword,
  };
};

export const loginService = async (input: LoginInput) => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not configured");
  }

  // Database lookup will be connected through userRepository.
  const token = jwt.sign(
    {
      email: input.email,
    },
    secret,
    {
      expiresIn: "7d",
    },
  );

  return {
    accessToken: token,
  };
};

export const refreshTokenService = async (userId: string) => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not configured");
  }

  return {
    accessToken: jwt.sign({ userId }, secret, {
      expiresIn: "7d",
    }),
  };
};