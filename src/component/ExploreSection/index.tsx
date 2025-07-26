import React from "react";
import { Link } from "react-router-dom";

const ExploreSection: React.FC = () => {
  return (
    <div dir="rtl" className="bg-purple-50 py-10 xs:py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 xs:gap-8 sm:gap-10 lg:gap-16">
          {/* Image Section */}
          <div className="w-full lg:w-1/2 order-2 lg:order-1 mt-6 xs:mt-8 sm:mt-0">
            <div className="relative overflow-hidden rounded-xl xs:rounded-2xl shadow-lg group">
              <img
                loading="lazy"
                decoding="async"
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                alt="غرفة نوم من متجر سكون"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 via-purple-900/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              {/* Promo Badge - Smaller on XS */}
              <div className="absolute top-2 xs:top-3 right-2 xs:right-3 bg-purple-600 text-white px-2 xs:px-3 py-1 xs:py-1.5 rounded-full font-bold text-xs xs:text-sm shadow-md">
                خصم 20%
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <div className="text-center lg:text-right space-y-4 xs:space-y-5 sm:space-y-6">
              <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold leading-snug xs:leading-tight">
                <span className="block text-gray-800">
                  رفاهية النوم تبدأ مع
                </span>
                <span className="block bg-gradient-to-r from-purple-600 to-purple-900 bg-clip-text text-transparent">
                  سكون
                </span>
              </h2>

              <div className="text-base xs:text-lg text-gray-600 leading-relaxed">
                <p className="mb-3 xs:mb-4">
                  في <strong className="text-purple-700">سكون</strong>، نصنع لك
                  عالمًا من <strong>الراحة</strong> مع:
                </p>
                <ul className="space-y-1.5 xs:space-y-2 text-right">
                  <li className="flex items-center justify-start gap-1.5 xs:gap-2">
                    <svg
                      className="w-4 xs:w-5 h-4 xs:h-5 text-purple-600 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-sm xs:text-base">
                      مراتب طبية بمواصفات عالمية
                    </span>
                  </li>
                  <li className="flex items-center justify-start gap-1.5 xs:gap-2">
                    <svg
                      className="w-4 xs:w-5 h-4 xs:h-5 text-purple-600 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-sm xs:text-base">
                      غرف نوم بتصاميم فاخرة
                    </span>
                  </li>
                  <li className="flex items-center justify-start gap-1.5 xs:gap-2">
                    <svg
                      className="w-4 xs:w-5 h-4 xs:h-5 text-purple-600 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-sm xs:text-base">
                      أثاث منزلي ذكي ودائم
                    </span>
                  </li>
                </ul>
              </div>

              {/* Feature Cards - Adjusted for XS */}
              <div className="grid grid-cols-2 gap-3 xs:gap-4 mt-4 xs:mt-6 text-center">
                <div className="bg-white p-2 xs:p-3 rounded-lg xs:rounded-xl shadow-xs xs:shadow-sm border  border-purple-100">
                  <svg
                    className="w-6 xs:w-7 h-6 xs:h-7 mx-auto text-purple-600 mb-1 xs:mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  <span className="text-xs  xs:text-sm font-medium text-purple-900">
                    ضمان 10 سنوات
                  </span>
                </div>
                <div className="bg-white p-2 xs:p-3 rounded-lg xs:rounded-xl shadow-xs xs:shadow-sm border border-purple-100">
                  <svg
                    className="w-6 xs:w-7 h-6 xs:h-7 mx-auto text-purple-600 mb-1 xs:mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                  <span className="text-xs xs:text-sm font-medium text-purple-900">
                    توصيل سريع
                  </span>
                </div>
              </div>

              {/* Buttons - Optimized for XS */}
              <div className="flex flex-col xs:flex-row gap-3 xs:gap-4 justify-center lg:justify-end mt-6 xs:mt-8">
                <Link
                  to="/products"
                  className="flex-1 sm:flex-none bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white px-4 xs:px-6 py-2.5 xs:py-3 rounded-lg xs:rounded-xl font-bold transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 text-sm xs:text-base"
                >
                  اكتشف المجموعة
                </Link>
                <Link
                  to="/contact"
                  className="flex-1 sm:flex-none bg-white border border-purple-600 text-purple-700 hover:bg-purple-50 px-4 xs:px-6 py-2.5 xs:py-3 rounded-lg xs:rounded-xl font-bold transition-all duration-300 shadow-sm hover:shadow-md text-sm xs:text-base"
                >
                  استشارة مجانية
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreSection;
