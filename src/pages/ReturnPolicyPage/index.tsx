import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiCheck, FiX, FiClock, FiShoppingBag, FiGift, FiAlertCircle, FiChevronLeft } from "react-icons/fi";

const ReturnPolicyPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-purple-50 py-6 px-4 sm:px-6 lg:px-8">
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
            className="inline-flex items-center text-purple-600 hover:text-purple-800 transition-colors mb-4"
          >
            <FiChevronLeft className="mr-1" />
            العودة
          </Link>
          
          <div className="text-center bg-white rounded-xl shadow-sm p-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-purple-800 mb-2">
              سياسة الإرجاع والاستبدال
            </h1>
            <div className="inline-flex items-center justify-center bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
              <FiClock className="ml-1" />
              آخر تحديث: {new Date().toLocaleDateString('ar-SA')}
            </div>
          </div>
        </motion.div>

        {/* Policy Content */}
        <motion.div 
          variants={itemVariants}
          className="bg-white rounded-xl shadow-lg overflow-hidden mb-8"
        >
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-6 text-white">
            <div className="flex items-center gap-3 mb-3">
              <FiShoppingBag className="text-2xl" />
              <h2 className="text-2xl font-bold">شروط الإرجاع والاستبدال</h2>
            </div>
            <p className="opacity-90 leading-relaxed">
              نهدف في <span className="font-semibold">سكون</span> إلى تقديم تجربة تسوق ممتعة ومرضية لجميع عملائنا. إذا لم تكن راضيًا عن مشترياتك لأي سبب، يمكنك إرجاع المنتج خلال 14 يومًا من تاريخ الاستلام.
            </p>
          </div>

          <div className="p-6 sm:p-8">
            {/* Eligible Products */}
            <motion.div variants={itemVariants} className="mb-8">
              <div className="flex items-center gap-3 mb-4 p-3 bg-green-50 rounded-lg">
                <div className="bg-green-100 p-2 rounded-full">
                  <FiCheck className="text-green-600 text-xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  المنتجات المؤهلة للإرجاع
                </h3>
              </div>
              <ul className="space-y-3 pl-2">
                <li className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <FiCheck className="text-green-500 mt-0.5 flex-shrink-0" />
                  <span>المنتج في حالته الأصلية (غير مستخدم، مع جميع العلامات والغلاف الأصلي)</span>
                </li>
                <li className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <FiCheck className="text-green-500 mt-0.5 flex-shrink-0" />
                  <span>المنتج في العبوة الأصلية مع جميع الملحقات والوثائق إن وجدت</span>
                </li>
                <li className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <FiCheck className="text-green-500 mt-0.5 flex-shrink-0" />
                  <span>تقديم إثبات الشراء (فاتورة أو إيصال الشراء)</span>
                </li>
              </ul>
            </motion.div>

            {/* Non-Eligible Products */}
            <motion.div variants={itemVariants} className="mb-8">
              <div className="flex items-center gap-3 mb-4 p-3 bg-red-50 rounded-lg">
                <div className="bg-red-100 p-2 rounded-full">
                  <FiX className="text-red-600 text-xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  المنتجات غير المؤهلة للإرجاع
                </h3>
              </div>
              <ul className="space-y-3 pl-2">
                <li className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <FiX className="text-red-500 mt-0.5 flex-shrink-0" />
                  <span>المنتجات المخصصة حسب الطلب</span>
                </li>
                <li className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <FiX className="text-red-500 mt-0.5 flex-shrink-0" />
                  <span>المنتجات القابلة للتلف</span>
                </li>
                <li className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <FiX className="text-red-500 mt-0.5 flex-shrink-0" />
                  <span>المنتجات التي تم فتح عبواتها ولم تعد قابلة لإعادة البيع</span>
                </li>
              </ul>
            </motion.div>

            {/* Return Process */}
            <motion.div variants={itemVariants} className="mb-8">
              <div className="flex items-center gap-3 mb-4 p-3 bg-blue-50 rounded-lg">
                <div className="bg-blue-100 p-2 rounded-full">
                  <FiClock className="text-blue-600 text-xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  عملية الإرجاع
                </h3>
              </div>
              <ol className="space-y-4 pl-2">
                {[
                  "تقديم طلب الإرجاع: قم بتعبئة نموذج طلب الإرجاع من خلال حسابك أو عبر خدمة العملاء خلال 14 يومًا من استلام المنتج.",
                  "تأكيد الطلب: سيتصل بك ممثل خدمة العملاء لتأكيد تفاصيل الإرجاع وتحديد طريقة الاستلام.",
                  "تعبئة المنتج: قم بتغليف المنتج بشكل آمن مع الاحتفاظ بكل الملحقات والوثائق.",
                  "استلام المنتج: سيتم استلام المنتج خلال 3-5 أيام عمل من تأكيد الطلب.",
                  "المعالجة: بعد فحص المنتج، سيتم معالجة طلبك خلال 7 أيام عمل."
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

            {/* Replacement Policy */}
            <motion.div variants={itemVariants} className="mb-8">
              <div className="flex items-center gap-3 mb-4 p-3 bg-purple-50 rounded-lg">
                <div className="bg-purple-100 p-2 rounded-full">
                  <FiGift className="text-purple-600 text-xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  سياسة الاستبدال
                </h3>
              </div>
              <ul className="space-y-3 pl-2">
                <li className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <FiCheck className="text-green-500 mt-0.5 flex-shrink-0" />
                  <span>يمكن استبدال المنتج بمنتج آخر بنفس القيمة أو بقيمة أعلى مع دفع الفرق</span>
                </li>
                <li className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <FiCheck className="text-green-500 mt-0.5 flex-shrink-0" />
                  <span>يجب أن يكون المنتج البديل متوفرًا في المخزن</span>
                </li>
                <li className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <FiCheck className="text-green-500 mt-0.5 flex-shrink-0" />
                  <span>سيتم تطبيق نفس شروط الإرجاع على عملية الاستبدال</span>
                </li>
              </ul>
            </motion.div>

            {/* Important Notes */}
            <motion.div variants={itemVariants} className="bg-purple-50 border-l-4 border-purple-500 p-5 rounded-r-lg">
              <div className="flex items-center gap-3 mb-3">
                <FiAlertCircle className="text-purple-600 text-xl" />
                <h3 className="text-lg font-semibold text-purple-800">
                  ملاحظات مهمة
                </h3>
              </div>
              <ul className="space-y-3 text-purple-700">
                {[
                  "تكلفة الشحن للإرجاع تكون على العميل ما لم يكن السبب خطأ من المتجر",
                  "سيتم رد المبلغ بنفس طريقة الدفع الأصلية خلال 7-14 يوم عمل بعد استلام المنتج",
                  `للاستفسارات، يرجى الاتصال على +966 555 493 517 أو عبر صفحة الاتصال`
                ].map((note, index) => (
                  <li 
                    key={index} 
                    className="flex items-start gap-2 hover:text-purple-800 transition-colors"
                  >
                    <span className="bg-purple-200 text-purple-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5 flex-shrink-0">
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
          <p className="mb-2">شكرًا لاختياركم متجر سكون. نقدّر ثقتكم بنا ونسعى دائمًا لتحسين تجربتكم.</p>
          <p className="text-purple-700 font-medium">
            © {new Date().getFullYear()} سكون. جميع الحقوق محفوظة.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ReturnPolicyPage;