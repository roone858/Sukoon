import { useParams } from "react-router-dom";
import { useStoreContext } from "../../context/hooks/useStoreContext";
import { Order } from "../../util/types";
import { useState, useEffect } from "react";
import DownloadInvoiceButton from "../../components/InvoiceGenerator";

const OrderDetails = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { orders, products } = useStoreContext();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Safely find the order with proper type checking
  const order = orders.find((order: Order) => order._id === orderId);

  useEffect(() => {
    if (order) {
      setIsLoading(false);
    } else {
      setError("الطلب غير موجود");
      setIsLoading(false);
    }
  }, [order]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="p-6 text-center dark:bg-gray-900 min-h-screen">
        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">
            {error || "الطلب غير موجود"}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            يرجى التحقق من رقم الطلب والمحاولة مرة أخرى
          </p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "processing":
      case "shipped":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "delivered":
        return "تم التسليم";
      case "processing":
        return "قيد المعالجة";
      case "shipped":
        return "تم الشحن";
      case "cancelled":
        return "ملغي";
      case "confirmed":
        return "تم التأكيد";
      default:
        return "معلق";
    }
  };

  return (
    <div className="p-4 md:p-6 dark:bg-gray-900 min-h-screen" dir="rtl">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
            تفاصيل الطلب #{order.orderNumber}
          </h1>
          <div className="flex flex-wrap gap-2 items-center">
            <p className="text-gray-600 dark:text-gray-400">
              تاريخ الطلب:{" "}
              {order.createdAt &&
                new Date(order.createdAt).toLocaleDateString("ar-EG")}
            </p>
            <span className="text-gray-400">•</span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                order.status || ""
              )}`}
            >
              {getStatusText(order.status || "")}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Summary */}
        <div className="lg:col-span-2 space-y-6">
          {/* Products */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 md:p-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 border-b pb-2">
              المنتجات
            </h2>

            <div className="space-y-4">
              {order.items.map((item, index) => {
                const product = products.find(
                  (product) => product.id === item.productId
                );
                return (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row gap-4 border-b pb-4 last:border-0"
                  >
                    <img
                      src={
                        product?.images[0]?.url || "/placeholder-product.webp"
                      }
                      alt={product?.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {product?.name || "منتج غير معروف"}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {product?.categories || "بدون تصنيف"}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-4">
                        <p className="text-sm">الكمية: {item.quantity || 1}</p>
                        <p className="text-sm">السعر: {item.price || 0} ر.س</p>
                        <p className="text-sm font-medium">
                          المجموع: {(item.price || 0) * (item.quantity || 1)}{" "}
                          ر.س
                        </p>
                        <p className="text-sm font-medium">
                          المقاس:{" "}
                          {
                            product?.dimensions?.find(
                              (d) => d._id == item.dimensionId
                            )?.size.label || "غير محدد"
                          }{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Notes */}
            {order.notes && (
              <div className="mt-6 pt-4 border-t">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                  ملاحظات الطلب
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {order.notes}
                </p>
              </div>
            )}
          </div>

          {/* Delivery Info */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 md:p-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 border-b pb-2">
              معلومات التوصيل
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                  طريقة الاستلام
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {order.pickupMethod === "delivery"
                    ? "توصيل"
                    : "استلام من المتجر"}
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                  معلومات العميل
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {order.customerName}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  {order.customerPhone}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  {order.customerEmail}
                </p>
              </div>
              {order.pickupMethod === "delivery" && (
                <div className="md:col-span-2">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                    عنوان التوصيل
                  </h3>
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                    <p className="text-gray-600 dark:text-gray-300">
                      {order.delivery.address}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      {order.delivery.city}, {order.delivery.state}{" "}
                      {order.delivery.postalCode}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      {order.delivery.country}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Order Summary Card */}
        <div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 md:p-6 sticky top-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 border-b pb-2">
              ملخص الطلب
            </h2>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">
                  المجموع الفرعي
                </span>
                <span className="font-medium">{order.subtotal} ر.س</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">
                  رسوم الشحن
                </span>
                <span className="font-medium">{order.shippingCost} ر.س</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">
                  الضريبة
                </span>
                <span className="font-medium">{order.tax} ر.س</span>
              </div>
              <div className="flex justify-between pt-3 border-t">
                <span className="font-bold text-gray-900 dark:text-white">
                  المجموع الكلي
                </span>
                <span className="font-bold text-lg">
                  {order.totalAmount} ر.س
                </span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                معلومات الدفع
              </h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mr-2">
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
                  </div>
                  <span className="text-gray-600 dark:text-gray-300">
                    {order.payment.method === "cash"
                      ? "دفع نقدي"
                      : "بطاقة ائتمان"}
                  </span>
                </div>
                <div>
                  <span
                    className={`text-sm px-2 py-1 rounded ${
                      order.payment.status === "completed"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                    }`}
                  >
                    {order.payment.status === "completed"
                      ? "تم الدفع"
                      : "قيد المعالجة"}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col space-y-3">
              <DownloadInvoiceButton invoiceData={order} />

              {order.status !== "cancelled" && (
                <button className="border border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-gray-700 py-2 px-4 rounded-lg transition-colors flex items-center justify-center">
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
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
