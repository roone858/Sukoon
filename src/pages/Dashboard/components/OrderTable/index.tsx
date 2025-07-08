import React, { useState } from "react";
import { useStoreContext } from "../../../../context/hooks/useStoreContext";
import { useAuthContext } from "../../../../context/hooks/useAuthContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Order } from "../../../../util/types";
import EditOrderForm from "../../../../component/EditOrderForm";
import orderService from "../../../../services/order.service";
// import ordersService from "../../services/orders.service";

const OrderTable: React.FC = () => {
  const { orders, users, updateOrders } = useStoreContext();
  const { user } = useAuthContext();
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);

  const handleDelete = async (id: string) => {
    if (user && user.role !== "admin") {
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

  const handleEditClick = (order: Order) => {
    if (user && user.role !== "admin") {
      toast.error("عذراً، لا تملك صلاحية تعديل الطلبات");
      return;
    }
    setEditingOrder(order);
  };

  return (
    <div className="relative">
      {/* Mobile View - Cards */}
      <div className="sm:hidden space-y-3 ">
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
                  العنوان:{" "}
                  {order?.pickupMethod === "delivery"
                    ? order?.delivery?.address
                    : "استلام من المتجر"}
                </p>
                <p>
                  التاريخ:{" "}
                  {order?.createdAt ? (
                    <>
                      {" "}
                      {new Date(order?.createdAt).toLocaleDateString()}{" "}
                      {/* Date only */}{" - "}
                      {new Date(order?.createdAt).toLocaleTimeString()}{" "}
                      {/* Time only */}
                    </>
                  ) : (
                    "غير متوفر"
                  )}
                </p>
                <p
                  className={`px-4 py-2 mt-2 ${
                    order?.status === "pending"
                      ? "text-yellow-600 bg-yellow-100"
                      : order?.status === "confirmed"
                      ? "text-blue-600 bg-blue-100"
                      : order?.status === "processing"
                      ? "text-indigo-600 bg-indigo-100"
                      : order?.status === "shipped"
                      ? "text-purple-600 bg-purple-100"
                      : order?.status === "delivered"
                      ? "text-green-600 bg-green-100"
                      : order?.status === "cancelled"
                      ? "text-red-600 bg-red-100"
                      : "text-gray-600 bg-gray-100"
                  } rounded-xl text-center`}
                >
                  {order?.status}
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
              <th scope="col" className="px-4 py-2 text-center">
                اسم المستخدم
              </th>
              <th scope="col" className="px-4 py-2 text-center">
                الاسم
              </th>
              <th scope="col" className="px-4 py-2 text-center">
                المبلغ
              </th>
              <th scope="col" className="px-4 py-2 text-center">
                طريقة الاستلام
              </th>
              <th scope="col" className="px-4 py-2 text-center">
                الحالة
              </th>
              <th scope="col" className="px-4 py-2 text-center">
                العنوان
              </th>
              <th scope="col" className="px-4 py-2 text-center">
                التاريخ
              </th>
              <th scope="col" className="px-4 py-2 text-center">
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
                <td className="px-4 py-2">
                  {users.find((user) => user._id === order?.userId)?.username ||
                    "غير مسجل"}
                </td>
                <td className="px-4 py-2 font-medium text-gray-900 dark:text-white">
                  {order?.customerName}
                </td>
                <td className="px-4 py-2">{order?.totalAmount} ر.س</td>
                <td className="px-4 py-2">{order?.pickupMethod}</td>
                <td
                  className={`px-4 py-2 ${
                    order?.status === "pending"
                      ? "text-yellow-600 bg-yellow-100"
                      : order?.status === "confirmed"
                      ? "text-blue-600 bg-blue-100"
                      : order?.status === "processing"
                      ? "text-indigo-600 bg-indigo-100"
                      : order?.status === "shipped"
                      ? "text-purple-600 bg-purple-100"
                      : order?.status === "delivered"
                      ? "text-green-600 bg-green-100"
                      : order?.status === "cancelled"
                      ? "text-red-600 bg-red-100"
                      : "text-gray-600 bg-gray-100"
                  } rounded-xl text-center`}
                >
                  {order?.status}
                </td>
                <td className="px-4 py-2 max-w-xs truncate">
                  {order?.pickupMethod === "delivery"
                    ? order?.delivery?.address
                    : "استلام من المتجر"}
                </td>
                <td className="px-4 py-2">
                  {order?.createdAt
                    ?   <>
                      {" "}
                      {new Date(order?.createdAt).toLocaleDateString()}{" "}
                      {/* Date only */}{" - "}
                      {new Date(order?.createdAt).toLocaleTimeString()}{" "}
                      {/* Time only */}
                    </>
                    : "غير متوفر"}
                </td>
                <td className="px-4 py-2">
                  <div className="flex gap-2">
                    <button>
                      <Link
                        to={"/orders/" + order?._id}
                        className="font-medium text-green-600 dark:text-green-500 hover:underline text-sm"
                      >
                        عرض
                      </Link>
                    </button>

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
        />
      )}
    </div>
  );
};

export default OrderTable;
