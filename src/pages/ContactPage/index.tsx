import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiClock, FiSend, FiChevronLeft } from "react-icons/fi";

const ContactPage = () => {
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
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-6 px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="max-w-6xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header with back button */}
        <motion.div variants={itemVariants} className="mb-8">
          <a 
            href="/" 
            className="inline-flex items-center text-purple-600 hover:text-purple-800 transition-colors mb-4"
          >
            <FiChevronLeft className="mr-1" />
            العودة
          </a>
          
          <div className="text-center bg-white rounded-xl shadow-sm p-6 border border-purple-100">
            <h1 className="text-3xl sm:text-4xl font-bold text-purple-800 mb-2">
              اتصل بنا
            </h1>
            <p className="text-gray-600">
              نحن هنا لمساعدتك! تواصل معنا عبر أي من القنوات التالية
            </p>
          </div>
        </motion.div>

        {/* Contact Content */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Contact Form */}
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-xl shadow-md overflow-hidden border border-purple-100"
          >
            <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-6 text-white">
              <h2 className="text-2xl font-bold">أرسل رسالة</h2>
              <p>سنرد عليك في غضون 24 ساعة</p>
            </div>
            
            <form className="p-6">
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 mb-2">الاسم الكامل</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 mb-2">البريد الإلكتروني</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="phone" className="block text-gray-700 mb-2">رقم الهاتف (اختياري)</label>
                <input 
                  type="tel" 
                  id="phone" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="message" className="block text-gray-700 mb-2">الرسالة</label>
                <textarea 
                  id="message" 
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                ></textarea>
              </div>
              
              <button 
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-md hover:shadow-lg"
              >
                <FiSend />
                إرسال الرسالة
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            {/* Contact Cards */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-purple-100">
              <h2 className="text-2xl font-bold text-purple-800 mb-4">معلومات التواصل</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-3 hover:bg-purple-50 rounded-lg transition-colors">
                  <div className="bg-purple-100 p-3 rounded-full text-purple-600">
                    <FiPhone className="text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">الهاتف</h3>
                    <a dir="auto" href="tel:+966555493517" className="text-gray-600 hover:text-purple-600 transition-colors">
                      +966 55 549 3517
                    </a>
                    <p className="text-sm text-gray-500 mt-1">من الأحد إلى الخميس، 8 صباحًا - 5 مساءً</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-3 hover:bg-purple-50 rounded-lg transition-colors">
                  <div className="bg-purple-100 p-3 rounded-full text-purple-600">
                    <FiMail className="text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">البريد الإلكتروني</h3>
                    <a href="mailto:info@sukoon.com" className="text-gray-600 hover:text-purple-600 transition-colors">
                      info@sukoon.com
                    </a>
                    <p className="text-sm text-gray-500 mt-1">الرد خلال 24 ساعة</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-3 hover:bg-purple-50 rounded-lg transition-colors">
                  <div className="bg-purple-100 p-3 rounded-full text-purple-600">
                    <FiMapPin className="text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">العنوان</h3>
                    <p className="text-gray-600">حي السليمانية، الرياض 12241، المملكة العربية السعودية</p>
                    <a href="#" className="text-purple-600 hover:underline text-sm mt-1 inline-block">
                      عرض على الخريطة
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Working Hours */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-purple-100">
              <h2 className="text-2xl font-bold text-purple-800 mb-4">ساعات العمل</h2>
              
              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-3 rounded-full text-purple-600">
                  <FiClock className="text-xl" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-700">الأحد - الخميس</span>
                    <span className="font-medium">8:00 ص - 5:00 م</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">الجمعة - السبت</span>
                    <span className="font-medium">إجازة</span>
                  </div>
                  <div className="pt-2 text-sm text-gray-500">
                    <p>متاحون للرد على الاستفسارات عبر البريد الإلكتروني خارج ساعات العمل</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* FAQ CTA */}
        <motion.div 
          variants={itemVariants}
          className="bg-purple-50 border-l-4 border-purple-500 p-5 rounded-r-lg mb-8"
        >
          <div className="flex items-center gap-3 mb-3">
            <h3 className="text-lg font-semibold text-purple-800">
              هل لديك استفسار شائع؟
            </h3>
          </div>
          <p className="text-purple-700 mb-3">
            قد تجد إجابتك في صفحة الأسئلة الشائعة لدينا
          </p>
          <a 
            href="/faq" 
            className="inline-block bg-white hover:bg-gray-50 text-purple-600 border border-purple-200 py-2 px-4 rounded-lg transition-colors shadow-sm hover:shadow-md"
          >
            تصفح الأسئلة الشائعة
          </a>
        </motion.div>

        {/* Footer */}
        <motion.div 
          variants={itemVariants}
          className="text-center text-gray-600 text-sm bg-white rounded-xl shadow-sm p-6 border border-purple-100"
        >
          <p className="mb-2">نحن هنا لمساعدتك في أي وقت. تواصل معنا وسنكون سعداء بخدمتك.</p>
          <p className="text-purple-700 font-medium">
            © {new Date().getFullYear()} سكون. جميع الحقوق محفوظة.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ContactPage;