import "./App.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Suspense, lazy } from 'react';
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import FloatingWhatsAppButton from "./component/FloatingWsBtn";
import { StoreProvider } from "./context/providers/StoreProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/providers/AuthProvider";
import { CartProvider } from "./context/providers/CartProvider";
import { useAuthContext } from "./context/hooks/useAuthContext";
import LoadingPage from "./pages/LoadingPage";
import ScrollToTop from "./component/ScrollToTop";
import { reportWebVitals } from './utils/performance';

// Lazy load all routes
const Home = lazy(() => import("./pages/Home"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const ShippingPolicy = lazy(() => import("./pages/ShippingPolicy"));
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const AboutUsPage = lazy(() => import("./pages/AboutUsPage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const AdminDashboard = lazy(() => import("./pages/Dashboard"));
const AddProduct = lazy(() => import("./pages/AddProduct"));
const CheckoutPage = lazy(() => import("./pages/Checkout"));
const OrderConfirmationPage = lazy(() => import("./pages/OrderConfirmationPage"));
const OrderDetails = lazy(() => import("./pages/OrderPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const WishListPage = lazy(() => import("./pages/WishListPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const AuthCallback = lazy(() => import("./component/AuthCallback"));
const ProfilePage = lazy(() => import("./components/ProfilePage"));
const HotDealsPage = lazy(() => import("./pages/HotDealsPage"));
const MegaProductsPage = lazy(() => import("./pages/MegaProductsPage"));
const SitemapPage = lazy(() => import("./pages/SitemapPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const OrderTrackingPage = lazy(() => import("./pages/OrderTrackingPage"));
const ReturnPolicyPage = lazy(() => import("./pages/ReturnPolicyPage"));
const PrivacyPolicyPage = lazy(() => import("./pages/PrivacyPolicyPage"));
const TermsAndConditionsPage = lazy(() => import("./pages/TermsAndConditionsPage"));
const FAQPage = lazy(() => import("./pages/FAQPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const AddCategoryForm = lazy(() => import("./components/AddCategoryForm"));
const EditCategoryForm = lazy(() => import("./components/EditCategoryForm"));

// Initialize performance monitoring
reportWebVitals();

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

      <Suspense fallback={<LoadingPage />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SignUpPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/dashboard/*" element={<AdminDashboard />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/add-category" element={<AddCategoryForm />} />
          <Route path="/profile/*" element={<ProfilePage />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/deals" element={<HotDealsPage />} />
          <Route
            path="/confirm-order/:orderId"
            element={<OrderConfirmationPage />}
          />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishListPage />} />
          <Route path="/mega-menu" element={<MegaProductsPage />} />
          <Route path="/orders/:orderId" element={<OrderDetails />} />
          <Route path="/pages" element={<SitemapPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/track-order" element={<OrderTrackingPage />} />
          <Route
            path="/dashboard/categories/edit/:id"
            element={<EditCategoryForm />}
          />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/shipping-policy" element={<ShippingPolicy />} />
          <Route path="/return-policy" element={<ReturnPolicyPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-conditions" element={<TermsAndConditionsPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>

      {!shouldHideNavbarAndFooter && <Footer />}
      {!shouldHideNavbarAndFooter && <FloatingWhatsAppButton />}

      <ToastContainer 
        position="bottom-center" 
        limit={1} 
        autoClose={2000}
        pauseOnFocusLoss={false}
      />
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
