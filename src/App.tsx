import "./App.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import Navbar from "./component/Navbar/navbar";
import Footer from "./component/Footer";
import FloatingWhatsAppButton from "./component/FloatingWsBtn";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import ShippingPolicy from "./pages/ShippingPolicy";
import ProductsPage from "./pages/ProductsPage";
import AboutUsPage from "./pages/AboutUsPage";
import { StoreProvider } from "./context/providers/StoreProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./context/providers/AuthProvider";
import AddProduct from "./pages/AddProduct";
import { CartProvider } from "./context/providers/CartProvider";
import CheckoutPage from "./pages/Checkout";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import OrderDetails from "./pages/OrderPage";

function AppContent() {
  const location = useLocation(); // الحصول على المسار الحالي

  // الصفحات التي نريد إخفاء الـ Navbar والـ Footer فيها
  const hideNavbarAndFooterPaths = [
    "/dashboard",
    "/add-product",
    "/login",
    "/signup",
  ];

  // التحقق مما إذا كان المسار الحالي يتطلب إخفاء الـ Navbar والـ Footer
  const shouldHideNavbarAndFooter = hideNavbarAndFooterPaths.includes(
    location.pathname
  );

  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 0,
      easing: "ease-in-out",
      once: true,
      mirror: true,
    });
    setTimeout(() => {
      AOS.refresh();
    }, 1000);
  }, []);

  return (
    <>
      {/* عرض الـ Navbar فقط إذا لم يكن المسار الحالي في القائمة */}
      {!shouldHideNavbarAndFooter && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/confirm-order/:orderId" element={<OrderConfirmationPage />} />
        <Route path="/orders/:orderId" element={<OrderDetails />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/shipping-policy" element={<ShippingPolicy />} />
        <Route path="/about-us" element={<AboutUsPage />} />
      </Routes>

      {/* عرض الـ Footer فقط إذا لم يكن المسار الحالي في القائمة */}
      {!shouldHideNavbarAndFooter && <Footer />}
      {!shouldHideNavbarAndFooter && <FloatingWhatsAppButton />}

      <ToastContainer />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <StoreProvider>
        <CartProvider>
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </CartProvider>
      </StoreProvider>
    </AuthProvider>
  );
}

export default App;
