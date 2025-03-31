import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartIcon, UserIcon } from ".";
import logo from "../../assets/logo.png";
import CartItem from "../CartItem";
import { useAuthContext } from "../../context/useContext/useAuthContext";
import AvatarWithDropdown from "../AvatarWithDropdown/Index";
import { useCartContext } from "../../context/useContext/useCartContext";
import { useStoreContext } from "../../context/useContext/useStoreContext";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const { isAuthenticated } = useAuthContext();
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [productsMenuOpen, setProductsMenuOpen] = useState(false);
  const { products } = useStoreContext();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);

  const { cart } = useCartContext();
  useEffect(() => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  useEffect(() => {
    setIsSearchOpen(false);
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      if (!menuOpen && !cartOpen) {
        if (window.scrollY > lastScrollY && window.scrollY > 700) {
          setShowNavbar(false);
        } else {
          setShowNavbar(true);
        }
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY, menuOpen, cartOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 group">
              <img
                src={logo}
                alt="Logo"
                className="h-16 sm:h-14 w-auto transform group-hover:scale-105 transition-transform duration-300"
              />
            </Link>

            {/* Desktop Menu */}
            <ul className="hidden md:flex items-center space-x-8 text-gray-700">
              <li>
                <Link
                  to="/"
                  className="text-sm font-medium hover:text-purple-600 transition-colors duration-200"
                >
                  الرئيسية
                </Link>
              </li>
              <li
                className="relative"
                onMouseEnter={() => setProductsMenuOpen(true)}
                onMouseLeave={() => setProductsMenuOpen(false)}
              >
                <button className="text-sm font-medium hover:text-purple-600 transition-colors duration-200 flex items-center">
                  المنتجات
                  <svg
                    className={`w-4 h-4 mr-1 transform transition-transform duration-200 ${
                      productsMenuOpen ? "rotate-180" : ""
                    }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {/* Mega Menu for Products */}
                {productsMenuOpen && (
                  <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 p-4 z-50">
                    <ul className="space-y-2">
                      {[
                        { text: "مراتب طبية", url: "/medical-mattresses" },
                        { text: "مراتب فاخرة", url: "/luxury-mattresses" },
                        { text: "أغطية وألحفة", url: "/covers-quilts" },
                        {
                          text: "مفروشات غرف النوم",
                          url: "/bedroom-furnishings",
                        },
                        { text: "عروض خاصة", url: "/special-offers" },
                      ].map((item) => (
                        <li key={item.url}>
                          <Link
                            to={item.url}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-md transition-colors duration-200"
                          >
                            {item.text}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
              <li>
                <Link
                  to="/about-us"
                  className="text-sm font-medium hover:text-purple-600 transition-colors duration-200"
                >
                  العروض
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm font-medium hover:text-purple-600 transition-colors duration-200"
                >
                  المدونة
                </Link>
              </li>
            </ul>

            {/* Icons */}
            <div className="flex items-center space-x-4">
              {/* Left Section - Search */}
              <div className="flex items-center">
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 lg:hidden"
                >
                  <FaSearch className="w-6 h-6" />
                </button>
                <div className="hidden lg:block relative">
                  <input
                    type="text"
                    placeholder="ابحث عن منتج..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              <button
                className="relative p-2 text-gray-700 hover:text-purple-600 transition-colors duration-200"
                onClick={() => setCartOpen(true)}
              >
                <CartIcon className="w-6 h-6" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                    {cart.length}
                  </span>
                )}
              </button>

              {isAuthenticated ? (
                <AvatarWithDropdown />
              ) : (
                <Link
                  to="/login"
                  className="p-2 text-gray-700 hover:text-purple-600 transition-colors duration-200"
                >
                  <UserIcon className="w-6 h-6" />
                </Link>
              )}

              <button
                onClick={() => setMenuOpen(true)}
                className="md:hidden p-2 text-gray-700 hover:text-purple-600 transition-colors duration-200"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

      </nav>
      {/* Spacer to prevent content from being hidden behind fixed navbar */}
      <div className="h-16 sm:h-20"></div>
      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            />

            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 20 }}
              className="fixed inset-y-0 right-0 w-full max-w-sm bg-white dark:bg-gray-800 shadow-xl z-50 lg:hidden"
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    القائمة
                  </h2>
                  <button
                    onClick={() => setMenuOpen(false)}
                    className="p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <FaTimes className="w-6 h-6" />
                  </button>
                </div>

                <ul className="space-y-2">
                  {[
                    { text: "الرئيسية", url: "/" },
                    { text: "المنتجات", url: "/products" },
                    { text: "معلومات عنا", url: "/about-us" },
                    { text: "اتصل بنا", url: "/contact" },
                  ].map((item) => (
                    <li key={item.url}>
                      <Link
                        to={item.url}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                      >
                        {item.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {cartOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            />

            {/* Cart Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 20 }}
              className="fixed inset-y-0 right-0 w-full max-w-sm bg-white dark:bg-gray-800 shadow-xl z-50 lg:hidden"
            >
              <div className="flex flex-col h-full">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      عربة التسوق
                    </h2>
                    <button
                      onClick={() => setCartOpen(false)}
                      className="p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                      <FaTimes className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                  {cart.length > 0 ? (
                    <ul className="space-y-4">
                      {cart.map((item, index) => (
                        <CartItem key={index} item={item} />
                      ))}
                    </ul>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
                      <div className="text-4xl mb-4">🛒</div>
                      <p className="text-lg">عربة التسوق فارغة</p>
                      <p className="text-sm mt-2">قم بإضافة بعض المنتجات</p>
                    </div>
                  )}
                </div>

                {cart.length > 0 && (
                  <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <Link
                      to="/checkout"
                      onClick={() => setCartOpen(false)}
                      className="block w-full text-center bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors duration-200 font-medium"
                    >
                      استكمال الطلب
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Search Sidebar */}
      <AnimatePresence>
        {isSearchOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSearchOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />

            {/* Search Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 20 }}
              className="fixed inset-y-0 right-0 w-full max-w-sm bg-white dark:bg-gray-800 shadow-xl z-50 lg:hidden"
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    البحث عن منتج
                  </h2>
                  <button
                    onClick={() => setIsSearchOpen(false)}
                    className="p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <FaTimes className="w-6 h-6" />
                  </button>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    placeholder="ابحث عن منتج..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>

                {/* Search Results */}
                <div className="mt-4 overflow-y-auto max-h-[calc(100vh-200px)]">
                  {filteredProducts.map((product) => (
                    <Link
                      key={product.id}
                      to={`/products/${product.id}`}
                      onClick={() => setIsSearchOpen(false)}
                      className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                    >
                      <img
                        src={product.images[0].url}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-md"
                      />
                      <div className="mr-3">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {product.price} جنيه
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
