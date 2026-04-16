import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import ProductPage from "./pages/ProductPage";
import ShopPage from "./pages/ShopPage";
import BlogPage from "./pages/Blog";
import CustomerLayout from "./Layout/CustomerLayout";
import Accordion from "./pages/Accordion";
import Icon from "./pages/Icon";
import Portfolio from "./pages/Portfolio";
import Faqs from "./pages/Faqs";
import Gallery from "./pages/Gallery";
import Tabs from "./pages/Tabs";
import BlogPagee from "./pages/BlogPagee";
import Contact from "./pages/Contact";
import About from "./pages/About";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route */}
        <Route path="/" element={<Navigate to="/dashboard" />} />

        {/* Public routes */}
        {/* <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} /> */}

        {/* User dashboard */}
        <Route element={<CustomerLayout />}>
        <Route path="/dashboard" element={<UserDashboard />} />
 <Route path="/product/:slug" element={<ProductPage />} />
 <Route path="/shop" element={<ShopPage />} />
 <Route path="/shop/:categorySlug" element={<ShopPage />} />
 <Route path="/blog/:slug" element={<BlogPage />} />
<Route path="/accordion" element={<Accordion />} />
<Route path="/icon-box" element={<Icon />} />
<Route path="/portfolio" element={<Portfolio />} />
<Route path="/faqs" element={<Faqs />} />
<Route path="/gallery" element={<Gallery />} />
<Route path="/tabs" element={<Tabs />} />
<Route path="/Blog" element={<BlogPagee />} />
<Route path="/about-us" element={<Contact />} />
<Route path="/Contact-us" element={<About />} />











 </Route>
        {/* Admin dashboard */}
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;









/* import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />

         
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />

          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

         
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          />

          
          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App; */



