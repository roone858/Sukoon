import React from "react";
import { useParams } from "react-router-dom";
import { useStoreContext } from "../../context/useContext/useStoreContext";
import { Order } from "../../util/types"; // Import your Order type

const OrderDetails = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { orders, products } = useStoreContext();

  // Safely find the order with proper type checking
  const order = orders.find((order: Order) => order._id === orderId);

  if (!order) {
    return (
      <div className="p-6 text-center dark:bg-gray-900 min-h-screen">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          الطلب غير موجود
        </h1>
      </div>
    );
  }

  // Type-safe order with default values for optional fields
  const safeOrder: Order = {
    _id: order._id,
    orderNumber: order.orderNumber || `#${order._id.slice(-6)}`,
    createdAt: order.createdAt || new Date().toISOString(),
    status: order.status || "قيد المعالجة",
    items: order.items || [],
    subtotal: order.subtotal || 0,
    shippingFee: order.shippingFee || 0,
    discount: order.discount || 0,
    totalAmount: order.totalAmount || 0,
    pickupMethod: order.pickupMethod || "التوصيل المنزلي",
    deliveryAddress: order.deliveryAddress || "غير محدد",
    paymentMethod: order.paymentMethod || "الدفع عند الاستلام",
    paymentStatus: order.paymentStatus || "غير مدفوع",
    notes: order.notes || "",
    trackingNumber: order.trackingNumber || "",
  };

  return (
    <div className="p-4 md:p-6 dark:bg-gray-900 min-h-screen" dir="rtl">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
            تفاصيل الطلب {safeOrder.orderNumber}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            تاريخ الطلب:{" "}
            {new Date(safeOrder.createdAt).toLocaleDateString("ar-EG")}
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              safeOrder.status === "تم التسليم"
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                : safeOrder.status === "قيد التوصيل"
                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
            }`}
          >
            {safeOrder.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Summary */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 md:p-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 border-b pb-2">
              المنتجات
            </h2>

            <div className="space-y-4">
              {safeOrder.items.map((item, index) => {
                const product = products.find(
                  (product) => product._id == item.productId
                );
                return (
                  <div key={index} className="flex border-b pb-4 last:border-0">
                    <img
                      src={product?.images[0] || "/placeholder-product?.png"}
                      alt={product?.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="mr-4 flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {product?.name || "منتج غير معروف"}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {product?.category || "بدون تصنيف"}
                      </p>
                      <p className="text-sm mt-1">
                        الكمية: {item.quantity || 1}
                      </p>
                    </div>
                    <div className="text-left">
                      <p className="font-medium">
                        {(product?.price || 0) * (item.quantity || 1)} ر.س
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Notes */}
            {safeOrder.notes && (
              <div className="mt-6 pt-4 border-t">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                  ملاحظات الطلب
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {safeOrder.notes}
                </p>
              </div>
            )}
          </div>

          {/* Shipping Info */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 md:p-6 mt-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 border-b pb-2">
              معلومات الشحن
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                  طريقة الاستلام
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {safeOrder.pickupMethod}
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                  عنوان التوصيل
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {safeOrder.deliveryAddress}
                </p>
              </div>
              {safeOrder.trackingNumber && (
                <div className="md:col-span-2">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                    رقم التتبع
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {safeOrder.trackingNumber}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Order Summary Card */}
        <div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 md:p-6 sticky top-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 border-b pb-2">
              ملخص الطلب
            </h2>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">
                  المجموع الفرعي
                </span>
                <span className="font-medium">{safeOrder.subtotal} ر.س</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">
                  رسوم الشحن
                </span>
                <span className="font-medium">{safeOrder.shippingFee} ر.س</span>
              </div>
              {safeOrder.discount > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">
                    الخصم
                  </span>
                  <span className="font-medium text-green-600 dark:text-green-400">
                    -{safeOrder.discount} ر.س
                  </span>
                </div>
              )}
              <div className="flex justify-between pt-3 border-t">
                <span className="font-bold text-gray-900 dark:text-white">
                  المجموع الكلي
                </span>
                <span className="font-bold text-lg">
                  {safeOrder.totalAmount} ر.س
                </span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                طريقة الدفع
              </h3>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mr-2">
                  {safeOrder.paymentMethod === "الدفع عند الاستلام" ? (
                    <svg
                      className="w-5 h-5 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                      />
                    </svg>
                  )}
                </div>
                <span className="text-gray-600 dark:text-gray-300">
                  {safeOrder.paymentMethod}
                </span>
              </div>
              {safeOrder.paymentStatus && (
                <div className="mt-2">
                  <span
                    className={`text-sm px-2 py-1 rounded ${
                      safeOrder.paymentStatus === "مدفوع"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                    }`}
                  >
                    {safeOrder.paymentStatus}
                  </span>
                </div>
              )}
            </div>

            <div className="mt-6 flex flex-col space-y-3">
              {safeOrder.trackingNumber && (
                <button className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded transition-colors">
                  تتبع الشحنة
                </button>
              )}
              <button className="border border-teal-600 text-teal-600 hover:bg-teal-50 dark:hover:bg-gray-700 py-2 px-4 rounded transition-colors">
                طباعة الفاتورة
              </button>
              {safeOrder.status !== "ملغي" && (
                <button className="border border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-gray-700 py-2 px-4 rounded transition-colors">
                  إلغاء الطلب
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
