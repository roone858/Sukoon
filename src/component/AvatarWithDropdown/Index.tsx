import { useState } from "react";
import authService from "../../services/auth.service";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/useContext/useAuthContext";
import { apiUrl } from "../../util/urls";

const AvatarWithDropdown = () => {
  const [open, setOpen] = useState(false);
  const { user } = useAuthContext();

  return (
    <div
      className="flex justify-center items-center dark:bg-gray-500 "
      dir="rtl"
    >
      <div className=" flex justify-center items-center">
        <div
          onClick={() => setOpen(!open)}
          className={`relative  ${
            open ? "border-purple-700 transform transition duration-300" : ""
          }`}
        >
          <div className="flex justify-center items-center space-x-3 cursor-pointer">
            <img
              className="inline-block h-8 w-8 rounded-full ring-2 ring-white ml-2"
              src={
                apiUrl + "/users/profile-picture/default-profile-picture.webp"
              }
              alt=""
            />

            <div className="font-semibold dark:text-white text-gray-500 text-xs">
              <div className="cursor-pointer"> {user?.name}</div>
            </div>
          </div>
          {open && (
            <div className="absolute left-0 px-5 py-3 text-sm dark:bg-gray-800 bg-white rounded-lg shadow text-gray-500  dark:border-transparent mt-5">
              <ul className="space-y-3 ">
                <li className="font-medium">
                  <Link
                    to="setting"
                    className="flex  text-nowrap pl-2 items-center transform transition-colors duration-200 border-l-4 border-transparent hover:border-purple-700"
                  >
                    <div className="ml-3">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        ></path>
                      </svg>
                    </div>
                    الاعدادات
                  </Link>
                </li>

                {user.role == "admin" && (
                  <li className="font-medium">
                    <Link
                      to="dashboard"
                      className="flex  text-nowrap pl-2 items-center transform transition-colors duration-200 border-l-4 border-transparent hover:border-purple-700"
                    >
                      <div className="ml-3">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                          ></path>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          ></path>
                        </svg>
                      </div>
                      لوحة التحكم
                    </Link>
                  </li>
                )}
                <hr className="dark:border-gray-700" />
                <li className="" onClick={() => authService.logout()}>
                  <a
                    href="#"
                    className="flex  text-nowrap pl-2 items-center transform transition-colors duration-200 border-l-4 border-transparent hover:border-red-600"
                  >
                    <div className="ml-3 text-red-600">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        ></path>
                      </svg>
                    </div>
                    تسجيل الخروج
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AvatarWithDropdown;
