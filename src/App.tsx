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
import AdminDashboard from "./pages/Dashboard";
import { AuthProvider } from "./context/providers/AuthProvider";
import AddProduct from "./pages/AddProduct";
import { CartProvider } from "./context/providers/CartProvider";
import CheckoutPage from "./pages/Checkout";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import OrderDetails from "./pages/OrderPage";
import { ReviewProvider } from "./context/providers/ReviewProvider";

function AppContent() {
  const location = useLocation();

  const hideNavbarAndFooterPaths = [
    "/dashboard",
    "/dashboard/*",
    "/add-product",
    "/login",
    "/signup",
  ];

  const shouldHideNavbarAndFooter = hideNavbarAndFooterPaths.some((path) =>
    location.pathname.startsWith(path.replace("*", ""))
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
      {!shouldHideNavbarAndFooter && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/dashboard/*" element={<AdminDashboard />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route
          path="/confirm-order/:orderId"
          element={<OrderConfirmationPage />}
        />
        <Route path="/orders/:orderId" element={<OrderDetails />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/shipping-policy" element={<ShippingPolicy />} />
        <Route path="/about-us" element={<AboutUsPage />} />
      </Routes>

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
        <ReviewProvider>
          <CartProvider>
            <BrowserRouter>
              <AppContent />
            </BrowserRouter>
          </CartProvider>
        </ReviewProvider>
      </StoreProvider>
    </AuthProvider>
  );
}

export default App;
