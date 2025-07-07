import { useState, useCallback, memo, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { IoMenuOutline } from "react-icons/io5";
import logo from "../../assets/logo.png";
import { useStoreContext } from "../../context/hooks/useStoreContext";

// Lazy-loaded components
const TopBar = lazy(() => import("./components/TopBar"));
const SearchBar = lazy(() => import("./components/SearchBar"));
const UserActions = lazy(() => import("./components/UserActions"));
const CartSidebar = lazy(() => import("./components/CartSidebar"));
const MobileMenu = lazy(() => import("./components/MobileMenu"));

const Navbar = memo(() => {
  const [cartOpen, setCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { wishlist } = useStoreContext();



  const toggleCart = useCallback(() => {
    setCartOpen((prev) => !prev);
  }, []);

  const openMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(true);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const navLinks = [
    { label: "الرئيسية", path: "/", icon: "" },
    { label: "منتجاتنا", path: "/products", icon: "" },
    { label: "المدونة", path: "/blog", icon: "" },
    { label: "اقوى العروض", path: "/deals", icon: "" },
    { label: "تتبع طلبك", path: "/track-order", icon: "" },
    { label: "من نحن", path: "/about-us", icon: "" },
  ];

  return (
    <>
      <Suspense fallback={<div className="h-8 bg-gray-100" />}>
        <TopBar />
      </Suspense>

      {/* Main Navigation */}
      <motion.nav
        className="sticky top-0 z-40 bg-white shadow-sm"
        initial={false}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto px-2 xs:px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Mobile Menu Button */}
            <button
              onClick={openMobileMenu}
              className="p-1 xs:p-2 hover:bg-purple-50 rounded-full transition-colors md:hidden focus:outline-none focus:ring-2 focus:ring-purple-500"
              aria-label="فتح القائمة"
            >
              <IoMenuOutline className="w-8 h-8 xs:w-8 xs:h-8 text-gray-600" />
            </button>

            {/* Logo */}
            <Link
              to="/"
              className="flex items-center"
              aria-label="الصفحة الرئيسية"
            >
              <img
                src={logo}
                alt="Sukoon"
                className="h-14 xs:h-14"
                loading="lazy"
              />
            </Link>

            {/* Main Menu - Desktop */}
            <nav
              className="hidden md:flex items-center gap-4 lg:gap-6"
              aria-label="القائمة الرئيسية"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm text-nowrap nav-link hover:text-purple-700 transition-colors px-2 py-1 rounded-md hover:bg-purple-50"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Search and User Actions */}
            <div className="flex items-center gap-2 xs:gap-3 sm:gap-4">
              <div className="hidden xs:block">
                <Suspense fallback={<div className="w-32 h-8 bg-gray-100 rounded" />}>
                  <SearchBar />
                </Suspense>
              </div>
              <Suspense fallback={<div className="w-24 h-8 bg-gray-100 rounded" />}>
                <UserActions
                  onCartClick={toggleCart}
                  wishlistCount={wishlist.length}
                />
              </Suspense>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <Suspense fallback={null}>
        <MobileMenu isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
      </Suspense>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {cartOpen && (
          <Suspense fallback={null}>
            <CartSidebar onClose={toggleCart} />
          </Suspense>
        )}
      </AnimatePresence>
    </>
  );
});

Navbar.displayName = "Navbar";
export default Navbar;