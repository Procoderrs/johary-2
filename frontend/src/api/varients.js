import api from "./api";

// GET ALL VARIANTS
export const getVariants = () =>
  api.get("/admin/variants");

// CREATE
export const createVariant = (data) =>
  api.post("/admin/variants", data);

// UPDATE
export const updateVariant = (id, data) =>
  api.put(`/admin/variants/${id}`, data);

// DELETE
export const deleteVariant = (id) =>
  api.delete(`/admin/variants/${id}`);