import "./App.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthContext } from "./context/hooks/useAuthContext";
import { AuthProvider } from "./context/providers/AuthProvider";
import { StoreProvider } from "./context/providers/StoreProvider";
import { CartProvider } from "./context/providers/CartProvider";
import { lazy, Suspense, memo } from "react";

// Layout Components
const Navbar = lazy(() => import("./component/Navbar"));
const Footer = lazy(() => import("./component/Footer"));
const FloatingWhatsAppButton = lazy(() => import("./component/FloatingWsBtn"));
const ScrollToTop = lazy(() => import("./component/ScrollToTop"));
const LoadingPage = lazy(() => import("./pages/LoadingPage"));
const AuthCallback = lazy(() => import("./component/AuthCallback"));

// Pages
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

// Constants
const HIDE_NAV_FOOTER_PATHS = [
  "/dashboard",
  "/dashboard/*",
  "/add-product",
  "/login",
  "/signup",
];

const MemoizedNavbar = memo(Navbar);
const MemoizedFooter = memo(Footer);
const MemoizedFloatingWhatsAppButton = memo(FloatingWhatsAppButton);

function AppContent() {
  const location = useLocation();
  const { isLoading } = useAuthContext();

  const shouldHideNavbarAndFooter = HIDE_NAV_FOOTER_PATHS.some((path) =>
    location.pathname.startsWith(path.replace("*", ""))
  );

  if (isLoading) {
    return (
        <LoadingPage />
    );
  }

  return (
    <>
      {!shouldHideNavbarAndFooter && (
        <Suspense fallback={null}>
          <MemoizedNavbar />
        </Suspense>
      )}

      <Suspense fallback={<LoadingPage />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SignUpPage />} />
          
          {/* Product Routes */}
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/deals" element={<HotDealsPage />} />
          <Route path="/mega-menu" element={<MegaProductsPage />} />
          
          {/* Cart & Checkout Routes */}
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/confirm-order/:orderId" element={<OrderConfirmationPage />} />
          <Route path="/orders/:orderId" element={<OrderDetails />} />
          <Route path="/track-order" element={<OrderTrackingPage />} />
          <Route path="/wishlist" element={<WishListPage />} />
          
          {/* Information Pages */}
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/pages" element={<SitemapPage />} />
          <Route path="/shipping-policy" element={<ShippingPolicy />} />
          <Route path="/return-policy" element={<ReturnPolicyPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-conditions" element={<TermsAndConditionsPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contact" element={<ContactPage />} />
          
          {/* User Routes */}
          <Route path="/profile/*" element={<ProfilePage />} />
          
          {/* Admin Routes */}
          <Route path="/dashboard/*" element={<AdminDashboard />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/dashboard/categories/add" element={<AddCategoryForm />} />
          <Route path="/dashboard/categories/edit/:id" element={<EditCategoryForm />} />
          
          {/* 404 Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>

      {!shouldHideNavbarAndFooter && (
        <>
          <Suspense fallback={null}>
            <MemoizedFooter />
            <MemoizedFloatingWhatsAppButton />
          </Suspense>
        </>
      )}

      <ToastContainer position="bottom-center" limit={1} autoClose={2000} />
    </>
  );
}

const App = memo(function App() {
  return (
    <AuthProvider>
      <StoreProvider>
        <CartProvider>
          <BrowserRouter>
            <Suspense fallback={null}>
              <ScrollToTop />
            </Suspense>
            <AppContent />
          </BrowserRouter>
        </CartProvider>
      </StoreProvider>
    </AuthProvider>
  );
});

export default App;