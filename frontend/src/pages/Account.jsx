import { useLocation } from "react-router-dom";
import { RiEyeLine, RiEyeOffLine } from "@remixicon/react";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
export default function Account() {
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
const navigate = useNavigate();
  const getTitle = () => {
    const path = location.pathname;
    if (path.includes("account")) return "Account";
    return "Page";
  };
const { user, login, register, logout } = useContext(AuthContext);
console.log(user,login,register,logout);

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [name, setName] = useState("");
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const loggedUser = await login(email, password);

    if (!loggedUser) return;

    if (loggedUser.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }

  } catch (err) {
    alert(err.response?.data?.message || "Login failed");
  }
};


  return (
    <div className="font-body">

      {/* ================= BREADCRUMB ================= */}
      <div className="relative w-full min-h-[160px]">
        <img
          src="/breadcumb-bkg.jpg"
          className="absolute inset-0 w-full h-full object-cover"
          alt=""
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-sm text-gray-600">
            Home / {getTitle()}
          </p>
          <h1 className="text-[28px] uppercase font-semibold">
            {getTitle()}
          </h1>
        </div>
      </div>

      {/* ================= MAIN ================= */}
      <div className="max-w-[1440px] mx-auto px-4 py-16 mb-20 border-b border-[#f1efea]">

        <div className="flex flex-col md:flex-row gap-10">

          {/* ================= LOGIN ================= */}
    {/* ================= LOGIN ================= */}
<div className="w-full md:w-1/2">
  {!user ? (
    <div className="space-y-6">
      
      <h2 className="text-3xl font-semibold">Login</h2>

      <div className="border border-[#f1efea] rounded-lg p-6 space-y-4 bg-white">

        {/* Email */}
        <div>
          <label className="text-sm text-[#666] mb-2 block">
            Email
          </label>

          <input
            type="text"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-[#f1efea] rounded-md p-3 outline-none text-sm focus:border-[#c19417]"
          />
        </div>

        {/* Password */}
        <div className="relative">
          <label className="text-sm text-[#666] mb-2 block">
            Password
          </label>

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-[#f1efea] rounded-md p-3 pr-10 outline-none text-sm focus:border-[#c19417]"
          />

          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 cursor-pointer text-gray-500"
          >
            {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
          </span>
        </div>

        {/* Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-[#c19417] text-white py-3 rounded-md font-medium hover:bg-black transition"
        >
          Login
        </button>

        {/* Remember */}
        <label className="flex items-center gap-2 text-sm text-gray-600">
          <input type="checkbox" />
          Remember me
        </label>
      </div>
    </div>
  ) : (
    <div className="bg-white p-6 rounded-lg border space-y-3 shadow-sm">
      <h2 className="text-xl font-semibold mb-2">My Account</h2>

      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>

     <button
  onClick={() => {
    logout();
    navigate("/dashboard");
  }}
  className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
>
  Logout
</button>
    </div>
  )}
</div>
          {/* ================= REGISTER ================= */}
          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="text-3xl font-semibold">Register</h2>
<div className="border border-[#f1efea] p-6 rounded-lg">

            {/* Username */}
            <div>
              <label className="text-[15px] text-[#666] mb-3 block">
                Username <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full border border-[#f1efea] rounded-md p-3 mb-4 bg-white outline-none text-sm"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-[#666] mb-3 block">
                Email address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                className="w-full border border-[#f1efea] rounded-md p-3 mb-4 bg-white outline-none text-sm"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-[#666] mb-3 block">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                className="w-full border border-[#f1efea] rounded-md p-3 mb-4 bg-white outline-none text-sm"
              />
            </div>

            {/* TEXT */}
            <p className="text-[15px] mb-4 text-[#666] leading-relaxed">
              Your personal data will be used to support your experience
              throughout this website, to manage access to your account, and
              for other purposes described in our{" "}
              <span className="text-[#c19417] cursor-pointer">
                privacy policy
              </span>.
            </p>

            {/* BUTTON */}
            <button className="bg-[#c19417] text-white font-medium px-6 py-3 uppercase text-sm hover:bg-black transition-all duration-300">
              Register
            </button>
          </div>
</div>

        </div>
      </div>
    </div>
  );
}