import api from "./api";

// Order create karo
export const createOrder = (orderData) => {
  return api.post("/orders/create", orderData);
};

// My orders
export const getMyOrders = () => {
  return api.get("/orders/my-orders");
};