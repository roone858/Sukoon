import UserTable from "../UserTable";

const UserDashboard = () => {
  return (
    <div className="p-3 sm:p-4 md:p-6 dark:bg-gray-900 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
          قائمة المستخدمين
        </h1>
        
        {/* Add user button - example for future functionality */}
        {/* <button className="text-sm bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-lg transition-colors">
          إضافة مستخدم جديد
        </button> */}
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm sm:shadow-md overflow-hidden">
        <UserTable />
      </div>
    </div>
  );
};

export default UserDashboard;