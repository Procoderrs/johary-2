import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { RiEyeLine, RiEyeOffLine } from "@remixicon/react";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Account() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, login, register, logout } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const [showRegPassword, setShowRegPassword] = useState(false);

  // Login states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Register states
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const loggedUser = await login(email, password);
      if (!loggedUser) return;

      const redirect = searchParams.get("redirect");

      if (loggedUser.role === "admin") {
        navigate("/admin");
      } else if (redirect) {
        navigate(`/${redirect}`);
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!regName || !regEmail || !regPassword) {
      alert("Please fill all fields");
      return;
    }
    try {
      await register(regName, regEmail, regPassword);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Register failed");
    }
  };

  return (
    <div className="font-user">

      {/* BREADCRUMB */}
      <div className="relative w-full min-h-[160px]">
        <img src="/breadcumb-bkg.jpg" className="absolute inset-0 w-full h-full object-cover" alt="" />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-sm text-gray-600">Home / Account</p>
          <h1 className="text-[28px] uppercase font-semibold">Account</h1>
        </div>
      </div>

      {/* MAIN */}
      <div className="max-w-[1440px] mx-auto px-4 py-16 mb-20 border-b border-[#f1efea]">
        <div className="flex flex-col md:flex-row gap-10">

          {/* LOGIN / MY ACCOUNT */}
          <div className="w-full md:w-1/2">
            {!user ? (
              <div className="space-y-6">
                <h2 className="text-3xl font-semibold">Login</h2>

                <div className="border border-[#f1efea] rounded-lg p-6 space-y-4 bg-white">

                  <div>
                    <label className="text-sm text-[#666] mb-2 block">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter email"
                      className="w-full border border-[#f1efea] rounded-md p-3 outline-none text-sm focus:border-[#c19417]"
                    />
                  </div>

                  <div className="relative">
                    <label className="text-sm text-[#666] mb-2 block">Password</label>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      className="w-full border border-[#f1efea] rounded-md p-3 pr-10 outline-none text-sm focus:border-[#c19417]"
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-9 cursor-pointer text-gray-500"
                    >
                      {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
                    </span>
                  </div>

                  <button
                    onClick={handleLogin}
                    className="w-full bg-[#c19417] text-white py-3 rounded-md font-medium hover:bg-black transition"
                  >
                    Login
                  </button>

                  <label className="flex items-center gap-2 text-sm text-gray-600">
                    <input type="checkbox" />
                    Remember me
                  </label>
                </div>
              </div>
            ) : (
              <div className="bg-white p-6 rounded-lg border border-[#f1efea] space-y-4 shadow-sm">
                <h2 className="text-2xl font-semibold mb-2">My Account</h2>

                <div className="space-y-2 text-sm text-gray-700">
                  <p><span className="font-medium text-gray-500">Name:</span> {user.name}</p>
                  <p><span className="font-medium text-gray-500">Email:</span> {user.email}</p>
                  <p><span className="font-medium text-gray-500">Role:</span> {user.role}</p>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => navigate("/my-orders")}
                    className="bg-[#c19417] text-white px-5 py-2.5 text-sm rounded-md hover:bg-black transition"
                  >
                    My Orders
                  </button>
                  <button
                    onClick={() => { logout(); navigate("/dashboard"); }}
                    className="bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 text-sm rounded-md transition"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* REGISTER */}
          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="text-3xl font-semibold">Register</h2>

            <div className="border border-[#f1efea] p-6 rounded-lg bg-white space-y-4">

              <div>
                <label className="text-sm text-[#666] mb-2 block">
                  Username <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="Enter username"
                  className="w-full border border-[#f1efea] rounded-md p-3 outline-none text-sm focus:border-[#c19417]"
                />
              </div>

              <div>
                <label className="text-sm text-[#666] mb-2 block">
                  Email address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="Enter email"
                  className="w-full border border-[#f1efea] rounded-md p-3 outline-none text-sm focus:border-[#c19417]"
                />
              </div>

              <div className="relative">
                <label className="text-sm text-[#666] mb-2 block">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type={showRegPassword ? "text" : "password"}
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full border border-[#f1efea] rounded-md p-3 pr-10 outline-none text-sm focus:border-[#c19417]"
                />
                <span
                  onClick={() => setShowRegPassword(!showRegPassword)}
                  className="absolute right-3 top-9 cursor-pointer text-gray-500"
                >
                  {showRegPassword ? <RiEyeOffLine /> : <RiEyeLine />}
                </span>
              </div>

              <p className="text-[15px] text-[#666] leading-relaxed">
                Your personal data will be used to support your experience throughout this website.{" "}
                <span className="text-[#c19417] cursor-pointer">Privacy policy</span>.
              </p>

              <button
                onClick={handleRegister}
                className="bg-[#c19417] text-white font-medium px-6 py-3 uppercase text-sm hover:bg-black transition-all duration-300"
              >
                Register
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}