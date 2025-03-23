import OrderTable from "../OrderTable";


const OrderDashboard = () => {

  return (
    <div className="p-6  dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        قائمة الطلبات
      </h1>
      <OrderTable />
    </div>
  );
};

export default OrderDashboard;
