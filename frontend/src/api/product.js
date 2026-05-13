import api from "./api";

// 📦 CREATE
export const createProduct = (formData) => {
  return api.post("/admin/product", formData);
};

// 📦 GET ALL PRODUCTS (admin)
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

// USER APIs
export const getTrendingProducts = () => api.get("/products/trending");
export const getFeaturedProducts = () => api.get("/products/featured");

// ✅ Yeh add karo — filter params ke saath
export const getAllProducts = (params = {}) => {
  return api.get("/products", { params });
};

// ✅ User side — slug se product
export const getProductBySlugUser = (slug) => {
  return api.get(`/products/${slug}`);
};