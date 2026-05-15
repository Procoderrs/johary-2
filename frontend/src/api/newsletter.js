// api/newsletter.js
import api from "./api";

export const subscribeNewsletter = (email) => api.post("/newsletter/subscribe", { email });
export const getSubscribers = () => api.get("/newsletter/subscribers");
export const sendNewsletterEmail = (data) => api.post("/newsletter/send", data);