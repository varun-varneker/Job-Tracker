import asyncHandler from "../utils/asyncHandler.js"; // ⭐ NEW
import ApiError from "../utils/ApiError.js"; // ⭐ NEW

import {
  registerUserService,
  loginUserService,
} from "../services/authService.js";

/*
========================
REGISTER USER
========================
*/

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    // ⭐ CHANGED
    throw new ApiError(400, "All fields are required");
  }

  const user = await registerUserService({
    name,
    email,
    password,
  });

  res.status(201).json({
    success: true, // ⭐ NEW
    message: "User registered successfully",
    user,
  });
});

/*
========================
LOGIN USER
========================
*/

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    // ⭐ CHANGED
    throw new ApiError(400, "Email and password are required");
  }

  const result = await loginUserService({
    email,
    password,
  });

  res.status(200).json({
    success: true, // ⭐ NEW
    message: "Login successful",
    ...result,
  });
});