import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useStoreContext } from "../../context/hooks/useStoreContext";
import { Order } from "../../util/types";
import orderService from "../../services/order.service";
import DownloadInvoiceButton from "../../components/InvoiceGenerator";

const OrderConfirmationPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const { products } = useStoreContext();
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Safely find the order with proper type checking
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        let order: Order | undefined = undefined;
        if (orderId) {
          order = await orderService.getOrderById(orderId);
          setIsLoading(false);
        } else {
          setError("الطلب غير موجود");
          setIsLoading(false);
          return;
        }
        if (order) {
          setOrder(order);
          setIsLoading(false);
        } else {
          setError("الطلب غير موجود");
        }
      } catch {
        setError("حدث خطأ في جلب الطلب");
      }
    };
    fetchOrder();
  }, [orderId]);

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

  return (
    <div
      className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8"
      dir="rtl"
    >
      <div className="max-w-3xl mx-auto">
        {/* Success Message */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-2">
            تم تأكيد الطلب بنجاح!
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-400">
            شكرًا لتسوقك معنا. سيتم إرسال تفاصيل الطلب إلى بريدك الإلكتروني.
          </p>
        </div>

        {/* Order Details */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 border-b pb-2">
            تفاصيل الطلب
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                معلومات الطلب
              </h3>
              <div className="space-y-2">
                <p className="text-gray-600 dark:text-gray-300">
                  رقم الطلب:{" "}
                  <span dir="rtl" className="font-medium">
                    {order.orderNumber}#
                  </span>
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  تاريخ الطلب:{" "}
                  {order.createdAt &&
                    new Date(order.createdAt).toLocaleDateString("ar-EG")}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  حالة الطلب:{" "}
                  <span className="px-2 py-1 text-sm rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    تم التأكيد
                  </span>
                </p>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                معلومات العميل
              </h3>
              <div className="space-y-2">
                <p className="text-gray-600 dark:text-gray-300">
                  الاسم: {order.customerName}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  البريد الإلكتروني: {order.customerEmail}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  رقم الهاتف: {order.customerPhone}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
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
                    src={product?.images[0]?.url || "/placeholder-product.webp"}
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
                        المجموع: {(item.price || 0) * (item.quantity || 1)} ر.س
                      </p>
                      <p>
                        {item.dimensionId &&
                          <>
                            المقاس :
                            {" "}
                            {
                              product?.dimensions?.find(
                                (dim) => dim._id == item.dimensionId
                              )?.size.label
                            }
                          </>
                        }
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
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
              <span className="text-gray-600 dark:text-gray-300">الضريبة</span>
              <span className="font-medium">{order.tax} ر.س</span>
            </div>
            <div className="flex justify-between pt-3 border-t">
              <span className="font-bold text-gray-900 dark:text-white">
                المجموع الكلي
              </span>
              <span className="font-bold text-lg">{order.totalAmount} ر.س</span>
            </div>
          </div>

          <div className="mt-6 flex flex-col space-y-3">
            <DownloadInvoiceButton invoiceData={order} />

            <button
              onClick={() => navigate("/")}
              className="border border-teal-600 text-teal-600 hover:bg-teal-50 dark:hover:bg-gray-700 py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
            >
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
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              العودة للرئيسية
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
