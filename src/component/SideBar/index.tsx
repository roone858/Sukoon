import { Link, useLocation } from "react-router-dom";
import { useStoreContext } from "../../context/useContext/useStoreContext";
import { useAuthContext } from "../../context/useContext/useAuthContext";
import { FaBox, FaShoppingCart,FaHome, FaUsers, FaChartBar, FaCog, FaSignOutAlt, FaUser } from "react-icons/fa";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation();
  const { products, orders, users } = useStoreContext();
  const { user } = useAuthContext();

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
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50  z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 right-0 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="h-full flex flex-col">
          {/* User Profile Section */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                <FaUser className="w-5 h-5 text-purple-600 dark:text-purple-300" />
              </div>
              <div className="mr-2">
                <h2 className="text-sm font-medium text-gray-900 dark:text-white">
                  {user?.username}
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {user?.email}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    isActive
                      ? "bg-purple-50 text-purple-600 dark:bg-purple-900/50 dark:text-purple-300"
                      : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                  }`}
                >
                  <item.icon
                    className={`w-5 h-5 ml-3 ${
                      isActive
                        ? "text-purple-600 dark:text-purple-300"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  />
                  <span className="flex-1">{item.name}</span>
                  {item.count !== undefined && (
                    <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                      {item.count}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <button
              // onClick={logout}
              className="flex items-center w-full px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/50 rounded-lg transition-colors duration-200"
            >
              <FaSignOutAlt className="w-5 h-5 mr-3" />
              تسجيل الخروج
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
