import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  IoLocationOutline,
  IoCallOutline,
  IoSearchOutline,
} from "react-icons/io5";
import {
  FaDiscord,
  FaPinterest,
  FaInstagram,
  FaTwitter,
  FaFacebookF,
} from "react-icons/fa";
import { RiCloseLine } from "react-icons/ri";
import { useEffect, useState } from "react";

import logo from "../../../../assets/logo.png";
import { useStoreContext } from "../../../../context/hooks/useStoreContext";
import { useAuthContext } from "../../../../context/hooks/useAuthContext";
import { Product } from "../../../../util/types";
import ProductsList from "../../../../pages/MegaProductsPage/components/products/ProductsList";
import { apiUrl } from "../../../../util/urls";


interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}
const menuItems = [
  { title: "الرئيسية", path: "/", icon: "" },
  { title: "منتجاتنا", path: "/products", icon: "" },
  { title: "القائمة الكبيرة", path: "/mega-menu", icon: "" },
  { title: "المدونة", path: "/blog", icon: "" },
  { title: "الصفحات", path: "/pages", icon: "" },
  { title: "اقوى العروض", path: "/deals", icon: "" },
  { title: "من نحن", path: "/about-us", icon: "" },
];

const socialLinks = [
  {
    icon: <FaDiscord className="w-4 h-4 sm:w-5 sm:h-5" />,
    href: "#",
    label: "Discord",
  },
  {
    icon: <FaPinterest className="w-4 h-4 sm:w-5 sm:h-5" />,
    href: "#",
    label: "Pinterest",
  },
  {
    icon: <FaInstagram className="w-4 h-4 sm:w-5 sm:h-5" />,
    href: "#",
    label: "Instagram",
  },
  {
    icon: <FaTwitter className="w-4 h-4 sm:w-5 sm:h-5" />,
    href: "#",
    label: "Twitter",
  },
  {
    icon: <FaFacebookF className="w-4 h-4 sm:w-5 sm:h-5" />,
    href: "#",
    label: "Facebook",
  },
];
export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [activeItem, setActiveItem] = useState<string>("/");
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const { products } = useStoreContext();
  const { isAuthenticated, user } = useAuthContext();

  const handleSearchBar = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleMenuClick = (path: string) => {
    setActiveItem(path);
    onClose();
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      const query = searchQuery.trim().toLowerCase();

      if (query) {
        const result = products.filter(
          (product) =>
            product.name.toLowerCase().includes(query) ||
            (product.description &&
              product.description.toLowerCase().includes(query))
        );
        setFilteredProducts(result);
      } else {
        // لو مفيش بحث، امسح النتائج
        setFilteredProducts([]);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [products, searchQuery]);
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
          />

          {/* Mobile Menu Panel */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 left-0 w-full max-w-xs sm:max-w-sm h-full bg-white z-50 overflow-y-auto shadow-xl"
            dir="rtl"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <motion.div
                className="flex justify-between items-center p-3 sm:p-4 border-b border-gray-100"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <button
                  onClick={onClose}
                  className="p-1 sm:p-2 hover:bg-gray-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
                  aria-label="إغلاق القائمة"
                >
                  <RiCloseLine className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                </button>
                <img
                  src={logo}
                  alt="Nest"
                  className="h-7 sm:h-8 scale-150"
                  loading="lazy"
                />
              </motion.div>

              {/* Search Bar */}
              <motion.div
                className="p-3 sm:p-4"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="relative">
                  <input
                    type="text"
                    placeholder="ابحث عن المنتجات..."
                    className={`w-full bg-gray-100 rounded-lg py-2 sm:py-3 pr-3 sm:pr-4 pl-10 sm:pl-12 text-sm sm:text-base transition-all duration-300 ${
                      searchFocused ? "ring-2 ring-purple-500 bg-white" : ""
                    }`}
                    onChange={handleSearchBar}
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                  />
                  <IoSearchOutline className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </motion.div>

              {searchQuery.trim() ? (
                <ProductsList products={filteredProducts} />
              ) : (
                <nav className="flex-1 overflow-y-auto">
                  <motion.ul
                    className="space-y-0.5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    {menuItems.map((item, index) => (
                      <motion.li
                        key={item.path}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                      >
                        <Link
                          to={item.path}
                          className={`flex items-center px-3 sm:px-4 py-2 sm:py-3 transition-colors gap-2 sm:gap-3 text-sm sm:text-base ${
                            activeItem === item.path
                              ? "bg-purple-50 text-purple-600 font-medium"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                          onClick={() => handleMenuClick(item.path)}
                        >
                          <span className="text-base sm:text-lg">
                            {item.icon}
                          </span>
                          <span>{item.title}</span>
                        </Link>
                      </motion.li>
                    ))}
                  </motion.ul>
                </nav>
              )}

              {/* Contact Info */}
              <motion.div
                className="p-3 sm:p-4 border-t border-gray-100 space-y-2 sm:space-y-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <motion.div
                  className="flex items-center gap-2 sm:gap-3 text-gray-600 hover:text-purple-600 transition-colors p-1 sm:p-2 rounded-lg hover:bg-purple-50 cursor-pointer text-sm sm:text-base"
                  whileHover={{ x: 5 }}
                >
                  <IoLocationOutline className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                  <span>موقعنا</span>
                </motion.div>

                <motion.div
                  className="flex items-center gap-2 sm:gap-3 text-gray-600 hover:text-purple-600 transition-colors p-1 sm:p-2 rounded-lg hover:bg-purple-50 cursor-pointer text-sm sm:text-base"
                  whileHover={{ x: 5 }}
                >
                  {isAuthenticated ? (
                    <Link
                      to="/profile"
                      className="relative flex items-center gap-2 sm:gap-3 w-full"
                    >
                      <img
                        className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white shadow-sm"
                        src={
                          apiUrl +
                          "/users/profile-picture/default-profile-picture.webp"
                        }
                        alt="User profile"
                        width={32}
                        height={32}
                        loading="lazy"
                      />
                      <span>{user?.name}</span>
                    </Link>
                  ) : (
                    <span>تسجيل الدخول / إنشاء حساب</span>
                  )}
                </motion.div>

                <motion.div
                  className="flex items-center gap-2 sm:gap-3 text-gray-600 hover:text-purple-600 transition-colors p-1 sm:p-2 rounded-lg hover:bg-purple-50 cursor-pointer text-sm sm:text-base"
                  whileHover={{ x: 5 }}
                >
                  <IoCallOutline className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                  <span dir="ltr">+01-2345-6789</span>
                </motion.div>
              </motion.div>

              {/* Social Links */}
              <motion.div
                className="p-3 sm:p-4 border-t border-gray-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <div className="flex justify-center gap-3 sm:gap-4">
                  {socialLinks.map((link, index) => (
                    <motion.a
                      key={index}
                      href={link.href}
                      className="text-gray-500 hover:text-purple-600 transition-colors p-1 sm:p-2 hover:bg-purple-50 rounded-full"
                      whileHover={{ y: -3 }}
                      aria-label={link.label}
                    >
                      {link.icon}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
