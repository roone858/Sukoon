import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiFileText, FiAlertCircle, FiShoppingCart, FiUser, FiCreditCard, FiShield, FiChevronLeft } from "react-icons/fi";

const TermsAndConditionsPage = () => {
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-amber-50 py-6 px-4 sm:px-6 lg:px-8">
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
            className="inline-flex items-center text-amber-600 hover:text-amber-800 transition-colors mb-4"
          >
            <FiChevronLeft className="mr-1" />
            العودة
          </Link>
          
          <div className="text-center bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-center gap-3 mb-3">
              <FiFileText className="text-3xl text-amber-600" />
              <h1 className="text-3xl sm:text-4xl font-bold text-amber-800">
                الشروط والأحكام
              </h1>
            </div>
            <div className="inline-flex items-center justify-center bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm">
              آخر تحديث: {new Date().toLocaleDateString('ar-SA')}
            </div>
          </div>
        </motion.div>

        {/* Policy Content */}
        <motion.div 
          variants={itemVariants}
          className="bg-white rounded-xl shadow-lg overflow-hidden mb-8"
        >
          {/* Introduction */}
          <div className="bg-gradient-to-r from-amber-600 to-amber-800 p-6 text-white">
            <div className="flex items-center gap-3 mb-3">
              <FiFileText className="text-2xl" />
              <h2 className="text-2xl font-bold">شروط استخدام الموقع</h2>
            </div>
            <p className="opacity-90 leading-relaxed">
              يرجى قراءة هذه الشروط والأحكام بعناية قبل استخدام موقع <span className="font-semibold">سكون</span>. باستخدامك للموقع، فإنك توافق على الالتزام بهذه الشروط.
            </p>
          </div>

          <div className="p-6 sm:p-8">
            {/* General Terms */}
            <motion.div variants={itemVariants} className="mb-8">
              <div className="flex items-center gap-3 mb-4 p-3 bg-amber-50 rounded-lg">
                <div className="bg-amber-100 p-2 rounded-full">
                  <FiAlertCircle className="text-amber-600 text-xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  الشروط العامة
                </h3>
              </div>
              
              <ul className="space-y-4 pl-2">
                {[
                  "يجب أن تكون 18 سنة على الأقل لاستخدام هذا الموقع أو لديك موافقة الوالدين/الوصي",
                  "أنت مسؤول عن الحفاظ على سرية معلومات حسابك وكلمة المرور",
                  "نحتفظ بالحق في رفض الخدمة لأي شخص في أي وقت لأي سبب",
                  "نحتفظ بالحق في تعديل هذه الشروط في أي وقت دون إشعار مسبق",
                  "يجب عدم استخدام منتجاتنا لأغراض غير قانونية أو غير مصرح بها"
                ].map((term, index) => (
                  <li 
                    key={index} 
                    className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="bg-gray-100 text-gray-800 font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
                      {index + 1}
                    </div>
                    <span>{term}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Orders and Payments */}
            <motion.div variants={itemVariants} className="mb-8">
              <div className="flex items-center gap-3 mb-4 p-3 bg-amber-50 rounded-lg">
                <div className="bg-amber-100 p-2 rounded-full">
                  <FiShoppingCart className="text-amber-600 text-xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  الطلبات والدفع
                </h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                {/* Order Process */}
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-2">
                    <FiShoppingCart className="text-amber-500" />
                    <h4 className="font-bold text-gray-800">عملية الطلب</h4>
                  </div>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>الأسعار المعروضة قابلة للتغيير دون إشعار</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>نحتفظ بالحق في رفض أو إلغاء أي طلب</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>يجب مراجعة تفاصيل الطلب قبل التأكيد</span>
                    </li>
                  </ul>
                </div>
                
                {/* Payment Info */}
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-2">
                    <FiCreditCard className="text-amber-500" />
                    <h4 className="font-bold text-gray-800">معلومات الدفع</h4>
                  </div>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>نحن نستخدم أنظمة دفع آمنة وموثوقة</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>يجب أن تكون معلومات الدفع دقيقة وكاملة</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>قد تخضع بعض طرق الدفع لرسوم إضافية</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* User Responsibilities */}
            <motion.div variants={itemVariants} className="mb-8">
              <div className="flex items-center gap-3 mb-4 p-3 bg-amber-50 rounded-lg">
                <div className="bg-amber-100 p-2 rounded-full">
                  <FiUser className="text-amber-600 text-xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  مسؤوليات المستخدم
                </h3>
              </div>
              <div className="bg-amber-50 p-4 rounded-lg">
                <ul className="space-y-3 text-amber-700">
                  {[
                    "توفير معلومات دقيقة وصحيحة عند التسجيل وعمل الطلبات",
                    "الحفاظ على سرية معلومات الحساب",
                    "الإبلاغ فورًا عن أي استخدام غير مصرح للحساب",
                    "عدم استخدام الموقع لأغراض غير قانونية أو غير أخلاقية",
                    "احترام حقوق الملكية الفكرية للموقع ومحتواه"
                  ].map((responsibility, index) => (
                    <li 
                      key={index} 
                      className="flex items-start gap-2 hover:text-amber-800 transition-colors"
                    >
                      <span className="bg-amber-200 text-amber-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5 flex-shrink-0">
                        {index + 1}
                      </span>
                      <span>{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Limitation of Liability */}
            <motion.div variants={itemVariants} className="mb-8">
              <div className="flex items-center gap-3 mb-4 p-3 bg-amber-50 rounded-lg">
                <div className="bg-amber-100 p-2 rounded-full">
                  <FiShield className="text-amber-600 text-xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  حدود المسؤولية
                </h3>
              </div>
              <div className="bg-white border border-amber-200 rounded-lg p-4">
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>لا نتحمل مسؤولية أي أضرار غير مباشرة أو عرضية أو تبعية ناتجة عن استخدام الموقع</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>نحن غير مسؤولين عن أي تأخير في التسليم بسبب ظروف خارجة عن إرادتنا</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>نحن نضمن أن المنتجات مطابقة للوصف، ولكن لا نتحمل مسؤولية الاستخدام غير المقصود</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Governing Law */}
            <motion.div variants={itemVariants} className="bg-amber-50 border-l-4 border-amber-500 p-5 rounded-r-lg">
              <div className="flex items-center gap-3 mb-3">
                <FiAlertCircle className="text-amber-600 text-xl" />
                <h3 className="text-lg font-semibold text-amber-800">
                  القانون الحاكم وتعديلات الشروط
                </h3>
              </div>
              <ul className="space-y-3 text-amber-700">
                <li className="flex items-start gap-2">
                  <span className="bg-amber-200 text-amber-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5 flex-shrink-0">
                    1
                  </span>
                  <span>هذه الشروط تخضع لقوانين المملكة العربية السعودية</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-amber-200 text-amber-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5 flex-shrink-0">
                    2
                  </span>
                  <span>نحتفظ بالحق في تعديل هذه الشروط في أي وقت، وسيتم نشر التحديثات على هذه الصفحة</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-amber-200 text-amber-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5 flex-shrink-0">
                    3
                  </span>
                  <span>لأية استفسارات حول الشروط والأحكام، يرجى الاتصال بنا على <a href="tel:+966555493517" className="font-semibold hover:underline">+966 555 493 517</a></span>
                </li>
              </ul>
            </motion.div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div 
          variants={itemVariants}
          className="text-center text-gray-600 text-sm bg-white rounded-xl shadow-sm p-6"
        >
          <p className="mb-2">باستخدامك لموقع سكون، فإنك توافق على الالتزام بهذه الشروط والأحكام.</p>
          <p className="text-amber-700 font-medium">
            © {new Date().getFullYear()} سكون. جميع الحقوق محفوظة.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default TermsAndConditionsPage;