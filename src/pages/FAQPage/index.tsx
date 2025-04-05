import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FiChevronDown,
  FiChevronUp,
  FiHelpCircle,
  FiShoppingBag,
  FiCreditCard,
  FiTruck,
  FiRefreshCw,
  FiChevronLeft,
  FiSearch,
} from "react-icons/fi";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  title: string;
  icon: React.ReactNode;
  questions: FAQItem[];
}

const faqCategories: FAQCategory[] = [
  {
    title: "الطلبات والتسوق",
    icon: <FiShoppingBag className="text-emerald-600" />,
    questions: [
      {
        question: "كيف يمكنني تتبع طلبي؟",
        answer:
          "بعد تأكيد طلبك، ستصلك رسالة بريد إلكتروني تحتوي على رقم التتبع. يمكنك استخدام هذا الرقم لتتبع شحنتك من خلال صفحة 'تتبع الطلب' على موقعنا.",
      },
      {
        question: "ما هي مدة معالجة الطلب؟",
        answer:
          "عادة ما تتم معالجة الطلبات خلال 1-2 يوم عمل. خلال المواسم المزدحمة قد تستغرق المعالجة وقتًا أطول قليلاً.",
      },
      {
        question: "هل يمكنني تعديل طلبي بعد الشراء؟",
        answer:
          "نعم، يمكنك تعديل الطلب خلال ساعتين من تقديمه. بعد ذلك، قد لا نتمكن من إجراء التعديلات إذا بدأت عملية التجهيز.",
      },
    ],
  },
  {
    title: "الشحن والتوصيل",
    icon: <FiTruck className="text-blue-600" />,
    questions: [
      {
        question: "ما هي خيارات الشحن المتاحة؟",
        answer:
          "نوفر خيارين للشحن: الشحن العادي (3-5 أيام عمل) والشحن السريع (1-2 يوم عمل). تختلف التكلفة حسب نوع الشحن والموقع.",
      },
      {
        question: "هل تتوفر خدمة الشحن الدولي؟",
        answer:
          "حاليًا نقدم الشحن داخل المملكة العربية السعودية فقط. نحن نعمل على توسيع خدماتنا لتشمل دول أخرى قريبًا.",
      },
      {
        question: "ماذا أفعل إذا لم أستلم طلبي؟",
        answer:
          "إذا تأخر وصول طلبك عن الوقت المتوقع، يرجى التواصل مع خدمة العملاء وسنساعدك في تتبع الشحنة وحل أي مشكلة.",
      },
    ],
  },
  {
    title: "الدفع والسداد",
    icon: <FiCreditCard className="text-purple-600" />,
    questions: [
      {
        question: "ما هي طرق الدفع المتاحة؟",
        answer:
          "نقبل الدفع ببطاقات الائتمان/الخصم (Visa, MasterCard, Mada)، الدفع عند الاستلام (في بعض المناطق)، وحوالة بنكية.",
      },
      {
        question: "هل معلومات الدفع الخاصة بي آمنة؟",
        answer:
          "نعم، نستخدم أنظمة دفع مشفرة وموثوقة. لا نقوم بتخزين معلومات بطاقات الدفع على خوادمنا.",
      },
      {
        question: "كيف يمكنني الحصول على فاتورة ضريبية؟",
        answer:
          "سيتم إرفاق الفاتورة الضريبية تلقائيًا مع طلبك. إذا كنت بحاجة إلى نسخة إضافية، يمكنك طلبها من خدمة العملاء.",
      },
    ],
  },
  {
    title: "الإرجاع والاستبدال",
    icon: <FiRefreshCw className="text-amber-600" />,
    questions: [
      {
        question: "ما هي سياسة الإرجاع؟",
        answer:
          "يمكنك إرجاع المنتجات خلال 14 يومًا من الاستلام بشرط أن تكون في حالتها الأصلية مع العبوة والفاتورة. بعض المنتجات غير قابلة للإرجاع.",
      },
      {
        question: "كم تستغرق عملية استرداد المبلغ؟",
        answer:
          "بعد استلام المنتج المعاد وفحصه، سيتم استرداد المبلغ خلال 7-14 يوم عمل بنفس طريقة الدفع الأصلية.",
      },
      {
        question: "هل يمكنني استبدال المنتج بدلاً من إرجاعه؟",
        answer:
          "نعم، نوفر خدمة الاستبدال لمنتجاتنا. يجب أن يكون المنتج البديل بنفس القيمة أو أعلى مع دفع الفرق إن وجد.",
      },
    ],
  },
];

