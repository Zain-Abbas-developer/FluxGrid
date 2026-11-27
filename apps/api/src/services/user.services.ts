import { userRepository } from "../repositories/user.repository";

export const createUserService = async (data: {
  name: string;
  email: string;
  password: string;
  role?: string;
}) => {
  const existingUser = await userRepository.findByEmail(data.email);

  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  return userRepository.create(data);
};

export const getUsersService = async (options: {
  page?: number;
  limit?: number;
}) => {
  return userRepository.findMany(options);
};

export const getUserByIdService = async (id: string) => {
  const user = await userRepository.findById(id);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

export const updateUserService = async (
  id: string,
  data: Record<string, unknown>,
) => {
  const user = await userRepository.findById(id);

  if (!user) {
    throw new Error("User not found");
  }

  return userRepository.updateById(id, data);
};

export const deleteUserService = async (id: string) => {
  const user = await userRepository.findById(id);

  if (!user) {
    throw new Error("User not found");
  }

  return userRepository.deleteById(id);
};