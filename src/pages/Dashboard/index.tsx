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
    <div className=" h-screen bg-white dark:bg-gray-900">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        setActiveTab={setActiveTab}
      />
      <div
        onClick={() => {
          if (isSidebarOpen) toggleSidebar();
        }}
        className="bg-white p-4 sm:mr-64 "
      >
        {/* <MainContent/> */}
        {activeTab == "users" && <UserDashboard />}
        {activeTab == "products" && <ProductDashboard />}
        {activeTab == "orders" && <OrderDashboard />}
      </div>
    </div>
  );
};

const ProtectDashboard = withAdminAuth(AdminDashboard);
export default ProtectDashboard;
