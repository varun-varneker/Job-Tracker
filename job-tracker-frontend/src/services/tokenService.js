const TOKEN_KEY = "jobTrackerToken";
const USER_KEY = "jobTrackerUser";

/*
========================
TOKEN
========================
*/

export const saveToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

/*
========================
USER
========================
*/

export const saveUser = (user) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUser = () => {
  const user = localStorage.getItem(USER_KEY);

  return user ? JSON.parse(user) : null;
};

export const removeUser = () => {
  localStorage.removeItem(USER_KEY);
};

/*
========================
AUTH
========================
*/

export const isAuthenticated = () => {
  return !!getToken();
};

export const clearAuth = () => {
  removeToken();
  removeUser();
};