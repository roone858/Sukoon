
import { IoTrashOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import orderService from "../../../services/order.service";
import { useEffect } from "react";
import { useStoreContext } from "../../../context/useContext/useStoreContext";
const OrdersTab = () => {
  const { updateOrders ,orders} = useStoreContext();
  useEffect(() => {
    const fetchOrders = async () => {
      const response = await orderService.getOrdersByUserId();
      updateOrders(response || []);
    };
    fetchOrders();
  }, [updateOrders]);

  const handleDeleteOrder = async (orderId: string) => {
    try {
      await orderService.deleteOrder(orderId);
      updateOrders(orders.filter((order) => order._id !== orderId));
      toast.success("تم حذف الطلب بنجاح");
      // يمكنك هنا تحديث حالة الطلبات في الوالد
      window.location.reload();
    } catch {
      toast.error("حدث خطأ أثناء حذف الطلب");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">طلباتي</h2>
        <p className="text-gray-600">
          {orders.length} {orders.length === 1 ? "طلب" : "طلبات"}
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">لا توجد طلبات حالياً</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    رقم الطلب: {order._id}
                  </h3>
                  <p className="text-sm text-gray-500">
                    تاريخ الطلب: {new Date(order.createdAt || "").toLocaleDateString("ar-SA")}
                  </p>
                </div>
                <button
                  onClick={() => {
                    if (window.confirm("هل أنت متأكد من حذف هذا الطلب؟")) {
                      handleDeleteOrder(order._id || "");
                    }
                  }}
                  className="text-red-500 hover:text-red-700 transition-colors p-2 rounded-full hover:bg-red-50"
                >
                  <IoTrashOutline className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">الحالة:</span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      order.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : order.status === "processing"
                        ? "bg-blue-100 text-blue-800"
                        : order.status === "shipped"
                        ? "bg-purple-100 text-purple-800"
                        : order.status === "delivered"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {order.status === "pending"
                      ? "قيد الانتظار"
                      : order.status === "processing"
                      ? "قيد المعالجة"
                      : order.status === "shipped"
                      ? "تم الشحن"
                      : order.status === "delivered"
                      ? "تم التسليم"
                      : "ملغي"}
                  </span>
                </div>

                <div className="mt-2">
                  <span className="text-gray-600">المبلغ الإجمالي:</span>
                  <span className="font-semibold text-gray-900 mr-2">
                    {order.totalAmount} ريال
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersTab;
