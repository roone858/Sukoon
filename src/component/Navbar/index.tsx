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
import { useStoreContext } from "../../context/hooks/useStoreContext";

const Navbar = memo(() => {
  const [cartOpen, setCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { wishlist } = useStoreContext();

  const handleSearch = useCallback((query: string) => {
    console.log("Searching for:", query);
  }, []);

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
              <IoMenuOutline className="w-6 h-6 xs:w-8 xs:h-8 text-gray-600" />
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
                className="h-7 xs:h-9 scale-200"
              
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

          {/* Search Bar for extra small screens */}
          <div className="pb-2 px-2 xs:hidden">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />

      {/* Cart Sidebar */}
      <AnimatePresence>
        {cartOpen && <CartSidebar onClose={toggleCart} />}
      </AnimatePresence>
    </>
  );
});

Navbar.displayName = "Navbar";
export default Navbar;