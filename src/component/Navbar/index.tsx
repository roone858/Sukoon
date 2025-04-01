import { useState } from "react";
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

const Navbar = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [wishlistCount] = useState(5); // سيتم ربطها بالسياق لاحقاً

  const handleSearch = (query: string) => {
    // Handle search functionality
    console.log("Searching for:", query);
  };

  return (
    <>
      <TopBar />

      {/* Main Navigation */}
      <motion.nav
        className={`sticky top-0 z-40 bg-white transition-shadow duration-300 shadow-lg`}
        initial={false}
        animate={{ y: 0 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 hover:bg-purple-50 rounded-full transition-colors md:hidden focus:outline-none focus:ring-2 focus:ring-purple-500"
              aria-label="فتح القائمة"
            >
              <IoMenuOutline className="w-8 h-8 text-gray-600" />
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Sukoon" className="h-8 scale-200" />
            </Link>

            {/* Main Menu - Desktop */}
            <div className="hidden md:flex items-center gap-6">
              <Link to="/" className="nav-link">
                الرئيسية
              </Link>
              <Link to="/shop" className="nav-link">
                المتجر
              </Link>
              <Link to="/vendors" className="nav-link">
                البائعين
              </Link>
              <Link to="/blog" className="nav-link">
                المدونة
              </Link>
              <Link to="/pages" className="nav-link">
                الصفحات
              </Link>
            </div>

            {/* Search and User Actions */}
            <div className="flex items-center gap-4">
              <SearchBar onSearch={handleSearch} />
              <UserActions
                onCartClick={() => setCartOpen(true)}
                wishlistCount={wishlistCount}
              />
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Cart Sidebar */}
      <AnimatePresence>
        {cartOpen && (
          <CartSidebar  onClose={() => setCartOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
