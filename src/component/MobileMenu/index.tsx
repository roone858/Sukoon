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
import { useState } from "react";
import "./style.css";
import logo from "../../assets/logo.png";
import { useAuthContext } from "../../context/hooks/useAuthContext";
import { apiUrl } from "../../util/urls";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [activeItem, setActiveItem] = useState<string>("/");
  const [searchFocused, setSearchFocused] = useState(false);
  const { isAuthenticated, user } = useAuthContext();

  const menuItems = [
    { title: "الرئيسية", path: "/", icon: "🏠" },
    { title: "المتجر", path: "/shop", icon: "🛍️" },
    { title: "البائعين", path: "/vendors", icon: "👥" },
    { title: "القائمة الكبيرة", path: "/mega-menu", icon: "📋" },
    { title: "المدونة", path: "/blog", icon: "📝" },
    { title: "الصفحات", path: "/pages", icon: "📄" },
    { title: "اللغة", path: "/language", icon: "🌐" },
  ];

  const socialLinks = [
    { icon: <FaDiscord className="w-5 h-5" />, href: "#", label: "Discord" },
    {
      icon: <FaPinterest className="w-5 h-5" />,
      href: "#",
      label: "Pinterest",
    },
    {
      icon: <FaInstagram className="w-5 h-5" />,
      href: "#",
      label: "Instagram",
    },
    { icon: <FaTwitter className="w-5 h-5" />, href: "#", label: "Twitter" },
    { icon: <FaFacebookF className="w-5 h-5" />, href: "#", label: "Facebook" },
  ];

  const handleMenuClick = (path: string) => {
    setActiveItem(path);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 mobile-menu-overlay"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 left-0 w-full max-w-sm h-full bg-white z-50 overflow-y-auto mobile-menu shadow-xl"
            dir="rtl"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <motion.div
                className="flex justify-between items-center p-4 border-b"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
                  aria-label="إغلاق القائمة"
                >
                  <RiCloseLine className="w-6 h-6 text-gray-600" />
                </button>
                <img src={logo} alt="Nest" className="h-8 scale-150" />
              </motion.div>

              {/* Search Bar */}
              <motion.div
                className="p-4"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="relative">
                  <input
                    type="text"
                    placeholder="ابحث عن المنتجات..."
                    className={`w-full bg-gray-100 rounded-lg py-3 pr-4 pl-12 search-input transition-all duration-300 ${
                      searchFocused ? "ring-2 ring-purple-500 bg-white" : ""
                    }`}
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                  />
                  <IoSearchOutline className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
              </motion.div>

              {/* Navigation Links */}
              <nav className="flex-1">
                <motion.ul
                  className="space-y-1"
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
                        className={`flex items-center px-4 py-3 transition-colors menu-item gap-3 ${
                          activeItem === item.path
                            ? "bg-purple-50 text-purple-600"
                            : "text-gray-700"
                        }`}
                        onClick={() => handleMenuClick(item.path)}
                      >
                        <span className="text-lg">{item.icon}</span>
                        <span>{item.title}</span>
                      </Link>
                    </motion.li>
                  ))}
                </motion.ul>
              </nav>

              {/* Contact Info */}
              <motion.div
                className="p-4 border-t space-y-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <motion.div
                  className="flex items-center gap-3 text-gray-600 hover:text-purple-600 transition-colors p-2 rounded-lg hover:bg-purple-50 cursor-pointer"
                  whileHover={{ x: 5 }}
                >
                  <IoLocationOutline className="w-5 h-5 text-purple-600" />
                  <span>موقعنا</span>
                </motion.div>
                <motion.div
                  className="flex items-center gap-3 text-gray-600 hover:text-purple-600 transition-colors p-2 rounded-lg hover:bg-purple-50 cursor-pointer"
                  whileHover={{ x: 5 }}
                >
                  {isAuthenticated ? (
                    <Link to="/profile" className="relative flex items-center gap-3">
                      <img
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white shadow-sm transition-transform duration-200 group-hover:scale-105"
                        src={
                          apiUrl +
                          "/users/profile-picture/default-profile-picture.webp"
                        }
                        alt="User profile"
                        width={32}
                        height={32}
                      />
                      <div className="absolute inset-0 rounded-full bg-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      <span>{user?.name}</span>
                    </Link>
                  ) : (
                    <span>تسجيل الدخول / إنشاء حساب</span>
                  )}
                </motion.div>
                <motion.div
                  className="flex items-center gap-3 text-gray-600 hover:text-purple-600 transition-colors p-2 rounded-lg hover:bg-purple-50 cursor-pointer"
                  whileHover={{ x: 5 }}
                >
                  <IoCallOutline className="w-5 h-5 text-purple-600" />
                  <span dir="ltr">+01-2345-6789</span>
                </motion.div>
              </motion.div>

              {/* Social Links */}
              <motion.div
                className="p-4 border-t"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <div className="flex justify-center gap-4">
                  {socialLinks.map((link, index) => (
                    <motion.a
                      key={index}
                      href={link.href}
                      className="text-gray-500 hover:text-purple-600 transition-colors social-icon p-2 hover:bg-purple-50 rounded-full"
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
