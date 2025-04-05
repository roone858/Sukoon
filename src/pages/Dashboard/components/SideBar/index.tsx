import { Link, useLocation } from "react-router-dom";
import { FaBox, FaShoppingCart, FaHome, FaUsers, FaChartBar, FaCog, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useAuthContext } from "../../../../context/hooks/useAuthContext";
import { useStoreContext } from "../../../../context/hooks/useStoreContext";
import { useEffect } from "react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation();
  const { products, orders, users } = useStoreContext();
  const { user } = useAuthContext();

  // Close sidebar when route changes on mobile
  useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [isOpen, location.pathname, onClose]);

  const navigationItems = [
    {
      name: "الرئيسية",
      href: "/",
      icon: FaHome,
    },
    {
      name: "المنتجات",
      href: "/dashboard/products",
      icon: FaBox,
      count: products.length,
    },
    {
      name: "الطلبات",
      href: "/dashboard/orders",
      icon: FaShoppingCart,
      count: orders.length,
    },
    {
      name: "المستخدمين",
      href: "/dashboard/users",
      icon: FaUsers,
      count: users.length,
    },
    {
      name: "التقارير",
      href: "/dashboard/reports",
      icon: FaChartBar,
    },
    {
      name: "الإعدادات",
      href: "/dashboard/settings",
      icon: FaCog,
    },
  ];

  return (
    <>
      {/* Mobile Overlay - Enhanced for XS screens */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar - Enhanced for XS screens */}
      <div
        className={`fixed inset-y-0 right-0 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } md:translate-x-0 md:static md:inset-0`}
        aria-label="Sidebar"
      >
        <div className="h-full flex flex-col overflow-y-auto">
          {/* User Profile Section */}
          <div className="p-3 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                <FaUser className="w-4 h-4 text-purple-600 dark:text-purple-300" />
              </div>
              <div className="mr-2 overflow-hidden">
                <h2 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {user?.username}
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {user?.email}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Links - Enhanced for XS */}
          <nav className="flex-1 px-1 py-2 space-y-1 overflow-y-auto">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg mx-1 transition-colors duration-200 ${
                    isActive
                      ? "bg-purple-50 text-purple-600 dark:bg-purple-900/50 dark:text-purple-300"
                      : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <item.icon
                    className={`w-4 h-4 ml-2 ${
                      isActive
                        ? "text-purple-600 dark:text-purple-300"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  />
                  <span className="flex-1 truncate">{item.name}</span>
                  {item.count !== undefined && (
                    <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-medium rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 min-w-[20px]">
                      {item.count > 99 ? "99+" : item.count}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Logout Button - Enhanced for XS */}
          <div className="p-2 border-t border-gray-200 dark:border-gray-700">
            <button
              // onClick={logout}
              className="flex items-center w-full px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/50 rounded-lg transition-colors duration-200"
              aria-label="تسجيل الخروج"
            >
              <FaSignOutAlt className="w-4 h-4 mr-2" />
              <span className="truncate">تسجيل الخروج</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;