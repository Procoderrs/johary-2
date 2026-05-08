import api from "./api";

// 📦 CREATE
export const createProduct = (formData) => {
  return api.post("/admin/product", formData);
};

// 📦 GET ALL PRODUCTS
export const getProducts = () => {
  return api.get("/admin/product");
};

// 📦 GET SINGLE PRODUCT
export const getProductBySlug = (slug) => {
  return api.get(`/admin/product/${slug}`);
};

// 📦 UPDATE PRODUCT
export const updateProduct = (slug, formData) => {
  return api.put(`/admin/product/${slug}`, formData);
};

// 📦 DELETE PRODUCT
export const deleteProduct = (slug) => {
  return api.delete(`/admin/product/${slug}`);
};