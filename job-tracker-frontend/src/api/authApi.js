import api from "./axios";

/*
========================
REGISTER
========================
*/

export const registerUser = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

/*
========================
LOGIN
========================
*/

export const loginUser = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};