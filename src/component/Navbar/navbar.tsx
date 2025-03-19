import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartIcon, UserIcon } from ".";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // دالة لمراقبة التمرير وإخفاء أو إظهار النافبار
  useEffect(() => {
    const handleScroll = () => {
      if (!menuOpen && !cartOpen) {
        // لا تقم بإخفاء النافبار إذا كانت القوائم مفتوحة
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
        className={` shadow-md fixed top-0 w-full z-50 transition-transform duration-300 bg-white/90 backdrop-blur-md border-b border-gray-200 ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="container mx-auto px-4  flex items-center justify-between relative">
          {/* الشعار */}
          <Link to="/" className="flex-shrink-0">
            <img src={logo} alt="Logo" className="h-18" />
          </Link>

          {/* القائمة - تظهر في الشاشات الكبيرة */}
          <ul className="hidden md:flex space-x-6 text-gray-700">
            <li>
              <Link to="/" className="hover:text-blue-600">
                الرئيسية
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-blue-600">
                المنتجات
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-blue-600">
                معلومات عنا
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-blue-600">
                اتصل بنا
              </Link>
            </li>
          </ul>

          {/* أزرار عربة التسوق وتسجيل الدخول */}
          <div className="flex items-center space-x-4">
            {/* زر عربة التسوق */}
            <button
              className="relative p-2 text-gray-700 hover:text-blue-600"
              onClick={() => setCartOpen(true)}
            >
              <CartIcon />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-2 rounded-full">
                3
              </span>
            </button>

            {/* زر تسجيل الدخول */}
            <Link to="/login">
              <UserIcon />
            </Link>

            {/* زر القائمة للجوال */}
            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden p-2 text-gray-700 hover:text-blue-600"
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

        {/* ✅ القائمة الجانبية للجوال */}
        <div
          className={`fixed inset-0 h-screen bg-black/50 bg-opacity-50 z-50 transition-opacity duration-300 ${
            menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          onClick={() => setMenuOpen(false)}
        ></div>
        <div
          className={`fixed top-0 left-0 w-64 h-screen bg-white shadow-lg p-4 z-50 transform transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">القائمة</h2>
            <button
              onClick={() => setMenuOpen(false)}
              className="text-gray-700 hover:text-red-500"
            >
              X
            </button>
          </div>
          <ul className="flex flex-col space-y-4 mt-4 text-gray-700">
            <li>
              <Link to="/" onClick={() => setMenuOpen(false)}>
                🏠 الرئيسية
              </Link>
            </li>
            <li>
              <Link to="/products" onClick={() => setMenuOpen(false)}>
                🛍️ المنتجات
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={() => setMenuOpen(false)}>
                ℹ️ معلومات عنا
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={() => setMenuOpen(false)}>
                📞 اتصل بنا
              </Link>
            </li>
          </ul>
        </div>

        {/* ✅ عربة التسوق الجانبية */}
        <div
          className={`fixed inset-0  h-screen bg-black/50  z-50 transition-opacity duration-300 ${
            cartOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          onClick={() => setCartOpen(false)}
        ></div>
        <div
          className={`fixed top-0 right-0 w-80  h-screen bg-white shadow-lg p-4 z-50 transform transition-transform duration-300 ${
            cartOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">عربة التسوق</h2>
            <button
              onClick={() => setCartOpen(false)}
              className="text-gray-700 hover:text-red-500"
            >
              X
            </button>
          </div>
          <div className="mt-4">
            <p>🚀 لا توجد منتجات في العربة بعد!</p>
          </div>
        </div>
      </nav>
      <div className="h-18"></div>
    </>
  );
};

export default Navbar;
