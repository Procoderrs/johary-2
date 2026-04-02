import api from "./api";

export const fetchCategories = async () => {
  const res = await api.get("/categories");
  return res.data;
};

export const addCategory = async (name, parentId = null) => {
  const res = await api.post("/categories", { name, parentId });
  return res.data;
};

export const updateCategory = async (id, name, parentId = null) => {
  const res = await api.put(`/categories/${id}`, { name, parentId });
  return res.data;
};

export const deleteCategory = async (id) => {
  const res = await api.delete(`/categories/${id}`);
  return res.data;
};