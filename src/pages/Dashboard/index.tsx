import { useEffect, useState } from "react";
import withAdminAuth from "../../HOC/withAdminAuth";
import Sidebar from "../../component/SideBar";
import ProductDashboard from "../../component/ProductDashboard";
import UserDashboard from "../../component/UserDashboard";
import OrderDashboard from "../../component/OrderDashboard";
import { useStoreContext } from "../../context/useContext/useStoreContext";
import orderService from "../../services/order.service";
import usersService from "../../services/users.service";

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("products");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const { updateOrders, updateUsers } = useStoreContext();

  useEffect(() => {
    (async () => {
      const orders = await orderService.getOrders();
      if (orders) updateOrders(orders);
      const users = await usersService.getAll();
      updateUsers(users);
    })();
  }, [updateOrders, updateUsers]);

  return (
    <div className="flex flex-col sm:flex-row h-screen bg-white dark:bg-gray-900">
      {/* Mobile Header - Only visible on small screens */}
      <div className="sm:hidden flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-lg font-bold text-gray-800 dark:text-white">
          لوحة التحكم
        </h1>
        <button
          onClick={toggleSidebar}
          className="p-1.5 rounded-md text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
          aria-label="Toggle menu"
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            />
          </svg>
        </button>
      </div>

      {/* Sidebar - Fixed on mobile when open, always visible on desktop */}
      <div
        className={`${
          isSidebarOpen 
            ? "fixed inset-0 z-20 w-64 bg-white dark:bg-gray-800" 
            : "hidden"
        } sm:block sm:w-56 sm:relative sm:bg-transparent sm:dark:bg-transparent`}
      >
        <Sidebar
          isOpen={isSidebarOpen}
          setActiveTab={setActiveTab}
          toggleSidebar={toggleSidebar}
        />
      </div>

      {/* Overlay - Only visible when sidebar is open on mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-10 bg-black/50 sm:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Main Content */}
      <div
        className={`flex-1 overflow-auto p-3 sm:p-4 transition-all duration-200 ${
          isSidebarOpen ? "translate-x-64 sm:translate-x-0" : "translate-x-0"
        }`}
      >
        {activeTab === "users" && <UserDashboard />}
        {activeTab === "products" && <ProductDashboard />}
        {activeTab === "orders" && <OrderDashboard />}
      </div>
    </div>
  );
};

const ProtectDashboard = withAdminAuth(AdminDashboard);
export default ProtectDashboard;