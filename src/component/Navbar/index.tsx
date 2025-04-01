import { useState, useCallback, memo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { IoMenuOutline } from "react-icons/io5";
import logo from "../../assets/logo.png";
import MobileMenu from "../MobileMenu";
import TopBar from "./components/TopBar";
import SearchBar from "./components/SearchBar";
import UserActions from "./components/UserActions";
import CartSidebar from "./components/CartSidebar";
import "./style.css";

const Navbar = memo(() => {
  const [cartOpen, setCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [wishlistCount] = useState(5); // Will be connected to context later

  // Memoize the search handler
  const handleSearch = useCallback((query: string) => {
    console.log("Searching for:", query);
  }, []);

  // Memoize the cart toggle handler
  const toggleCart = useCallback(() => {
    setCartOpen(prev => !prev);
  }, []);

  // Memoize the mobile menu toggle handlers
  const openMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(true);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  // Predefined navigation links for better maintainability
  const navLinks = [
    { path: "/", label: "الرئيسية" },
    { path: "/shop", label: "المتجر" },
    { path: "/vendors", label: "البائعين" },
    { path: "/blog", label: "المدونة" },
    { path: "/pages", label: "الصفحات" },
  ];

  return (
    <>
      <TopBar />

      {/* Main Navigation */}
      <motion.nav
        className="sticky top-0 z-40 bg-white shadow-lg"
        initial={false}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Mobile Menu Button */}
            <button
              onClick={openMobileMenu}
              className="p-2 hover:bg-purple-50 rounded-full transition-colors md:hidden focus:outline-none focus:ring-2 focus:ring-purple-500"
              aria-label="فتح القائمة"
            >
              <IoMenuOutline className="w-8 h-8 text-gray-600" />
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center" aria-label="الصفحة الرئيسية">
              <img 
                src={logo} 
                alt="Sukoon" 
                className="h-8 scale-200" 
                width={32}
                height={32}
                loading="lazy"
              />
            </Link>

            {/* Main Menu - Desktop */}
            <nav className="hidden md:flex items-center gap-6" aria-label="القائمة الرئيسية">
              {navLinks.map((link) => (
                <Link 
                  key={link.path}
                  to={link.path} 
                  className="nav-link hover:text-purple-700 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Search and User Actions */}
            <div className="flex items-center gap-4">
              <SearchBar onSearch={handleSearch} />
              <UserActions
                onCartClick={toggleCart}
                wishlistCount={wishlistCount}
              />
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
      />

      {/* Cart Sidebar */}
      <AnimatePresence>
        {cartOpen && (
          <CartSidebar onClose={toggleCart} />
        )}
      </AnimatePresence>
    </>
  );
});

Navbar.displayName = "Navbar";
export default Navbar;