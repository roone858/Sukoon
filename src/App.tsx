import "./App.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import FloatingWhatsAppButton from "./component/FloatingWsBtn";

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
import CartPage from "./pages/CartPage";
import WishListPage from "./pages/WishListPage";
import NotFoundPage from "./pages/NotFoundPage";
import { useAuthContext } from "./context/hooks/useAuthContext";
import LoadingPage from "./pages/LoadingPage";
import ScrollToTop from "./component/ScrollToTop";
import AuthCallback from "./component/AuthCallback";
import ProfilePage from "./components/ProfilePage";
import HotDealsPage from "./pages/HotDealsPage";
import MegaProductsPage from "./pages/MegaProductsPage";
import SitemapPage from "./pages/SitemapPage";
import BlogPage from "./pages/BlogPage";
import OrderTrackingPage from "./pages/OrderTrackingPage";

function AppContent() {
  const location = useLocation();
  const { isLoading } = useAuthContext();

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

  
  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <>
      {!shouldHideNavbarAndFooter && <Navbar />}

      <Routes>
     
        <Route path="/" element={<Home />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/dashboard/*" element={<AdminDashboard />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/profile/*" element={<ProfilePage />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/deals" element={<HotDealsPage />} />
        <Route
          path="/confirm-order/:orderId"
          element={<OrderConfirmationPage />}
        />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishListPage />} />
        <Route path="/mega-menu" element={<MegaProductsPage/>} />
        <Route path="/orders/:orderId" element={<OrderDetails />} />
        <Route path="/pages" element={<SitemapPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/track-order" element={<OrderTrackingPage />} />
    
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/shipping-policy" element={<ShippingPolicy />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {!shouldHideNavbarAndFooter && <Footer />}
      {!shouldHideNavbarAndFooter && <FloatingWhatsAppButton />}

      <ToastContainer position="bottom-center"  limit={1} autoClose={2000} />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <StoreProvider>
        <CartProvider>
          <BrowserRouter>
          <ScrollToTop />
            <AppContent />
          </BrowserRouter>
        </CartProvider>
      </StoreProvider>
    </AuthProvider>
  );
}

export default App;
