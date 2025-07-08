import OrderTable from "../OrderTable";

const OrderDashboard = () => {
  return (
    <div className="p-3 sm:p-4 md:p-6 dark:bg-gray-900 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
          قائمة الطلبات
        </h1>
        
        {/* Optional: Add filter/sort controls */}
        <div className="flex gap-2">
          {/* Example filter button */}
          {/* <button className="text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-3 py-1.5 rounded-lg transition-colors">
            تصفية
          </button> */}
          
          {/* Example sort button */}
          {/* <button className="text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-3 py-1.5 rounded-lg transition-colors">
            ترتيب
          </button> */}
        </div>
      </div>
      
      <div className=" dark:bg-gray-800 rounded-lg  overflow-hidden">
        <OrderTable />
      </div>
    </div>
  );
};

export default OrderDashboard;