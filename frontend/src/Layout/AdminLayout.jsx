import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

export function AdminLayout() {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/dashboard");
  };

  const menuItems = [
    { name: "Dashboard", path: "/admin" },
    { name: "Orders", path: "/admin/orders" },
    { name: "Users", path: "/admin/users" },
    { name: "Categories", path: "/admin/categories" },
    { name: "Products", path: "/admin/products" },
    { name: "Filter", path: "/admin/filter" },
  ];

  return (
    <div className="flex min-h-screen bg-bg">

      {/* SIDEBAR */}
      <aside className="w-[280px] bg-card border-r border-border-1 flex flex-col sticky top-0 h-screen">

        {/* LOGO */}
        <div className="px-8 py-4.5 border-b border-border-1">

          <p className="text-xs uppercase tracking-[4px] text-primary-gold-accent mb-2 font-medium">
            Jewelry Admin
          </p>

          <h1
            className="text-4xl text-dark-text leading-none"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Dashboard
          </h1>

        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 px-5 py-8 space-y-3 overflow-y-auto scrollbar-hide">

          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/admin"}
              className={({ isActive }) =>
                `
                  flex items-center px-5 py-3 rounded-2xl text-sm transition-all duration-300 border
                  ${
                    isActive
                      ? "bg-hover-soft border-border-3 text-text-3 shadow-sm"
                      : "border-transparent text-secondary-text hover:bg-bg-1 hover:text-dark-text"
                  }
                `
              }
            >
              <span className="font-medium tracking-wide">
                {item.name}
              </span>
            </NavLink>
          ))}

        </nav>

        {/* USER */}
        <div className="p-5 border-t border-border-1 bg-bg-1">

          <div className="bg-card border border-border rounded-3xl p-5">

            <div className="mb-4">

              <p className="text-xs uppercase tracking-[3px] text-text-5 mb-2">
                Logged In As
              </p>

              <h3
                className="text-2xl text-dark-text"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {user?.name || "Admin"}
              </h3>

            </div>

            <button
              onClick={handleLogout}
              className="
                w-full py-3 rounded-full
                bg-primary-gold-accent
                hover:bg-hover-bg
                text-white
                transition-all duration-300
                text-sm tracking-wide
              "
            >
              Logout
            </button>

          </div>

        </div>

      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 bg-bg">

        {/* TOPBAR */}
        <div className="sticky top-0 z-20 bg-bg/80 backdrop-blur-md border-b border-border-1 px-8 py-5">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-xs uppercase tracking-[4px] text-primary-gold-accent mb-1">
                Luxury Jewelry
              </p>

              <h2
                className="text-3xl text-dark-text"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Admin Panel
              </h2>
            </div>

            <div className="hidden md:flex items-center gap-3">

              <div className="w-11 h-11 rounded-full bg-hover-soft border border-border-3 flex items-center justify-center text-text-3 font-semibold">
                {user?.name?.charAt(0) || "A"}
              </div>

              <div>
                <p className="text-sm text-dark-text font-medium">
                  {user?.name}
                </p>

                <p className="text-xs text-text-light">
                  Administrator
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* PAGE CONTENT */}
        <div className="p-8">
          <Outlet />
        </div>

      </main>

    </div>
  );
}