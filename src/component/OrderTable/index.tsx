import React from "react";
import { useStoreContext } from "../../context/useContext/useStoreContext";

const OrderTable: React.FC = () => {
  const { orders, users } = useStoreContext();

  // const handleDelete = (id: string) => {
  //   toast.info(
  //     <div>
  //       <p>هل أنت متأكد من أنك تريد حذف هذا الطلب</p>
  //       <div className="flex justify-end mt-2">
  //         <button
  //           onClick={async () => {
  //             const order = await ordersService.delete(id);
  //             if (order)
  //               updateOrders(orders.filter((order) => order._id !== id));
  //             toast.dismiss();
  //             toast.success("تم حذف الطلب بنجاح!");
  //           }}
  //           className="bg-red-500 text-white px-3 py-1 rounded-md mr-2"
  //         >
  //           نعم
  //         </button>
  //         <button
  //           onClick={() => toast.dismiss()}
  //           className="bg-gray-500 text-white px-3 py-1 rounded-md"
  //         >
  //           لا
  //         </button>
  //       </div>
  //     </div>,
  //     {
  //       position: "top-center",
  //       autoClose: false,
  //       closeButton: false,
  //       draggable: false,
  //     }
  //   );
  // };

  // const handleEdit = (order: Order) => {
  //   setEditingOrder(order);
  // };
  // const handleSave = async (updatedOrder: Order) => {
  //   const res = await ordersService.update(updatedOrder, null);
  //   // setProducts(
  //   //   products.map((product) =>
  //   //     product._id === editingProduct?._id
  //   //       ? { ...product, ...updatedProduct }
  //   //       : product
  //   //   )
  //   // );
  //   console.log(res);
  //   setEditingOrder(null);
  //   toast.success("تم تحديث البيانات بنجاح!");
  // };
  // const handleCancel = () => {
  //   setEditingOrder(null);
  // };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-right rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              اسم المستخدم
            </th>
            <th scope="col" className="px-6 py-3">
              الاسم
            </th>
            <th scope="col" className="px-6 py-3">
              المبلغ
            </th>
            <th scope="col" className="px-6 py-3">
              طريقة الاستلام
            </th>
            <th scope="col" className="px-6 py-3">
              العنوان
            </th>
            <th scope="col" className="px-6 py-3">
              التاريخ
            </th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0
                  ? "bg-white dark:bg-gray-900"
                  : "bg-gray-50 dark:bg-gray-800"
              } border-b dark:border-gray-700 border-gray-200`}
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {order.userId
                  ? users.find((user) => (user._id = order.userId))?.username
                  : "غير مسجل"}
              </th>
              <td className="px-6 py-4">{order.customerName}</td>
              <td className="px-6 py-4">{order.totalAmount}</td>
              <td className="px-6 py-4">{order.pickupMethod}</td>
              <td className="px-6 py-4">{order.deliveryAddress}</td>
              <td className="px-6 py-4">
                {order.createdAt
                  ? new Date(order.createdAt).toLocaleDateString("ar-EG")
                  : "غير متوفر"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* {editingOrder && (
        <EditOrderForm
          order={editingOrder}
          onSubmit={handleSave}
          onCancel={handleCancel}
        />
      )} */}
    </div>
  );
};

export default OrderTable;
