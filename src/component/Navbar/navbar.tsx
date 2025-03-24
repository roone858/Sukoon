import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartIcon, UserIcon } from ".";
import logo from "../../assets/logo.png";
import CartItem from "../CartItem";
import { useAuthContext } from "../../context/useContext/useAuthContext";
import AvatarWithDropdown from "../AvatarWithDropdown/Index";
import { useCartContext } from "../../context/useContext/useCartContext";

const Navbar = () => {
  const { isAuthenticated } = useAuthContext();
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [productsMenuOpen, setProductsMenuOpen] = useState(false);
  const { cart } = useCartContext();

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
        className={`shadow-md fixed top-0 w-full z-50 transition-transform duration-300 bg-gray-100/90 backdrop-blur-md border-b border-gray-200 ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-screen-xl mx-auto px-3 sm:px-4 flex items-center justify-between relative h-16">
          {/* Logo - optimized for mobile */}
          <Link to="/" className="flex-shrink-0">
            <img 
              src={logo} 
              alt="Logo" 
              className="h-12 sm:h-14 w-auto" 
              style={{ maxWidth: "120px" }}
            />
          </Link>

          {/* Desktop Menu - hidden on mobile */}
          <ul className="hidden md:flex space-x-4 lg:space-x-6 text-gray-700 text-sm lg:text-base">
            <li>
              <Link to="/" className="hover:text-blue-600 px-2 py-1">
                الرئيسية
              </Link>
            </li>
            <li
              className="relative"
              onMouseEnter={() => setProductsMenuOpen(true)}
              onMouseLeave={() => setProductsMenuOpen(false)}
            >
              <button className="hover:text-blue-600 focus:outline-none px-2 py-1">
                المنتجات
              </button>
              {/* Mega Menu for Products */}
              {productsMenuOpen && (
                <div className="absolute left-0 w-56 sm:w-64 bg-white shadow-lg rounded-lg p-2 sm:p-4 z-50">
                  <ul className="space-y-1 sm:space-y-2">
                    <li>
                      <Link
                        to="/medical-mattresses"
                        className="block p-1 sm:p-2 hover:bg-gray-100 rounded text-sm sm:text-base"
                      >
                        مراتب طبية
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/luxury-mattresses"
                        className="block p-1 sm:p-2 hover:bg-gray-100 rounded text-sm sm:text-base"
                      >
                        مراتب فاخرة
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/covers-quilts"
                        className="block p-1 sm:p-2 hover:bg-gray-100 rounded text-sm sm:text-base"
                      >
                        أغطية وألحفة
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/bedroom-furnishings"
                        className="block p-1 sm:p-2 hover:bg-gray-100 rounded text-sm sm:text-base"
                      >
                        مفروشات غرف النوم
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/special-offers"
                        className="block p-1 sm:p-2 hover:bg-gray-100 rounded text-sm sm:text-base"
                      >
                        عروض خاصة
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>
            <li>
              <Link to="/about-us" className="hover:text-blue-600 px-2 py-1">
                العروض
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-blue-600 px-2 py-1">
                المدونة
              </Link>
            </li>
          </ul>

          {/* Icons - optimized spacing for mobile */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              className="relative p-1 sm:p-2 text-gray-700 hover:text-blue-600"
              onClick={() => setCartOpen(true)}
            >
              <CartIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              {cart.length ? (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 sm:px-2 rounded-full">
                  {cart.length}
                </span>
              ) : null}
            </button>

            {isAuthenticated ? (
              <div className="w-8 h-8 sm:w-8 sm:h-8">
                <AvatarWithDropdown />
              </div>
            ) : (
              <Link to="/login" className="p-1 sm:p-2">
                <UserIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              </Link>
            )}

            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden p-1 text-gray-700 hover:text-blue-600"
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

        {/* Mobile Menu */}
        <div
          className={`fixed inset-0 h-screen bg-black/50 z-50 transition-opacity duration-300 ${
            menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          onClick={() => setMenuOpen(false)}
        ></div>
        <div
          className={`fixed top-0 left-0 w-4/5 max-w-xs h-screen bg-white shadow-lg p-3 sm:p-4 z-50 transform transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg sm:text-xl font-bold">القائمة</h2>
            <button
              onClick={() => setMenuOpen(false)}
              className="text-gray-700 hover:text-red-500 p-1"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <ul className="space-y-3 text-gray-700">
            <li>
              <Link 
                to="/" 
                onClick={() => setMenuOpen(false)}
                className="block p-2 hover:bg-gray-100 rounded"
              >
                <span className="mr-2">🏠</span> الرئيسية
              </Link>
            </li>
            <li>
              <Link 
                to="/products" 
                onClick={() => setMenuOpen(false)}
                className="block p-2 hover:bg-gray-100 rounded"
              >
                <span className="mr-2">🛍️</span> المنتجات
              </Link>
            </li>
            <li>
              <Link 
                to="/about-us" 
                onClick={() => setMenuOpen(false)}
                className="block p-2 hover:bg-gray-100 rounded"
              >
                <span className="mr-2">ℹ️</span> معلومات عنا
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                onClick={() => setMenuOpen(false)}
                className="block p-2 hover:bg-gray-100 rounded"
              >
                <span className="mr-2">📞</span> اتصل بنا
              </Link>
            </li>
          </ul>
        </div>

        {/* Shopping Cart Sidebar */}
        <div
          className={`fixed inset-0 h-screen bg-black/50 z-50 transition-opacity duration-300 ${
            cartOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          onClick={() => setCartOpen(false)}
        ></div>
        <div
          className={`fixed top-0 right-0 w-4/5 max-w-sm h-screen bg-white shadow-lg p-3 sm:p-4 z-50 transform transition-transform duration-300 ${
            cartOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg sm:text-xl font-bold">عربة التسوق</h2>
            <button
              onClick={() => setCartOpen(false)}
              className="text-gray-700 hover:text-red-500 p-1"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="h-[calc(100%-120px)] overflow-y-auto">
            <ul className="space-y-3">
              {cart.length ? (
                cart.map((item, index) => <CartItem key={index} item={item} />)
              ) : (
                <li className="text-center py-8 text-gray-500">
                  <div className="text-4xl mb-2">🛒</div>
                  <p>عربة التسوق فارغة</p>
                </li>
              )}
            </ul>
          </div>
          {cart.length > 0 && (
            <div className="absolute bottom-4 left-0 right-0 px-4">
              <Link
                to="checkout"
                onClick={() => setCartOpen(false)}
                className="block w-full text-center text-sm sm:text-base font-semibold bg-purple-800 text-white px-4 py-2 rounded-lg hover:bg-purple-900 transition-colors duration-300"
              >
                استكمال الطلب
              </Link>
            </div>
          )}
        </div>
      </nav>
      {/* Spacer to prevent content from being hidden behind fixed navbar */}
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;