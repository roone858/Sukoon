import { useState } from "react";
import withAdminAuth from "../../HOC/withAdminAuth";
import Sidebar from "../../component/SideBar";
import ProductDashboard from "../../component/ProductDashboard";
import UserTable from "../../component/UserTable";
import UserDashboard from "../../component/UserDashboaard";

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("products");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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
        {activeTab == "users" && (
          <h1>
            <UserDashboard />
          </h1>
        )}
        {activeTab == "products" && <ProductDashboard />}
      </div>
    </div>
  );
};

const ProtectDashboard = withAdminAuth(AdminDashboard);
export default ProtectDashboard;