const FAQPage = () => {
  const [activeIndex, setActiveIndex] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  type FAQIndex = `${number}-${number}`;

  const toggleFAQ = (index: FAQIndex) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(
      item =>
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-6 px-4 sm:px-6 lg:px-8">
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
            className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors mb-4"
          >
            <FiChevronLeft className="mr-1" />
            العودة
          </Link>

          <div className="text-center bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-center gap-3 mb-3">
              <FiHelpCircle className="text-3xl text-indigo-600" />
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
                الأسئلة الشائعة
              </h1>
            </div>
            <p className="text-gray-600">
              لا تجد إجابتك؟{" "}
              <Link to="/contact" className="text-indigo-600 hover:underline">
                اتصل بنا
              </Link>
            </p>
          </div>
        </motion.div>

        {/* Search Box */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="ابحث في الأسئلة الشائعة..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <FiSearch className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
          </div>
        </motion.div>

        {/* FAQ Content */}
        <motion.div variants={itemVariants}>
          {filteredCategories.map((category, catIndex) => (
            <div key={catIndex} className="mb-8">
              <div className="flex items-center gap-3 mb-4 p-3 bg-white rounded-lg shadow-sm">
                <div className="bg-gray-100 p-2 rounded-full">
                  {category.icon}
                </div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {category.title}
                </h2>
              </div>

              <div className="space-y-3">
                {category.questions.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-sm overflow-hidden"
                  >
                    <button
                      className={`w-full flex justify-between items-center p-4 text-right focus:outline-none ${
                        activeIndex === `${catIndex}-${index}`
                          ? "bg-gray-50"
                          : ""
                      }`}
                      onClick={() => toggleFAQ(`${catIndex}-${index}`)}
                    >
                      <span className="font-medium text-gray-800">
                        {item.question}
                      </span>
                      {activeIndex === `${catIndex}-${index}` ? (
                        <FiChevronUp className="text-gray-500 ml-2" />
                      ) : (
                        <FiChevronDown className="text-gray-500 ml-2" />
                      )}
                    </button>

                    {activeIndex === `${catIndex}-${index}` && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="px-4 pb-4 text-gray-600"
                      >
                        {item.answer}
                        {index === 0 && catIndex === 0 && (
                          <div className="mt-3">
                            <Link
                              to="/track-order"
                              className="text-indigo-600 hover:underline text-sm"
                            >
                              انتقل إلى صفحة تتبع الطلبات →
                            </Link>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          variants={itemVariants}
          className="bg-indigo-50 border-l-4 border-indigo-500 p-5 rounded-r-lg mb-8"
        >
          <div className="flex items-center gap-3 mb-3">
            <FiHelpCircle className="text-indigo-600 text-xl" />
            <h3 className="text-lg font-semibold text-indigo-800">
              لا تزال لديك أسئلة؟
            </h3>
          </div>
          <p className="text-indigo-700 mb-3">
            فريق خدمة العملاء لدينا مستعد لمساعدتك في أي استفسار.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            اتصل بنا
          </Link>
        </motion.div>

        {/* Footer */}
        <motion.div
          variants={itemVariants}
          className="text-center text-gray-600 text-sm bg-white rounded-xl shadow-sm p-6"
        >
          <p className="mb-2">نسعى دائمًا لتقديم أفضل تجربة تسوق لكم.</p>
          <p className="text-gray-700 font-medium">
            © {new Date().getFullYear()} سكون. جميع الحقوق محفوظة.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FAQPage;
