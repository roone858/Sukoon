import {
  FiHome,
  FiShoppingBag,
  FiGrid,
  FiInfo,
  FiMail,
  FiPhone,
  FiMapPin,
  FiUser,
} from "react-icons/fi";

const siteSections = [
  {
    title: "الصفحات الرئيسية",
    icon: <FiHome className="text-purple-600" />,
    links: [
      { name: "الصفحة الرئيسية", url: "/" },
      { name: "عروض خاصة", url: "/deals" },
      { name: "الأكثر مبيعاً", url: "/products?sort=best-selling" },
    ],
  },
  {
    title: "المتجر",
    icon: <FiShoppingBag className="text-purple-600" />,
    links: [
      { name: "جميع المنتجات", url: "/mega-menu" },
      { name: "المراتب", url: "/products?categories=مراتب" },
      { name: "الأسرة", url: "/category/beds" },
      { name: "غرف نوم كاملة", url: "/products?categories=غرفة نوم" },
     //  { name: "الإكسسوارات", url: "/category/accessories" },
    ],
  },
  {
    title: "الأقسام",
    icon: <FiGrid className="text-purple-600" />,
    links: [
      { name: "العروض", url: "/deals" },
      { name: "المفضلة", url: "/wishlist" },
     //  { name: "مقارنة المنتجات", url: "/compare" },
      { name: "تتبع الطلب", url: "/track-order" },
    ],
  },
  {
    title: "حسابي",
    icon: <FiUser className="text-purple-600" />,
    links: [
      { name: "تسجيل الدخول", url: "/login" },
      { name: "إنشاء حساب", url: "/register" },
      { name: "طلباتي", url: "/profile" },
     //  { name: "عنواني", url: "/account/addresses" },
      { name: "إعدادات الحساب", url: "/account/settings" },
    ],
  },
  {
    title: "عن سكون",
    icon: <FiInfo className="text-purple-600" />,
    links: [
      { name: "من نحن", url: "/about-us" },
      { name: "سياسة الشحن والتسليم", url: "/shipping-policy" },
      { name: "مدونة النوم", url: "/blog" },
     //  { name: "وظائف", url: "/careers" },
    ],
  },
  {
    title: "خدمة العملاء",
    icon: <FiPhone className="text-purple-600" />,
    links: [
      { name: "اتصل بنا", url: "/contact" },
      { name: "الأسئلة الشائعة", url: "/faq" },
      { name: "سياسة الإرجاع", url: "/return-policy" },
      { name: "شروط الخصوصية", url: "/privacy" },
      { name: "شروط الاستخدام", url: "/terms" },
    ],
  },
];

const contactInfo = [
  {
    icon: <FiMapPin className="text-purple-600" />,
    text: "المملكة العربية السعودية، الرياض، حي السليمانية",
  },
  { icon: <FiMail className="text-purple-600" />, text: "info@sukoon.com" },
  { icon: <FiPhone className="text-purple-600" />, text: "+966 11 123 4567" },
];
const SitemapPage = () => {

  return (
    <div className="min-h-screen bg-gray-50 py-8" dir="rtl">
      <div className="container mx-auto px-4">
        {/* عنوان الصفحة */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            خريطة موقع سكون
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            تصفح جميع صفحات موقع متجر سكون للمراتب والأثاث الفاخر
          </p>
        </div>

        {/* أقسام الموقع */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {siteSections.map((section, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="bg-purple-100 p-2 rounded-lg ml-3">
                  {section.icon}
                </div>
                <h2 className="text-xl font-bold text-gray-800">
                  {section.title}
                </h2>
              </div>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.url}
                      className="block py-2 px-3 text-gray-600 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* معلومات التواصل */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            تواصل معنا
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactInfo.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center"
              >
                <div className="bg-purple-100 p-3 rounded-full mb-3">
                  {item.icon}
                </div>
                <p className="text-gray-700">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* شهادة حقوق النشر */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} سكون. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </div>
  );
};

export default SitemapPage;
