import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../config/database.js";
import ApiError from "../utils/ApiError.js"; // ⭐ NEW

const SALT_ROUNDS = 10;

/*
========================
REGISTER USER
========================
*/

export const registerUserService = async ({ name, email, password }) => {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    // ⭐ CHANGED
    throw new ApiError(409, "User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
};

/*
========================
LOGIN USER
========================
*/

export const loginUserService = async ({ email, password }) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    // ⭐ CHANGED
    throw new ApiError(401, "Invalid credentials");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    // ⭐ CHANGED
    throw new ApiError(401, "Invalid credentials");
  }

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
};