import { useState } from "react";
import {
  FiPackage,
  FiTruck,
  FiCheckCircle,
  FiClock,
  FiMapPin,
} from "react-icons/fi";
import orderService from "../../services/order.service";
import { Order } from "../../util/types";

const OrderTrackingPage = () => {
  const [orderId, setOrderId] = useState("");
  const [trackingInfo, setTrackingInfo] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // مراحل تتبع الطلب
  const orderStages = [
    {
      id: 1,
      name: "تم استلام الطلب",
      status: "delivered",
      icon: <FiCheckCircle />,
    },
    { id: 2, name: "جاري التحضير", status: "pending", icon: <FiPackage /> },
    { id: 3, name: "جاري الشحن", status: "processing", icon: <FiTruck /> },
    { id: 4, name: "في الطريق", status: "shipped", icon: <FiMapPin /> },
  ];
  //   'pending',
  //   'confirmed',
  //   'processing',
  //   'shipped',
  //   'delivered',
  //   'cancelled',
  // بيانات الطلب الافتراضية

  // محاكاة البحث عن الطلب
  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const order = await orderService.getOrderByOrderNumber(orderId);
      setTrackingInfo(order);
    } catch {
      setError("رقم الطلب غير صحيح. يرجى المحاولة مرة أخرى");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* عنوان الصفحة */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-purple-900 mb-2">تتبع طلبك</h1>
          <p className="text-gray-600">ادخل رقم الطلب لمتابعة حالة شحنك</p>
        </div>

        {/* نموذج تتبع الطلب */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <form
            onSubmit={handleTrackOrder}
            className="flex flex-col md:flex-row gap-4"
          >
            <div className="flex-grow">
              <input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="أدخل رقم الطلب (مثال: SKN2023)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                required
              />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-purple-800 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-70"
            >
              {isLoading ? "جاري البحث..." : "تتبع الطلب"}
            </button>
          </form>
        </div>

        {/* نتائج تتبع الطلب */}
        {trackingInfo && (
          <div className="space-y-8">
            {/* معلومات الطلب الأساسية */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-gray-500 text-sm mb-1">رقم الطلب</h3>
                  <p className="font-bold text-purple-900">
                    {trackingInfo.orderNumber}
                  </p>
                </div>
                <div>
                  <h3 className="text-gray-500 text-sm mb-1">تاريخ الطلب</h3>
                  <p className="font-medium">
                    {trackingInfo?.createdAt &&
                      new Date(trackingInfo.createdAt).toDateString()}
                  </p>
                </div>
                <div>
                  <h3 className="text-gray-500 text-sm mb-1">
                    المبلغ الإجمالي
                  </h3>
                  <p className="font-bold text-lg text-purple-900">
                    {trackingInfo.totalAmount}
                  </p>
                </div>
              </div>
            </div>

            {/* مراحل تتبع الطلب */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-purple-900 mb-6">
                حالة الشحن
              </h2>

              <div className="relative">
                {/* خط التتبع */}
                <div className="absolute top-5 left-4 h-[85%] w-0.5 bg-gray-200 md:left-1/2 md:-translate-x-1/2 md:w-[80%] md:h-0.5 md:top-1/2"></div>

                <div className="space-y-8 md:grid md:grid-cols-5 md:space-y-0 md:gap-4">
                  {orderStages.map((stage) => (
                    <div
                      key={stage.id}
                      className="relative z-10 flex items-start md:flex-col md:items-center"
                    >
                      {/* أيقونة المرحلة */}
                      <div
                        className={`flex items-center justify-center w-10 h-10 rounded-full ${
                          stage.status === "completed"
                            ? "bg-green-100 text-green-600"
                            : stage.status === trackingInfo.status
                            ? "bg-purple-100 text-purple-600"
                            : "bg-gray-100 text-gray-400"
                        } ml-4 md:ml-0 md:mb-3`}
                      >
                        {stage.icon}
                      </div>

                      {/* تفاصيل المرحلة */}
                      <div className="flex-1 md:text-center">
                        <h3
                          className={`font-medium ${
                            stage.status === trackingInfo.status
                              ? "text-purple-900"
                              : "text-gray-700"
                          }`}
                        >
                          {stage.name}
                        </h3>
                        {stage.status === trackingInfo.status && (
                          <p className="text-sm text-gray-500 mt-1 flex items-center">
                            <FiClock className="ml-1" /> جاري التجهيز
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* تفاصيل الطلب */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                {/* العناصر المطلوبة */}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-purple-900 mb-4">
                    المنتجات المطلوبة
                  </h2>
                  <div className="space-y-4">
                    {trackingInfo.items.map((item, index: number) => (
                      <div
                        key={index}
                        className="flex justify-between pb-4 border-b border-gray-100 last:border-0 last:pb-0"
                      >
                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-gray-500">
                            الكمية: {item.quantity}
                          </p>
                        </div>
                        <p className="text-purple-900 font-medium">
                          {item.price}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* عنوان الشحن */}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-purple-900 mb-4">
                    عنوان التسليم
                  </h2>
                  <div className="flex items-start">
                    <div className="bg-purple-100 text-purple-600 p-2 rounded-lg ml-4">
                      <FiMapPin className="text-lg" />
                    </div>
                    <div>
                      <p className="font-medium">
                        {trackingInfo.delivery.city +
                          "-" +
                          trackingInfo.delivery.state +
                          "-" +
                          trackingInfo.delivery.address}
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                        سيتم التسليم خلال 3-5 أيام عمل
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* معلومات الاتصال */}
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <h2 className="text-xl font-bold text-purple-900 mb-2">
                هل تحتاج مساعدة؟
              </h2>
              <p className="text-gray-600 mb-4">
                فريق خدمة العملاء لدينا مستعد لمساعدتك على مدار الساعة
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href="tel:+966123456789"
                  className="bg-purple-800 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  اتصل بنا: 920000000
                </a>
                <a
                  href="mailto:info@sakoon.com"
                  className="border border-purple-800 text-purple-800 hover:bg-purple-50 px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  راسلنا عبر البريد
                </a>
              </div>
            </div>
          </div>
        )}

        {/* تعليمات للمستخدمين */}
        {!trackingInfo && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-purple-900 mb-4">
              كيف تتبع طلبك؟
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: "📧",
                  title: "ابحث عن رقم الطلب",
                  description:
                    "ستجد رقم الطلب في رسالة التأكيد التي أرسلناها إلى بريدك الإلكتروني",
                },
                {
                  icon: "🔍",
                  title: "أدخل رقم الطلب",
                  description:
                    'اكتب رقم الطلب في الحقل أعلاه واضغط على زر "تتبع الطلب"',
                },
                {
                  icon: "📱",
                  title: "تابع حالة طلبك",
                  description: "ستظهر لك جميع تفاصيل الطلب وحالة الشحن الحالية",
                },
              ].map((item, index) => (
                <div key={index} className="bg-gray-50 p-5 rounded-lg">
                  <div className="text-2xl mb-3">{item.icon}</div>
                  <h3 className="font-bold text-purple-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderTrackingPage;
