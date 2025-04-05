import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FiTruck,
  FiClock,
  FiMapPin,
  FiBox,
  FiAlertCircle,
  FiChevronLeft,
} from "react-icons/fi";

const ShippingPolicyPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 py-6 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-4xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header with back button */}
        <motion.div variants={itemVariants} className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-4"
          >
            <FiChevronLeft className="mr-1" />
            العودة
          </Link>

          <div className="text-center bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-center gap-3 mb-3">
              <FiTruck className="text-3xl text-blue-600" />
              <h1 className="text-3xl sm:text-4xl font-bold text-blue-800">
                سياسة الشحن والتسليم
              </h1>
            </div>
            <div className="inline-flex items-center justify-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              <FiClock className="ml-1" />
              آخر تحديث: {new Date().toLocaleDateString("ar-SA")}
            </div>
          </div>
        </motion.div>

        {/* Policy Content */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-xl shadow-lg overflow-hidden mb-8"
        >
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
            <div className="flex items-center gap-3 mb-3">
              <FiTruck className="text-2xl" />
              <h2 className="text-2xl font-bold">معلومات الشحن والتسليم</h2>
            </div>
            <p className="opacity-90 leading-relaxed">
              نحرص في <span className="font-semibold">سكون</span> على توصيل
              طلباتكم بأسرع وقت ممكن وبأعلى معايير الجودة. نوفر عدة خيارات شحن
              لتناسب احتياجاتكم.
            </p>
          </div>

          <div className="p-6 sm:p-8">
            {/* Shipping Options */}
            <motion.div variants={itemVariants} className="mb-8">
              <div className="flex items-center gap-3 mb-4 p-3 bg-blue-50 rounded-lg">
                <div className="bg-blue-100 p-2 rounded-full">
                  <FiTruck className="text-blue-600 text-xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  خيارات الشحن المتاحة
                </h3>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-4">
                {/* Standard Shipping */}
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-2">
                    <FiBox className="text-blue-500" />
                    <h4 className="font-bold text-gray-800">الشحن العادي</h4>
                  </div>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>مدة التوصيل: 3-5 أيام عمل</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>تكلفة الشحن: 15 ريال</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>توصيل لجميع مناطق المملكة</span>
                    </li>
                  </ul>
                </div>

                {/* Express Shipping */}
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-2">
                    <FiTruck className="text-green-500" />
                    <h4 className="font-bold text-gray-800">الشحن السريع</h4>
                  </div>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>مدة التوصيل: 1-2 أيام عمل</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>تكلفة الشحن: 30 ريال</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>متاح للمدن الرئيسية فقط</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Delivery Process */}
            <motion.div variants={itemVariants} className="mb-8">
              <div className="flex items-center gap-3 mb-4 p-3 bg-blue-50 rounded-lg">
                <div className="bg-blue-100 p-2 rounded-full">
                  <FiMapPin className="text-blue-600 text-xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  عملية التوصيل
                </h3>
              </div>
              <ol className="space-y-4 pl-2">
                {[
                  "تأكيد الطلب: بعد إتمام الشراء، ستصلك رسالة تأكيد على البريد الإلكتروني أو الجوال",
                  "تجهيز الطلب: نقوم بتجهيز الطلب خلال 24-48 ساعة من وقت الشراء (أيام العمل فقط)",
                  "الشحن: بمجرد شحن الطلب، ستصلك رسالة تحتوي على رقم التتبع",
                  "التوصيل: سيتم توصيل الطلب إلى العنوان المحدد خلال المدة المذكورة حسب نوع الشحن",
                  "استلام الطلب: يمكنك تتبع شحنتك عبر الرابط المرفق في رسالة الشحن",
                ].map((step, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="bg-gray-100 text-gray-800 font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
                      {index + 1}
                    </div>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </motion.div>

            {/* Delivery Areas */}
            <motion.div variants={itemVariants} className="mb-8">
              <div className="flex items-center gap-3 mb-4 p-3 bg-blue-50 rounded-lg">
                <div className="bg-blue-100 p-2 rounded-full">
                  <FiMapPin className="text-blue-600 text-xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  مناطق التوصيل
                </h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-800 mb-2">
                    المدن الرئيسية
                  </h4>
                  <ul className="space-y-1 text-gray-700">
                    {[
                      "الرياض",
                      "جدة",
                      "مكة المكرمة",
                      "المدينة المنورة",
                      "الدمام",
                      "الخبر",
                      "الطائف",
                    ].map((city) => (
                      <li key={city} className="flex items-center gap-2">
                        <span className="text-blue-500">•</span>
                        <span>{city}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-800 mb-2">مدن أخرى</h4>
                  <p className="text-gray-700 mb-2">
                    نقوم بالتوصيل لجميع مدن المملكة مع اختلاف مدة التوصيل حسب
                    الموقع.
                  </p>
                  <p className="text-sm text-gray-600">
                    للاستفسار عن توفر الشحن لمدينتك، يرجى التواصل معنا.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Important Notes */}
            <motion.div
              variants={itemVariants}
              className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-lg"
            >
              <div className="flex items-center gap-3 mb-3">
                <FiAlertCircle className="text-blue-600 text-xl" />
                <h3 className="text-lg font-semibold text-blue-800">
                  ملاحظات مهمة
                </h3>
              </div>
              <ul className="space-y-3 text-blue-700">
                {[
                  "مواعيد العمل لدينا من الأحد إلى الخميس من 9 صباحًا إلى 5 مساءً",
                  "لا يتم الشحن أيام الجمعة والعطلات الرسمية",
                  "في حال عدم وجود المستلم، سيتم إعادة الشحنة إلى أقرب فرع وسيتم التواصل معك",
                  "للتغيير في عنوان الشحن، يرجى التواصل معنا خلال 3 ساعات من تقديم الطلب",
                  "للاستفسارات: يرجى الاتصال على +966 555 493 517 أو عبر صفحة الاتصال",
                ].map((note, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 hover:text-blue-800 transition-colors"
                  >
                    <span className="bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5 flex-shrink-0">
                      {index + 1}
                    </span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          variants={itemVariants}
          className="text-center text-gray-600 text-sm bg-white rounded-xl shadow-sm p-6"
        >
          <p className="mb-2">
            نحن نعمل جاهدين لتوصيل طلباتكم في أسرع وقت ممكن وبأفضل جودة.
          </p>
          <p className="text-blue-700 font-medium">
            © {new Date().getFullYear()} سكون. جميع الحقوق محفوظة.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ShippingPolicyPage;
