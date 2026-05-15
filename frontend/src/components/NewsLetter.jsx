import React, { useState } from "react";
import api from "../api/api";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubscribe = async () => {
    if (!email) return;
    setLoading(true);
    try {
      const res = await api.post("/newsletter/subscribe", { email });
      setMessage(res.data.message || "Subscribed successfully!");
      setIsError(false);
      setEmail("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong!");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full pb-20 px-4 md:px-16 lg:px-16 font-user text-center">
      <h2 className="text-[28px] md:text-[32px] font-medium text-[#111111] mb-4">
        Subscribe To Our Newsletter
      </h2>
      <p className="text-[#666666] text-[16px] mb-8 max-w-2xl mx-auto">
        Subscribe to our latest newsletter to get news about special discounts.
      </p>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-4 max-w-3xl mx-auto">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full sm:flex-1 px-6 py-4 border border-[#cccccc] text-[#111111] text-base focus:outline-none bg-[#f5f5f5] focus:border-[#c19417]"
        />
        <button
          onClick={handleSubscribe}
          disabled={loading}
          className="px-6 py-4 uppercase bg-[#c19417] hover:bg-[#a67b12] text-white font-semibold transition disabled:opacity-50"
        >
          {loading ? "Subscribing..." : "Subscribe"}
        </button>
      </div>

      {/* MESSAGE */}
      {message && (
        <p className={`mt-4 text-sm ${isError ? "text-red-500" : "text-green-600"}`}>
          {message}
        </p>
      )}
    </section>
  );
}