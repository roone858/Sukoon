import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

// Reusable Icon Components
const CartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M21 15H11C8.17157 15 6.75736 15 5.87868 14.1213C5 13.2426 5 11.8284 5 9V5C5 3.89543 4.10457 3 3 3M10 19.5C10 20.3284 9.32843 21 8.5 21C7.67157 21 7 20.3284 7 19.5C7 18.6716 7.67157 18 8.5 18C9.32843 18 10 18.6716 10 19.5ZM18 19.5C18 20.3284 17.3284 21 16.5 21C15.6716 21 15 20.3284 15 19.5C15 18.6716 15.6716 18 16.5 18C17.3284 18 18 18.6716 18 19.5ZM12.5 11H16.5C17.9045 11 18.6067 11 19.1111 10.6629C19.3295 10.517 19.517 10.3295 19.6629 10.1111C20 9.60669 20 8.90446 20 7.5C20 6.09554 20 5.39331 19.6629 4.88886C19.517 4.67048 19.3295 4.48298 19.1111 4.33706C18.6067 4 17.9045 4 16.5 4H12.5C11.0955 4 10.3933 4 9.88886 4.33706C9.67048 4.48298 9.48298 4.67048 9.33706 4.88886C9 5.39331 9 6.09554 9 7.5C9 8.90446 9 9.60669 9.33706 10.1111C9.48298 10.3295 9.67048 10.517 9.88886 10.6629C10.3933 11 11.0955 11 12.5 11Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M15.9998 7C15.9998 9.20914 14.2089 11 11.9998 11C9.79067 11 7.99981 9.20914 7.99981 7C7.99981 4.79086 9.79067 3 11.9998 3C14.2089 3 15.9998 4.79086 15.9998 7Z"
      stroke="currentColor"
      strokeWidth="1.6"
    />
    <path
      d="M11.9998 14C9.15153 14 6.65091 15.3024 5.23341 17.2638C4.48341 18.3016 4.10841 18.8204 4.6654 19.9102C5.2224 21 6.1482 21 7.99981 21H15.9998C17.8514 21 18.7772 21 19.3342 19.9102C19.8912 18.8204 19.5162 18.3016 18.7662 17.2638C17.3487 15.3024 14.8481 14 11.9998 14Z"
      stroke="currentColor"
      strokeWidth="1.6"
    />
  </svg>
);

// Reusable Dropdown Components
const Dropdown = () => (
  <div className="dropdown" dir="ltr">
    <div
      tabIndex={0}
      role="button"
      className="btn m-1 border-0 p-0 bg-transparent text-gray-500 hover:text-gray-900 transition-all duration-300"
    >
      <UserIcon />
      <svg
        className="dropdown-open:rotate-180 w-2.5 h-2.5 transition-transform"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
    <ul
      tabIndex={0}
      className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
    >
      <li>
        <a>Item 1</a>
      </li>
      <li>
        <a>Item 2</a>
      </li>
    </ul>
  </div>
);

const CartDropdown = () => (
  <div className="dropdown" dir="ltr">
    <div
      tabIndex={1}
      role="button"
      className="btn m-1 border-0 bg-transparent text-gray-500 hover:text-gray-900 transition-all duration-300"
    >
      <CartIcon />
    </div>
    <div
      tabIndex={1}
      className="dropdown-content card card-sm bg-base-100 z-50 w-64 shadow-md"
    >
      <div className="card-body">
        <p>This is a card. You can use any element as a dropdown.</p>
      </div>
    </div>
  </div>
);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 border-b shadow border-gray-200 bg-white z-50 p-1 py-0.5 sm:p-2 sm:py-1 md:p-4 md:py-2 lg:p-6 lg:py-3 xl:p-8 xl:py-4">
      <div className="w-full flex flex-row lg:flex-row justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center p-2">
          <img src={logo} alt="logo" className="w-16" />
        </Link>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden items-center gap-5">
          <CartDropdown />
          <Dropdown />
          <button
            onClick={toggleMenu}
            type="button"
            className="p-2 text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-menu"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {/* Menu Links */}
        <div
          className={`${
            isMenuOpen ? "absolute" : "hidden"
          } bg-white top-25 w-full lg:flex lg:items-center lg:pr-11`}
          id="navbar-menu"
        >
          <ul className="flex flex-col lg:flex-row items-center gap-4 mt-1 lg:mt-0 lg:ml-auto">
            {[
              "مراتب النوم",
              "اسرة وملحقاتها",
              "مخدات",
              "المفارش",
              "اللباد وواقى المراتب",
            ].map((item, index) => (
              <li key={index}>
                <Link
                  to="#"
                  className="text-gray-500 text-sm lg:text-base font-medium hover:text-indigo-700 transition-all duration-500"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop Icons */}
        <div className="hidden lg:flex items-center gap-3">
          <CartDropdown />
          <Dropdown />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;