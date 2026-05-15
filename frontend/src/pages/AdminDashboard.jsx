import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAllOrders } from "../api/order";
import { getUsers } from "../api/users";
import { getProducts } from "../api/product";
import { useQuery } from '@tanstack/react-query';

import {
  RiShoppingBag3Line,
  RiUser3Line,
  RiGeminiLine,
  RiMoneyDollarCircleLine,
} from "@remixicon/react";

export function AdminDashboard() {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  // ✅ yeh lagao

const { data: orders = [], isLoading: ordersLoading } = useQuery({
  queryKey: ['admin-orders'],
  queryFn: () => getAllOrders().then(r => r.data?.data || []),
});

const { data: users = [] } = useQuery({
  queryKey: ['admin-users'],
  queryFn: () => getUsers().then(r => r.data?.data || []),
});

const { data: products = [] } = useQuery({
  queryKey: ['admin-products'],
  queryFn: () => getProducts().then(r => r.data?.data || []),
});

const loading = ordersLoading;
  // Revenue — paid orders ka total
  const revenue = orders
    .filter(o => o.paymentStatus === "paid")
    .reduce((sum, o) => sum + (o.total || 0), 0);

  const stats = [
    {
      title: "Total Orders",
      value: orders.length,
      icon: <RiShoppingBag3Line size={22} />,
    },
    {
      title: "Total Users",
      value: users.length,
      icon: <RiUser3Line size={22} />,
    },
    {
      title: "Products",
      value: products.length,
      icon: <RiGeminiLine size={22} />,
    },
    {
      title: "Revenue",
      value: `$${revenue.toFixed(0)}`,
      icon: <RiMoneyDollarCircleLine size={22} />,
    },
  ];

  const STATUS_STYLES = {
    pending: "bg-yellow-50 border-yellow-200 text-yellow-600",
    processing: "bg-blue-50 border-blue-200 text-blue-600",
    shipped: "bg-purple-50 border-purple-200 text-purple-600",
    delievered: "bg-bg-4 border-border-3 text-text-3",
    cancelled: "border text-discount border-red-100",
  };

  const handleLogout = () => {
    logout();
    navigate("/dashboard");
  };

  // Recent 5 orders
  const recentOrders = orders.slice(0, 5);

  return (
    <div className="min-h-screen font-user bg-bg p-6">

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-10">
        <div>
          <p className="text-xs uppercase tracking-[4px] text-primary-gold-accent font-medium mb-2">
            Jewelry Admin
          </p>
          <h1 className="text-5xl text-dark-text leading-none" style={{ fontFamily: "var(--font-heading)" }}>
            Dashboard
          </h1>
          <p className="text-text-light text-sm mt-3">
            Welcome back, {user?.name || "Admin"} ✦
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="bg-primary-gold-accent hover:bg-hover-bg text-white px-6 py-3 rounded-full transition-all text-sm shadow-sm"
        >
          Logout
        </button>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-card border border-border-1 rounded-[30px] p-6 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="w-14 h-14 rounded-2xl bg-bg-4 border border-border-3 flex items-center justify-center text-text-3">
                {stat.icon}
              </div>
              <div className="w-2 h-2 rounded-full bg-primary-gold-accent"></div>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[3px] text-text-5 mb-3">
                {stat.title}
              </p>
              <h2 className="text-5xl text-dark-text leading-none" style={{ fontFamily: "var(--font-heading)" }}>
                {loading ? "..." : stat.value}
              </h2>
            </div>
            <div className="absolute -bottom-8 -right-8 w-28 h-28 rounded-full bg-hover-soft opacity-50"></div>
          </div>
        ))}
      </div>

      {/* RECENT ORDERS */}
      <div className="bg-card border border-border-1 rounded-[32px] shadow-sm overflow-hidden">

        {/* HEADER */}
        <div className="px-8 py-6 border-b border-border-1 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[4px] text-primary-gold-accent mb-2">
              Orders Overview
            </p>
            <h2 className="text-3xl text-dark-text" style={{ fontFamily: "var(--font-heading)" }}>
              Recent Orders
            </h2>
          </div>
          <Link
            to="/admin/orders"
            className="text-xs text-primary-gold-accent border border-primary-gold-accent px-4 py-2 rounded-full hover:bg-primary-gold-accent hover:text-white transition"
          >
            View All
          </Link>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead className="bg-bg-1">
              <tr className="text-left">
                <th className="px-8 py-5 text-xs uppercase tracking-[3px] text-text-5 font-medium">Order ID</th>
                <th className="px-8 py-5 text-xs uppercase tracking-[3px] text-text-5 font-medium">Customer</th>
                <th className="px-8 py-5 text-xs uppercase tracking-[3px] text-text-5 font-medium">Items</th>
                <th className="px-8 py-5 text-xs uppercase tracking-[3px] text-text-5 font-medium">Amount</th>
                <th className="px-8 py-5 text-xs uppercase tracking-[3px] text-text-5 font-medium">Payment</th>
                <th className="px-8 py-5 text-xs uppercase tracking-[3px] text-text-5 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-8 py-10 text-center text-text-light">
                    Loading...
                  </td>
                </tr>
              ) : recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-8 py-10 text-center text-text-light">
                    No orders yet
                  </td>
                </tr>
              ) : (
                recentOrders.map((order) => (
                  <tr key={order._id} className="border-t border-border hover:bg-hover-soft transition-all">

                    {/* ORDER ID */}
                    <td className="px-8 py-6">
                      <p className="text-dark-text font-medium font-mono text-sm">
                        #{order._id.slice(-6).toUpperCase()}
                      </p>
                      <p className="text-xs text-text-light mt-1">
                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                          month: "short", day: "numeric"
                        })}
                      </p>
                    </td>

                    {/* CUSTOMER */}
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-bg-4 border border-border-3 flex items-center justify-center text-text-3 text-sm font-medium flex-shrink-0">
                          {order.shippingAddress?.fullName?.charAt(0)?.toUpperCase() || "G"}
                        </div>
                        <div>
                          <p className="text-dark-text font-medium text-sm">
                            {order.shippingAddress?.fullName || "Guest"}
                          </p>
                          <p className="text-xs text-text-light mt-0.5">
                            {order.shippingAddress?.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* ITEMS */}
                    <td className="px-8 py-6">
                      <div className="flex -space-x-2">
                        {order.items.slice(0, 3).map((item, i) => (
                          <img
                            key={i}
                            src={item.image || "/placeholder.jpg"}
                            alt={item.name}
                            className="w-8 h-8 rounded-full border-2 border-white object-cover"
                          />
                        ))}
                      </div>
                      <p className="text-xs text-text-light mt-1">
                        {order.items.length} item{order.items.length > 1 ? "s" : ""}
                      </p>
                    </td>

                    {/* AMOUNT */}
                    <td className="px-8 py-6">
                      <p className="text-dark-text font-medium">
                        ${order.total?.toFixed(2)}
                      </p>
                    </td>

                    {/* PAYMENT */}
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.paymentStatus === "paid"
                          ? "bg-green-50 text-green-600"
                          : order.paymentStatus === "failed"
                          ? "bg-red-50 text-red-500"
                          : "bg-yellow-50 text-yellow-600"
                      }`}>
                        {order.paymentStatus}
                      </span>
                    </td>

                    {/* STATUS */}
                    <td className="px-8 py-6">
                      <span className={`px-4 py-2 rounded-full border text-xs ${STATUS_STYLES[order.orderStatus] || STATUS_STYLES.pending}`}>
                        {order.orderStatus}
                      </span>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;