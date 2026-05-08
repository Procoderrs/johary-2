import api from "./api";

// 📦 GET ALL USERS
export const getUsers = () => {
  return api.get("/admin/users");
};