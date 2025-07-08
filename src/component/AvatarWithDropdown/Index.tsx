import { useState, useEffect, useRef } from "react";
import authService from "../../services/auth.service";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/hooks/useAuthContext";
import { apiUrl } from "../../util/urls";
import {
  FiSettings,
  FiLogOut,
  FiUser,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";

const AvatarWithDropdown = () => {
  const [open, setOpen] = useState(false);
  const { user } = useAuthContext();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" dir="rtl" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center space-x-2 focus:outline-none group"
        aria-label="User menu"
        aria-expanded={open}
      >
        <div className="relative aspect-square">
          <img
            className="w-8  sm:w-10   aspect-square rounded-full border-2 border-white shadow-sm transition-transform duration-200 group-hover:scale-105"
            src={user?.profilePicture || apiUrl + "/users/profile-picture"}
            alt="User profile"
            width={32}
            height={32}
          />
          <div className="absolute  aspect-square inset-0 rounded-full bg-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        </div>
        <span className="hidden truncate xs:inline text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-purple-600 transition-colors duration-200">
          {user?.name.split(" ")[0] || "المستخدم"}
        </span>
        <div className="transition-transform duration-200 group-hover:translate-y-0.5">
          {open ? (
            <FiChevronUp className="w-4 h-4" />
          ) : (
            <FiChevronDown className="w-4 h-4" />
          )}
        </div>
      </button>

      {open && (
        <>
          {/* Clickaway backdrop for mobile */}
          <div
            className="fixed inset-0 z-40 bg-black/10 backdrop-blur-sm md:hidden transition-opacity duration-200"
            onClick={() => setOpen(false)}
          />

          {/* Dropdown menu */}
          <div
            className="absolute left-0 z-50 mt-2 w-56 origin-top-right rounded-xl bg-white py-2 shadow-lg ring-1 ring-black/5 focus:outline-none dark:bg-gray-800 dark:ring-gray-700 transform transition-all duration-200 ease-out"
            style={{
              animation: "dropdownFadeIn 0.2s ease-out",
            }}
          >
            {/* User Info Section */}
            <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
              <div className="relative flex items-center space-x-3">
                <img
                  className="w-10 h-10 rounded-full border-2 border-purple-100 dark:border-purple-900"
                  src={
                    user?.profilePicture ||
                    apiUrl +
                      "/users/profile-picture/default-profile-picture.webp"
                  }
                  alt="User profile"
                />
                <div className="relative max-w-[150px]">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {user?.name}
                  </p>
                  <p dir="ltr" className="text-xs truncate  text-gray-500 dark:text-gray-400">
                    {user?.email}
                  </p>
                </div>
              </div>
            </div>

            <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
              <li>
                <Link
                  to="/profile"
                  className="flex items-center px-4 py-2.5 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors duration-150"
                  onClick={() => setOpen(false)}
                >
                  <FaUserCircle className="ml-3 h-5 w-5 text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-200">
                    الملف الشخصي
                  </span>
                </Link>
              </li>

              <li>
                <Link
                  to="/settings"
                  className="flex items-center px-4 py-2.5 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors duration-150"
                  onClick={() => setOpen(false)}
                >
                  <FiSettings className="ml-3 h-5 w-5 text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-200">
                    الإعدادات
                  </span>
                </Link>
              </li>

              {user?.role === "admin" && (
                <li>
                  <Link
                    to="/dashboard"
                    className="flex items-center px-4 py-2.5 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors duration-150"
                    onClick={() => setOpen(false)}
                  >
                    <FiUser className="ml-3 h-5 w-5 text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-200">
                      لوحة التحكم
                    </span>
                  </Link>
                </li>
              )}

              <li className="border-t border-gray-100 dark:border-gray-700 my-1" />

              <li>
                <button
                  onClick={() => {
                    authService.logout();
                    setOpen(false);
                  }}
                  className="flex w-full items-center px-4 py-2.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-150"
                >
                  <FiLogOut className="ml-3 h-5 w-5" />
                  <span>تسجيل الخروج</span>
                </button>
              </li>
            </ul>
          </div>
        </>
      )}

      <style>{`
        @keyframes dropdownFadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default AvatarWithDropdown;
