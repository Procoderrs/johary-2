import api from "./api";

// GET all filters
export const getFilters = () => {
  return api.get("/admin/filters");
};

// CREATE filter
export const createFilter = (data) => {
  return api.post("/admin/filters", data);
};

// DELETE filter
export const deleteFilter = (id) => {
  return api.delete(`/admin/filters/${id}`);
};