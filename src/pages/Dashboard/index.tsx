import { useEffect, useState } from "react";
import withAdminAuth from "../../HOC/withAdminAuth";
import Sidebar from "../../component/SideBar";
import ProductTab from "./components/ProductTab";
import UserTab from "./components/UserTab";
import OrderTab from "./components/OrderTab";
import { useStoreContext } from "../../context/hooks/useStoreContext";
import orderService from "../../services/order.service";
import usersService from "../../services/users.service";
import { Routes, Route, useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa";

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const { updateOrders, updateUsers } = useStoreContext();

  useEffect(() => {
    (async () => {
      const orders = await orderService.getOrders();
      if (orders) updateOrders(orders);
      const users = await usersService.getAll();
      updateUsers(users);
    })();
  }, [updateOrders, updateUsers]);

  const getPageTitle = () => {
    switch (location.pathname) {
      case "/dashboard/products":
        return "المنتجات";
      case "/dashboard/orders":
        return "الطلبات";
      case "/dashboard/users":
        return "المستخدمين";
      case "/dashboard/reports":
        return "التقارير";
      case "/dashboard/settings":
        return "الإعدادات";
      default:
        return "لوحة التحكم";
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation Bar */}
        <header className="bg-white dark:bg-gray-800 shadow-sm">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <FaBars className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
              {getPageTitle()}
            </h1>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
          <div className="container mx-auto px-4 py-6">
            <Routes>
              <Route path="/products" element={<ProductTab />} />
              <Route path="/orders" element={<OrderTab />} />
              <Route path="/users" element={<UserTab />} />
              <Route
                path="/reports"
                element={
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                      التقارير
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      صفحة التقارير قيد التطوير
                    </p>
                  </div>
                }
              />
              <Route
                path="/settings"
                element={
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                      الإعدادات
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      صفحة الإعدادات قيد التطوير
                    </p>
                  </div>
                }
              />
              {/* Default route */}
              <Route
                path="/"
                element={
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                      مرحباً بك في لوحة التحكم
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      اختر قسم من القائمة الجانبية للبدء
                    </p>
                  </div>
                }
              />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};

const ProtectPage = withAdminAuth(AdminDashboard);

export default ProtectPage;
