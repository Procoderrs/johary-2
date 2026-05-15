import api from "./api";

export const validateCoupon = (code, cartTotal) =>
  api.post("/coupons/validate", { code, cartTotal });

export const getCoupons = () => api.get("/coupons");
export const createCoupon = (data) => api.post("/coupons/create", data);
export const deleteCoupon = (id) => api.delete(`/coupons/${id}`);
export const toggleCoupon = (id) => api.put(`/coupons/${id}/toggle`);