import api from "./api";



// Get tree
export const getCategories = () => {
  return api.get("/categories");
};

// Create category
export const createCategory = (data) => {
  return api.post("/admin/categories/create", data);
};
// UPDATE
export const updateCategory = (id, data) => {
  return api.put(`/admin/categories/${id}`, data);
};

// DELETE
export const deleteCategory = (id) => {
  return api.delete(`/admin/categories/${id}`);
};
/* export const addCategory = async (name, parentId = null) => {
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
}; */