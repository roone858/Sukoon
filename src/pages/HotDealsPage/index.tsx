import {
  FiClock,
  FiStar,
  FiZap,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import banner from "../../assets/—Pngtree—top view on a double_15877455.png";
import { useStoreContext } from "../../context/hooks/useStoreContext";
import { useEffect, useMemo, useState } from "react";
import { TimeLeft } from "../../component/DealsSection";
const HotDealsPage = () => {
  const { products } = useStoreContext();
  const [timers, setTimers] = useState<Record<string, TimeLeft>>({});
  // بيانات المنتجات المميزة

  const featuredProducts = useMemo(() => {
    return products
      .filter((product) => product.discount && product.discount > 0)
      .slice(0, 4);
  }, [products]);

  // Calculate time left for each product
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const newTimers: Record<string, TimeLeft> = {};

      featuredProducts.forEach((product) => {
        let endDate: Date;

        // If product has a discountEndDate, use it, otherwise use end of day
        if (product.discountEndDate) {
          endDate = new Date(product.discountEndDate);
        } else {
          endDate = new Date();
          endDate.setHours(23, 59, 59, 999);
        }

        const difference = endDate.getTime() - now.getTime();

        if (difference > 0) {
          newTimers[product.id] = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
          };
        } else {
          // If time is up, set all values to 0
          newTimers[product.id] = {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
          };
        }
      });

      setTimers(newTimers);
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft(); // Initial calculation

    return () => clearInterval(timer);
  }, [featuredProducts]);

  //   const featuredProducts = [
  //     {
  //       id: 1,
  //       name: "مرتبة سكون الذهبية",
  //       price: 3499,
  //       discount: 30,
  //       oldPrice: 4999,
  //       image: "/mattress-gold.jpg",
  //       rating: 4.8,
  //       deadline: "2023-12-31",
  //       tag: "الأكثر مبيعًا",
  //     },
  //     {
  //       id: 2,
  //       name: "سرير كلاسيكي فاخر",
  //       price: 2899,
  //       discount: 25,
  //       oldPrice: 3899,
  //       image: "/bed-classic.jpg",
  //       rating: 4.6,
  //       deadline: "2023-12-25",
  //       tag: "جديد",
  //     },
  //     {
  //       id: 3,
  //       name: "طقم غرفة نوم كامل",
  //       price: 5999,
  //       discount: 35,
  //       oldPrice: 8999,
  //       image: "/bedroom-set.jpg",
  //       rating: 4.9,
  //       deadline: "2024-01-05",
  //       tag: "عرض حصري",
  //     },
  //   ];

  // بانر العرض الترويجي
  const promoBanner = {
    title: "موسم النوم الهادئ",
    subtitle: "خصومات تصل إلى 40%",
    description: "احصل على أفضل المراتب والأسرة لغرفة نوم أحلامك",
    image: banner,
    ctaText: "استفد بالعرض الآن",
    deadline: "2025-5-31",
    features: [
      "شحن مجاني لجميع الطلبات",
      "ضمان 10 سنوات",
      "تجربة نوم لمدة 100 ليلة",
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* شريط التنبيه بالأعلى */}
      <div className="bg-purple-800 text-white py-2 px-4 text-center text-sm">
        🎉 عروض لفترة محدودة - استفد قبل انتهاء الوقت! 🎉
      </div>

      {/* قسم البانر الترويجي */}
      <div className="relative bg-gradient-to-r from-purple-500 to-purple-400 text-white overflow-hidden rounded-b-3xl shadow-xl">
        <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
          <div className="flex flex-col md:flex-row items-center">
            {/* المحتوى النصي */}
            <div className="md:w-1/2 z-10 mb-8 md:mb-0">
              <span className="inline-block bg-amber-400 text-purple-900 px-3 py-1 rounded-full text-sm font-medium mb-3">
                {promoBanner.subtitle}
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                {promoBanner.title}
              </h1>
              <p className="text-lg text-purple-100 mb-6 max-w-lg">
                {promoBanner.description}
              </p>

              <div className="mb-6 space-y-2">
                {promoBanner.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <FiStar className="text-amber-400 ml-2" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center mb-6">
                <FiClock className="text-amber-400 ml-2" />
                <span>ينتهي العرض في: {promoBanner.deadline}</span>
              </div>

              <button className="bg-amber-400 hover:bg-amber-300 text-purple-900 font-bold px-8 py-3 rounded-lg shadow-lg transition-colors duration-300 transform hover:scale-105">
                {promoBanner.ctaText}
              </button>
            </div>

            {/* الصورة */}
            <div className="md:w-1/2 relative z-0">
              <img
                src={promoBanner.image}
                alt={promoBanner.title}
                className="w-full max-w-lg mx-auto rounded-lg  transform rotate-1 hover:rotate-0 transition-transform duration-500"
              />
            </div>
          </div>
        </div>

        {/* موجات زخرفية */}
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-white clip-path-waves"></div>
      </div>

      {/* قسم المنتجات */}
      <div className="container mx-auto px-4 py-12 ">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            <FiZap className="inline mr-2 text-amber-500" />
            أقوى العروض هذا الأسبوع
          </h2>

          <div className="flex space-x-2">
            <button className="swiper-button-prev bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
              <FiChevronLeft />
            </button>
            <button className="swiper-button-next bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
              <FiChevronRight />
            </button>
          </div>
        </div>

        {/* سلايدر المنتجات */}
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={{
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-12"
        >
          {featuredProducts.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                {/* شريط الخصم */}
                <div className="bg-red-500 text-white text-sm font-bold px-3 py-1 absolute top-3 left-3 rounded-full z-10">
                  {product.discount}% خصم
                </div>

                {/* صورة المنتج */}
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={product.images[0].url}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />

                  {/* العداد التنازلي */}
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-2 text-center">
                    <div className="flex justify-center space-x-4">
                      <div>
                        <div className="font-bold">  {String(timers[product.id]?.days || 0).padStart(2, "0")}</div>
                        <div className="text-xs">أيام</div>
                      </div>
                      <div>
                        <div className="font-bold">
                          {" "}
                          {String(timers[product.id]?.hours || 0).padStart(
                            2,
                            "0"
                          )}
                        </div>
                        <div className="text-xs">ساعات</div>
                      </div>
                      <div>
                        <div className="font-bold">      {String(timers[product.id]?.minutes || 0).padStart(
                          2,
                          "0"
                        )}</div>
                        <div className="text-xs">دقائق</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* تفاصيل المنتج */}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-gray-800">
                      {product.name}
                    </h3>
                    {product.tags && (
                      <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                        {product.tags}
                      </span>
                    )}
                  </div>

                  {/* <div className="flex items-center mb-3">
                    <div className="flex text-amber-400 mr-2">
                      {[...Array(5)].map((_, i) => (
                        <FiStar
                          key={i}
                          className={
                            i < Math.floor(product?.rating) ? "fill-current" : ""
                          }
                        />
                      ))}
                    </div>
                    <span className="text-gray-600 text-sm">
                      {product?.rating}
                    </span>
                  </div> */}

                  <div className="flex items-center">
                    <span className="text-xl font-bold text-purple-700">
                      {product?.finalPrice?.toLocaleString()} ر.س
                    </span>
                    <span className="text-gray-400 line-through text-sm mr-2">
                      {product.price.toLocaleString()} ر.س
                    </span>
                  </div>

                  <button className="w-full mt-4 bg-purple-700 hover:bg-purple-800 text-white py-2 rounded-lg transition-colors">
                    أضف إلى السلة
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* قسم إضافي للعروض */}
      <div className="bg-purple-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
            لماذا تختار عروض سكون؟
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "🛌",
                title: "جودة لا تضاهى",
                description:
                  "منتجاتنا مصنوعة من أفضل المواد لضمان الراحة والدوام",
              },
              {
                icon: "🚚",
                title: "شحن سريع",
                description: "توصيل خلال 24-48 ساعة في جميع أنحاء المملكة",
              },
              {
                icon: "🔄",
                title: "إرجاع سهل",
                description: "سياسة إرجاع لمدة 14 يومًا بدون متاعب",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm text-center hover:shadow-md transition-shadow"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-lg mb-2 text-purple-700">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSS مخصص */}
      {/* <style jsx>{`
        .clip-path-waves {
          clip-path: polygon(0 70%, 100% 30%, 100% 100%, 0% 100%);
        }
      `}</style> */}
    </div>
  );
};

export default HotDealsPage;
