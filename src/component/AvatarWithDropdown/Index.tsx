import { useState } from "react";
import authService from "../../services/auth.service";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/useContext/useAuthContext";
import { apiUrl } from "../../util/urls";

const AvatarWithDropdown = () => {
  const [open, setOpen] = useState(false);
  const { user } = useAuthContext();

  return (
    <div className="relative" dir="rtl">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center space-x-2 focus:outline-none"
        aria-label="User menu"
        aria-expanded={open}
      >
        <img
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white"
          src={apiUrl + "/users/profile-picture/default-profile-picture.webp"}
          alt="User profile"
          width={32}
          height={32}
        />
        <span className="hidden xs:inline text-xs font-medium text-gray-600 dark:text-gray-200">
          {user?.name}
        </span>
      </button>

      {open && (
        <>
          {/* Clickaway backdrop for mobile */}
          <div
            className="fixed inset-0 z-40 bg-black/10 md:hidden"
            onClick={() => setOpen(false)}
          />
          
          {/* Dropdown menu */}
          <div className="absolute left-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none dark:bg-gray-800 dark:ring-gray-700">
            <ul className="space-y-1 p-1 text-sm text-gray-700 dark:text-gray-200">
              <li>
                <Link
                  to="setting"
                  className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setOpen(false)}
                >
                  <svg
                    className="mr-2 h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  الإعدادات
                </Link>
              </li>

              {user.role == "admin" && (
                <li>
                  <Link
                    to="dashboard"
                    className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setOpen(false)}
                  >
                    <svg
                      className="mr-2 h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    لوحة التحكم
                  </Link>
                </li>
              )}

              <li className="border-t border-gray-200 dark:border-gray-700" />

              <li>
                <button
                  onClick={() => {
                    authService.logout();
                    setOpen(false);
                  }}
                  className="flex w-full items-center px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <svg
                    className="mr-2 h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  تسجيل الخروج
                </button>
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default AvatarWithDropdown;