import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

// Remix Icons
import {
  RiShoppingBag3Line,
  RiUser3Line,
  RiGeminiLine,
  RiMoneyDollarCircleLine,
} from  "@remixicon/react";

export function AdminDashboard() {
  const stats = [
    {
      title: "Total Orders",
      value: 120,
      icon: <RiShoppingBag3Line size={22} />,
      color: "from-indigo-500 to-indigo-700",
      iconBg: "bg-indigo-100 text-indigo-600",
    },
    {
      title: "Total Users",
      value: 80,
      icon: <RiUser3Line size={22} />,
      color: "from-purple-500 to-purple-700",
      iconBg: "bg-purple-100 text-purple-600",
    },
    {
      title: "Products",
      value: 45,
      icon: <RiGeminiLine size={22} />,
      color: "from-pink-500 to-pink-600",
      iconBg: "bg-pink-100 text-pink-600",
    },
    {
      title: "Revenue",
      value: "$5,200",
      icon: <RiMoneyDollarCircleLine size={22} />,
      color: "from-yellow-500 to-yellow-600",
      iconBg: "bg-yellow-100 text-yellow-600",
    },
  ];

  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
  <div className="min-h-screen bg-bg p-6">

    {/* HEADER */}
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-10">

      <div>

        <p className="text-xs uppercase tracking-[4px] text-primary-gold-accent font-medium mb-2">
          Jewelry Admin
        </p>

        <h1
          className="text-5xl text-dark-text leading-none"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Dashboard
        </h1>

        <p className="text-text-light text-sm mt-3">
          Welcome back, {user?.name || "Admin"} ✦
        </p>

      </div>

      <button
        onClick={handleLogout}
        className="
          bg-primary-gold-accent
          hover:bg-hover-bg
          text-white
          px-6 py-3
          rounded-full
          transition-all
          text-sm
          shadow-sm
        "
      >
        Logout
      </button>

    </div>

    {/* STATS */}
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

      {stats.map((stat, index) => (
        <div
          key={index}
          className="
            bg-card
            border border-border-1
            rounded-[30px]
            p-6
            shadow-sm
            hover:shadow-md
            transition-all duration-300
            relative overflow-hidden
          "
        >

          {/* TOP */}
          <div className="flex items-center justify-between mb-8">

            <div
              className="
                w-14 h-14
                rounded-2xl
                bg-bg-4
                border border-border-3
                flex items-center justify-center
                text-text-3
              "
            >
              {stat.icon}
            </div>

            <div className="
              w-2 h-2
              rounded-full
              bg-primary-gold-accent
            "></div>

          </div>

          {/* TEXT */}
          <div>

            <p className="text-sm uppercase tracking-[3px] text-text-5 mb-3">
              {stat.title}
            </p>

            <h2
              className="text-5xl text-dark-text leading-none"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {stat.value}
            </h2>

          </div>

          {/* DECOR */}
          <div className="
            absolute -bottom-8 -right-8
            w-28 h-28
            rounded-full
            bg-hover-soft
            opacity-50
          "></div>

        </div>
      ))}

    </div>

    {/* RECENT ORDERS */}
    <div className="
      bg-card
      border border-border-1
      rounded-[32px]
      shadow-sm
      overflow-hidden
    ">

      {/* HEADER */}
      <div className="
        px-8 py-6
        border-b border-border-1
        flex items-center justify-between
      ">

        <div>

          <p className="text-xs uppercase tracking-[4px] text-primary-gold-accent mb-2">
            Orders Overview
          </p>

          <h2
            className="text-3xl text-dark-text"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Recent Orders
          </h2>

        </div>

      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">

        <table className="w-full min-w-[700px]">

          <thead className="bg-bg-1">

            <tr className="text-left">

              <th className="
                px-8 py-5
                text-xs uppercase tracking-[3px]
                text-text-5 font-medium
              ">
                Order ID
              </th>

              <th className="
                px-8 py-5
                text-xs uppercase tracking-[3px]
                text-text-5 font-medium
              ">
                Customer
              </th>

              <th className="
                px-8 py-5
                text-xs uppercase tracking-[3px]
                text-text-5 font-medium
              ">
                Amount
              </th>

              <th className="
                px-8 py-5
                text-xs uppercase tracking-[3px]
                text-text-5 font-medium
              ">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {/* ROW */}
            <tr className="
              border-t border-border
              hover:bg-hover-soft
              transition-all
            ">

              <td className="px-8 py-6">

                <p className="text-dark-text font-medium">
                  #1001
                </p>

              </td>

              <td className="px-8 py-6">

                <div className="flex items-center gap-3">

                  <div className="
                    w-10 h-10
                    rounded-full
                    bg-bg-4
                    border border-border-3
                    flex items-center justify-center
                    text-text-3
                    text-sm
                    font-medium
                  ">
                    A
                  </div>

                  <div>

                    <p className="text-dark-text font-medium">
                      Ali Khan
                    </p>

                    <p className="text-xs text-text-light mt-1">
                      Premium Customer
                    </p>

                  </div>

                </div>

              </td>

              <td className="px-8 py-6 text-dark-text font-medium">
                $120
              </td>

              <td className="px-8 py-6">

                <span className="
                  px-4 py-2
                  rounded-full
                  bg-bg-4
                  border border-border-3
                  text-text-3
                  text-xs
                ">
                  Completed
                </span>

              </td>

            </tr>

            {/* ROW */}
            <tr className="
              border-t border-border
              hover:bg-hover-soft
              transition-all
            ">

              <td className="px-8 py-6">
                <p className="text-dark-text font-medium">
                  #1002
                </p>
              </td>

              <td className="px-8 py-6">

                <div className="flex items-center gap-3">

                  <div className="
                    w-10 h-10
                    rounded-full
                    bg-bg-4
                    border border-border-3
                    flex items-center justify-center
                    text-text-3
                    text-sm
                    font-medium
                  ">
                    S
                  </div>

                  <div>

                    <p className="text-dark-text font-medium">
                      Sara Ahmed
                    </p>

                    <p className="text-xs text-text-light mt-1">
                      Returning Customer
                    </p>

                  </div>

                </div>

              </td>

              <td className="px-8 py-6 text-dark-text font-medium">
                $80
              </td>

              <td className="px-8 py-6">

                <span className="
                  px-4 py-2
                  rounded-full
                  bg-hover-soft
                  border border-border
                  text-secondary-text
                  text-xs
                ">
                  Pending
                </span>

              </td>

            </tr>

            {/* ROW */}
            <tr className="
              border-t border-border
              hover:bg-hover-soft
              transition-all
            ">

              <td className="px-8 py-6">
                <p className="text-dark-text font-medium">
                  #1003
                </p>
              </td>

              <td className="px-8 py-6">

                <div className="flex items-center gap-3">

                  <div className="
                    w-10 h-10
                    rounded-full
                    bg-bg-4
                    border border-border-3
                    flex items-center justify-center
                    text-text-3
                    text-sm
                    font-medium
                  ">
                    U
                  </div>

                  <div>

                    <p className="text-dark-text font-medium">
                      Usman Tariq
                    </p>

                    <p className="text-xs text-text-light mt-1">
                      Guest Customer
                    </p>

                  </div>

                </div>

              </td>

              <td className="px-8 py-6 text-dark-text font-medium">
                $200
              </td>

              <td className="px-8 py-6">

                <span className="
                  px-4 py-2
                  rounded-full
                  border
                  text-discount
                  border-red-100
                  text-xs
                ">
                  Cancelled
                </span>

              </td>

            </tr>

          </tbody>

        </table>

      </div>

    </div>

  </div>
);
}

export default AdminDashboard;