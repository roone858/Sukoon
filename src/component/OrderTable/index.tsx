import React, { useState } from "react";
import { useStoreContext } from "../../context/useContext/useStoreContext";
import { useAuthContext } from "../../context/useContext/useAuthContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Order } from "../../util/types";
import EditOrderForm from "../EditOrderForm";
import orderService from "../../services/order.service";
// import ordersService from "../../services/orders.service";

const OrderTable: React.FC = () => {
  const { orders, users, updateOrders } = useStoreContext();
  const { user } = useAuthContext();
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);

  const handleDelete = async (id: string) => {
    if (user.role !== "admin") {
      toast.error("عذراً، لا تملك صلاحية حذف الطلبات");
      return;
    }

    toast.info(
      <div className="text-right">
        <p>هل أنت متأكد من أنك تريد حذف هذا الطلب؟</p>
        <div className="flex justify-end gap-3 mt-3">
          <button
            onClick={async () => {
              const order = await orderService.deleteOrder(id);
              if (order) {
                updateOrders(orders.filter((order) => order?._id !== id));
                toast.success("تم حذف الطلب بنجاح!");
              }
              toast.dismiss();
            }}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-md text-sm transition-colors"
          >
            نعم
          </button>
          <button
            onClick={() => toast.dismiss()}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-1.5 rounded-md text-sm transition-colors"
          >
            لا
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeButton: false,
        draggable: false,
      }
    );
  };

  const handleUpdateOrder = (updatedOrder: Order) => {
    updateOrders(
      orders.map((order) =>
        order?._id === updatedOrder._id ? updatedOrder : order
      )
    );
  };

  const handleEditClick = (order: Order) => {
    if (user.role !== "admin") {
      toast.error("عذراً، لا تملك صلاحية تعديل الطلبات");
      return;
    }
    setEditingOrder(order);
  };

  return (
    <div className="relative">
      {/* Mobile View - Cards */}
      <div className="sm:hidden space-y-3">
        {orders?.map((order) => (
          <div
            key={order?._id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700"
          >
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium text-gray-900 dark:text-white">
                  {order?.customerName}
                </span>
                <span className="text-gray-500 dark:text-gray-400">
                  {order?.totalAmount} ر.س
                </span>
              </div>

              <Link
                to={"/orders/" + order?._id}
                className="text-sm text-gray-500 dark:text-gray-400"
              >
                <p>طريقة الاستلام: {order?.pickupMethod}</p>
                <p className="truncate">
                  العنوان: {order?.pickupMethod === "delivery" ? order?.delivery?.address : "استلام من المتجر"}
                </p>
                <p>
                  التاريخ:{" "}
                  {order?.createdAt
                    ? new Date(order?.createdAt).toLocaleDateString("ar-EG")
                    : "غير متوفر"}
                </p>
              </Link>

              <div className="flex justify-between items-center pt-2">
                <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700">
                  {users.find((user) => user._id === order?.userId)?.username ||
                    "غير مسجل"}
                </span>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditClick(order)}
                    className="text-xs bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 px-2 py-1 rounded"
                  >
                    تعديل
                  </button>
                  <button
                    onClick={() => handleDelete(order?._id || "")}
                    className="text-xs bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-300 px-2 py-1 rounded"
                  >
                    حذف
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View - Table */}
      <div className="hidden sm:block overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-right rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-4 py-3">
                اسم المستخدم
              </th>
              <th scope="col" className="px-4 py-3">
                الاسم
              </th>
              <th scope="col" className="px-4 py-3">
                المبلغ
              </th>
              <th scope="col" className="px-4 py-3">
                طريقة الاستلام
              </th>
              <th scope="col" className="px-4 py-3">
                العنوان
              </th>
              <th scope="col" className="px-4 py-3">
                التاريخ
              </th>
              <th scope="col" className="px-4 py-3">
                الإجراء
              </th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order, index) => (
              <tr
                key={order?._id}
                className={`${
                  index % 2 === 0
                    ? "bg-white dark:bg-gray-900"
                    : "bg-gray-50 dark:bg-gray-800"
                } border-b dark:border-gray-700`}
              >
                <td className="px-4 py-3">
                  {users.find((user) => user._id === order?.userId)?.username ||
                    "غير مسجل"}
                </td>
                <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                  {order?.customerName}
                </td>
                <td className="px-4 py-3">{order?.totalAmount} ر.س</td>
                <td className="px-4 py-3">{order?.pickupMethod}</td>
                <td className="px-4 py-3 max-w-xs truncate">
                  {order?.pickupMethod === "delivery" ? order?.delivery?.address : "استلام من المتجر"}
                </td>
                <td className="px-4 py-3">
                  {order?.createdAt
                    ? new Date(order?.createdAt).toLocaleDateString("ar-EG")
                    : "غير متوفر"}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditClick(order)}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline text-sm"
                    >
                      تعديل
                    </button>
                    <button
                      onClick={() => handleDelete(order?._id || "")}
                      className="font-medium text-red-600 dark:text-red-500 hover:underline text-sm"
                    >
                      حذف
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Order Modal */}
      {editingOrder && (
        <EditOrderForm
          order={editingOrder}
          onClose={() => setEditingOrder(null)}
          onUpdate={handleUpdateOrder}
        />
      )}
    </div>
  );
};

export default OrderTable;
