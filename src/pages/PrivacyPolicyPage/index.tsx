import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiLock, FiShield, FiUser, FiMail, FiCreditCard, FiAlertTriangle, FiChevronLeft } from "react-icons/fi";

const PrivacyPolicyPage = () => {
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-indigo-50 py-6 px-4 sm:px-6 lg:px-8">
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
            className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition-colors mb-4"
          >
            <FiChevronLeft className="mr-1" />
            العودة
          </Link>
          
          <div className="text-center bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-center gap-3 mb-3">
              <FiLock className="text-3xl text-indigo-600" />
              <h1 className="text-3xl sm:text-4xl font-bold text-indigo-800">
                سياسة الخصوصية
              </h1>
            </div>
            <div className="inline-flex items-center justify-center bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
              فعالة من: {new Date().toLocaleDateString('ar-SA')}
            </div>
          </div>
        </motion.div>

        {/* Policy Content */}
        <motion.div 
          variants={itemVariants}
          className="bg-white rounded-xl shadow-lg overflow-hidden mb-8"
        >
          {/* Introduction */}
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 p-6 text-white">
            <div className="flex items-center gap-3 mb-3">
              <FiShield className="text-2xl" />
              <h2 className="text-2xl font-bold">حماية بياناتك مهمتنا</h2>
            </div>
            <p className="opacity-90 leading-relaxed">
              في <span className="font-semibold">سكون</span>، نعتبر خصوصيتك وحماية بياناتك الشخصية من أهم أولوياتنا. هذه السياسة توضح كيفية جمعنا واستخدامنا وحماية معلوماتك.
            </p>
          </div>

          <div className="p-6 sm:p-8">
            {/* Data Collection */}
            <motion.div variants={itemVariants} className="mb-8">
              <div className="flex items-center gap-3 mb-4 p-3 bg-indigo-50 rounded-lg">
                <div className="bg-indigo-100 p-2 rounded-full">
                  <FiUser className="text-indigo-600 text-xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  المعلومات التي نجمعها
                </h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                {/* Personal Info */}
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-2">
                    <FiUser className="text-indigo-500" />
                    <h4 className="font-bold text-gray-800">المعلومات الشخصية</h4>
                  </div>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>الاسم الكامل</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>عنوان البريد الإلكتروني</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>رقم الهاتف</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>عنوان الشحن</span>
                    </li>
                  </ul>
                </div>
                
                {/* Technical Info */}
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-2">
                    <FiShield className="text-indigo-500" />
                    <h4 className="font-bold text-gray-800">المعلومات التقنية</h4>
                  </div>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>عنوان IP</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>نوع المتصفح والجهاز</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>بيانات ملفات تعريف الارتباط (Cookies)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>سجل التصفح (لأغراض تحليلية)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Data Usage */}
            <motion.div variants={itemVariants} className="mb-8">
              <div className="flex items-center gap-3 mb-4 p-3 bg-indigo-50 rounded-lg">
                <div className="bg-indigo-100 p-2 rounded-full">
                  <FiMail className="text-indigo-600 text-xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  كيفية استخدام المعلومات
                </h3>
              </div>
              <ol className="space-y-4 pl-2">
                {[
                  "معالجة الطلبات وتنفيذ الخدمات التي تطلبها",
                  "تحسين تجربة المستخدم وتخصيص المحتوى",
                  "إرسال رسائل ترويجية وعروض خاصة (يمكنك إلغاء الاشتراك في أي وقت)",
                  "تحليل استخدام الموقع لتحسين خدماتنا",
                  "منع الاحتيال وحماية أمن الموقع"
                ].map((use, index) => (
                  <li 
                    key={index} 
                    className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="bg-gray-100 text-gray-800 font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
                      {index + 1}
                    </div>
                    <span>{use}</span>
                  </li>
                ))}
              </ol>
            </motion.div>

            {/* Data Protection */}
            <motion.div variants={itemVariants} className="mb-8">
              <div className="flex items-center gap-3 mb-4 p-3 bg-indigo-50 rounded-lg">
                <div className="bg-indigo-100 p-2 rounded-full">
                  <FiLock className="text-indigo-600 text-xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  حماية البيانات
                </h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-800 mb-2">إجراءات الحماية</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center gap-2">
                      <span className="text-indigo-500">•</span>
                      <span>تشفير البيانات أثناء النقل (SSL)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-indigo-500">•</span>
                      <span>أنظمة حماية من الاختراق</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-indigo-500">•</span>
                      <span>وصول محدود للموظفين للبيانات الحساسة</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-800 mb-2">المدفوعات الآمنة</h4>
                  <div className="flex items-center gap-2 mb-2">
                    <FiCreditCard className="text-indigo-500" />
                    <p className="text-gray-700">نستخدم معالجات دفع معتمدة وموثوقة:</p>
                  </div>
                  <ul className="space-y-1 text-gray-700">
                    {['مدى', 'Apple Pay', 'بطاقات الائتمان'].map(method => (
                      <li key={method} className="flex items-center gap-2">
                        <span className="text-indigo-500">•</span>
                        <span>{method}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* User Rights */}
            <motion.div variants={itemVariants} className="mb-8">
              <div className="flex items-center gap-3 mb-4 p-3 bg-indigo-50 rounded-lg">
                <div className="bg-indigo-100 p-2 rounded-full">
                  <FiUser className="text-indigo-600 text-xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  حقوقك
                </h3>
              </div>
              <div className="bg-indigo-50 p-4 rounded-lg">
                <ul className="space-y-3 text-indigo-700">
                  {[
                    "حق الاطلاع على البيانات التي نحتفظ بها عنك",
                    "حق تصحيح البيانات غير الدقيقة",
                    "حق طلب حذف بياناتك الشخصية",
                    "حق الاعتراض على معالجة بياناتك",
                    "حق سحب الموافقة على استخدام البيانات"
                  ].map((right, index) => (
                    <li 
                      key={index} 
                      className="flex items-start gap-2 hover:text-indigo-800 transition-colors"
                    >
                      <span className="bg-indigo-200 text-indigo-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5 flex-shrink-0">
                        {index + 1}
                      </span>
                      <span>{right}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-indigo-700">
                  لممارسة أي من هذه الحقوق، يرجى التواصل معنا عبر <Link to="/contact" className="font-semibold hover:underline">صفحة الاتصال</Link>.
                </p>
              </div>
            </motion.div>

            {/* Updates & Contact */}
            <motion.div variants={itemVariants} className="bg-indigo-50 border-l-4 border-indigo-500 p-5 rounded-r-lg">
              <div className="flex items-center gap-3 mb-3">
                <FiAlertTriangle className="text-indigo-600 text-xl" />
                <h3 className="text-lg font-semibold text-indigo-800">
                  تحديثات السياسة واتصل بنا
                </h3>
              </div>
              <ul className="space-y-3 text-indigo-700">
                <li className="flex items-start gap-2">
                  <span className="bg-indigo-200 text-indigo-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5 flex-shrink-0">
                    1
                  </span>
                  <span>قد نقوم بتحديث هذه السياسة بشكل دوري. سيتم إعلامك بأي تغييرات جوهرية.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-indigo-200 text-indigo-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5 flex-shrink-0">
                    2
                  </span>
                  <span>لأية استفسارات حول سياسة الخصوصية، يرجى الاتصال بنا على <a href="tel:+966555493517" className="font-semibold hover:underline">+966 555 493 517</a></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-indigo-200 text-indigo-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5 flex-shrink-0">
                    3
                  </span>
                  <span>آخر تحديث: {new Date().toLocaleDateString('ar-SA')}</span>
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
          <p className="mb-2">نحن ملتزمون بحماية خصوصيتك وضمان أمان بياناتك الشخصية.</p>
          <p className="text-indigo-700 font-medium">
            © {new Date().getFullYear()} سكون. جميع الحقوق محفوظة.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PrivacyPolicyPage;