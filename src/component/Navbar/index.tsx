import { useState, useCallback, memo, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { IoMenuOutline } from "react-icons/io5";
import logo from "../../assets/logo.png";
import TopBar from "./components/TopBar";
import SearchBar from "./components/SearchBar";
import UserActions from "./components/UserActions";
import CartSidebar from "./components/CartSidebar";
import { useStoreContext } from "../../context/hooks/useStoreContext";
import MobileMenu from "./components/MobileMenu";
import { debounce, throttle } from "../../utils/performance";

const Navbar = memo(() => {
  const [cartOpen, setCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const { wishlist } = useStoreContext();
  const lastScrollY = useRef(0);
  const shouldReduceMotion = useReducedMotion();

  // Throttled scroll handler for better performance
  const handleScroll = useCallback(
    throttle(() => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY <= lastScrollY.current || currentScrollY < 50);
      lastScrollY.current = currentScrollY;
    }, 150),
    []
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Debounced search handler
  const handleSearch = useCallback(
    debounce((query: string) => {
      console.log("Searching for:", query);
    }, 300),
    []
  );

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
    // { label: "القائمة الكبيرة", path: "/mega-menu", icon: "" },
    { label: "المدونة", path: "/blog", icon: "" },
    // { label: "الصفحات", path: "/pages", icon: "" },
    { label: "اقوى العروض", path: "/deals", icon: "" },
    { label: "تتبع طلبك", path: "/track-order", icon: "" },
    { label: "من نحن", path: "/about-us", icon: "" },
  ];

  const navVariants = {
    visible: { y: 0, transition: { duration: shouldReduceMotion ? 0 : 0.2 } },
    hidden: { y: -100, transition: { duration: shouldReduceMotion ? 0 : 0.2 } },
  };

  return (
    <>
      <TopBar />

      {/* Main Navigation */}
      <motion.nav
        className="sticky top-0 z-40 bg-white shadow-sm will-change-transform"
        initial={false}
        animate={isVisible ? "visible" : "hidden"}
        variants={navVariants}
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
                width="56"
                height="56"
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
                  className="text-sm lg:text-base nav-link hover:text-purple-700 transition-colors px-2 py-1 rounded-md hover:bg-purple-50"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Search and User Actions */}
            <div className="flex items-center gap-2 xs:gap-3 sm:gap-4">
              <div className="hidden xs:block">
                <SearchBar onSearch={handleSearch} />
              </div>
              <UserActions
                onCartClick={toggleCart}
                wishlistCount={wishlist.length}
              />
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />

      {/* Cart Sidebar */}
      <AnimatePresence mode="wait">
        {cartOpen && <CartSidebar onClose={toggleCart} />}
      </AnimatePresence>
    </>
  );
});

Navbar.displayName = "Navbar";
export default Navbar;
