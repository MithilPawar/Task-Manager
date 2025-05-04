import API from "../utils/axiosInstance.js";

export const registerUser = async (name, username, email, password) => {
  const res = await API.post("/users/register", {
    name,
    username,
    email,
    password,
  });
  return res.data;
};

export const loginUser = async (username, password) => {
  const response = await API.post("/users/login", { username, password });
  return response.data;
};

export const logoutUser = async () => {
  const res = await API.post("/users/logout");
  return res.data;
};

export const refreshAccessToken = async () => {
  const res = await API.post("/users/refresh-tokens");
  return res.data;
};

export const checkUser = async () => {
  const res = await API.get("/users/check-user");
  return res.data;
};
