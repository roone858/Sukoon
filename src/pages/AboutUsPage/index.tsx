import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiChevronDown, FiChevronUp, FiAward, FiHeart, FiShield } from 'react-icons/fi';

  // بيانات القيم
  const coreValues = [
    {
      icon: <FiAward className="w-6 h-6" />,
      title: "الجودة الممتازة",
      description: "نستخدم أفضل المواد الخام لضمان منتجات تدوم طويلاً"
    },
    {
      icon: <FiHeart className="w-6 h-6" />,
      title: "راحة العملاء",
      description: "تصميماتنا تركز على توفير أقصى درجات الراحة"
    },
    {
      icon: <FiShield className="w-6 h-6" />,
      title: "الضمان الطويل",
      description: "نقدم ضمانات ممتدة على جميع منتجاتنا"
    }
  ];

  // بيانات الأسئلة الشائعة
  const faqs = [
    {
      question: "ما الذي يجعل منتجات سكون مميزة؟",
      answer: "نحن نركز على التفاصيل الدقيقة ونستخدم مواد عالية الجودة مع تقنيات حديثة في التصنيع"
    },
    {
      question: "هل تقدمون توصيلاً مجانياً؟",
      answer: "نعم، نقدم توصيلاً مجانياً لجميع أنحاء المملكة للطلبات فوق 1000 ريال"
    },
    {
      question: "كيف أختار المنتج المناسب لي؟",
      answer: "فريق خدمة العملاء لدينا مستعد لمساعدتك في اختيار المنتج الأمثل لاحتياجاتك"
    }
  ];
const AboutUsPage = () => {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);




  return (
    <div className="min-h-screen bg-gray-50">
 
      {/* بانر رئيسي تفاعلي */}
      <section className="relative pt-32 pb-20 px-4 bg-gradient-to-r from-purple-900 to-purple-700 text-white overflow-hidden">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto text-center relative z-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">رحلة سكون نحو الراحة المثالية</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8">
            منذ 2010 ونحن نبتكر حلول النوم والأثاث المنزلي الأكثر راحة في المملكة
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-purple-800 px-8 py-3 rounded-full font-bold shadow-lg"
          >
            اكتشف منتجاتنا
          </motion.button>
        </motion.div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-400 rounded-full filter blur-3xl"></div>
        </div>
      </section>

      {/* إحصائيات الشركة */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { number: "12+", label: "سنوات من الخبرة" },
            { number: "50K+", label: "عميل راضٍ" },
            { number: "100+", label: "منتج مبتكر" },
            { number: "5", label: "فروع في المملكة" }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-6 bg-gray-50 rounded-xl"
            >
              <div className="text-3xl md:text-4xl font-bold text-purple-800 mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* قسم القيم الأساسية */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center text-purple-900 mb-12"
          >
            قيمنا الأساسية
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all"
              >
                <div className="text-purple-600 mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-purple-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* قسم فريق العمل */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-purple-900 mb-12">فريق سكون</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "أحمد السكوني",
                role: "المؤسس والرئيس التنفيذي",
                bio: "قاد رحلة سكون منذ البداية برؤية واضحة للجودة والراحة",
                image: "/team/ahmed.jpg"
              },
              {
                name: "نورة الفهد",
                role: "مديرة التصميم",
                bio: "تصميماتها تجمع بين الجمال والوظيفية والراحة المثالية",
                image: "/team/nora.jpg"
              },
              {
                name: "خالد الرشيد",
                role: "مدير الإنتاج",
                bio: "يضمن تطبيق أعلى معايير الجودة في كل منتج نصنعه",
                image: "/team/khaled.jpg"
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-xl shadow-md"
              >
                <div className="h-64 bg-purple-200 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6 text-white">
                    <h3 className="text-xl font-bold">{member.name}</h3>
                    <p className="text-purple-200">{member.role}</p>
                  </div>
                </div>
                <div className="p-6 bg-white">
                  <p className="text-gray-600">{member.bio}</p>
                  <div className="mt-4 flex space-x-4">
                    <a href="#" className="text-purple-600 hover:text-purple-800">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                      </svg>
                    </a>
                    <a href="#" className="text-purple-600 hover:text-purple-800">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* قسم الأسئلة الشائعة */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-purple-900 mb-12">أسئلة شائعة</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl overflow-hidden shadow-sm"
              >
                <button
                  className="w-full flex justify-between items-center p-6 text-left"
                  onClick={() => setActiveAccordion(activeAccordion === index ? null : index)}
                >
                  <h3 className="text-lg font-medium text-purple-900">{faq.question}</h3>
                  {activeAccordion === index ? (
                    <FiChevronUp className="text-purple-600 w-5 h-5" />
                  ) : (
                    <FiChevronDown className="text-purple-600 w-5 h-5" />
                  )}
                </button>
                <div
                  className={`px-6 pb-6 pt-0 transition-all duration-300 ${
                    activeAccordion === index ? 'block' : 'hidden'
                  }`}
                >
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* دعوة للعمل */}
      <section className="py-20 px-4 bg-purple-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">جاهزون لتجربة راحة سكون؟</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            اكتشف مجموعتنا الفاخرة من المراتب والأثاث المصمم لراحتك
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <button className="bg-white text-purple-900 px-8 py-4 rounded-full font-bold shadow-lg">
              تصفح المنتجات الآن
            </button>
          </motion.div>
        </div>
      </section>

      {/* فوتر */}
      {/* <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">سكون</h3>
            <p className="text-gray-400">راحتك تبدأ من هنا</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">روابط سريعة</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">الرئيسية</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">من نحن</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">المنتجات</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">اتصل بنا</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">وسائل التواصل</h4>
            <ul className="space-y-2">
              <li className="text-gray-400">info@sakoon.com</li>
              <li className="text-gray-400">+966 12 345 6789</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">تابعنا</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto pt-8 mt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© 2023 سكون. جميع الحقوق محفوظة.</p>
        </div>
      </footer> */}
    </div>
  );
};

export default AboutUsPage;