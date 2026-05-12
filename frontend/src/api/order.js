import api from "./api";

export const createOrder = (orderData) => api.post("/orders/create", orderData);
export const getOrderById = (id) => api.get(`/orders/${id}`);
export const payOrder = (id) => api.post(`/orders/${id}/pay`);
export const getMyOrders = () => api.get("/orders/my-orders");