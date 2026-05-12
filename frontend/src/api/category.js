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

  
//user apis

