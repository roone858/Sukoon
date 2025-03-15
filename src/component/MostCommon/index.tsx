import { Swiper, SwiperSlide } from "swiper/react";
import Card from "../Cart";
import { Autoplay, Navigation } from "swiper/modules";
import demo from "../../assets/demo.webp";
import "./style.css";
export default function MostCommon() {
  return (
    <div className="relative ">
      <div className="flex justify-between pb-6 ">
        <div className="text-lg ">
          <h2>المنتجات الأكثر مبيعاً</h2>
        </div>
        <div className="space-x-3 lg:relative md:relative opacity-0 md:opacity-100 transition-opacity duration-500">
          <button className="s-slider-prev s-slider-nav-arrow">
            <a
              className="inline-block rounded-full border border-gray-600 bg-gray-600 p-3 text-white hover:bg-transparent hover:text-gray-600 focus:ring-3 focus:outline-hidden"
            >
              <span className="sr-only"> Download </span>

              <svg
                className="size-4 rtl:rotate-0"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
          </button>
          <button className="s-slider-next s-slider-nav-arrow">
            {/* Base */}

            <a
              className="inline-block rounded-full border border-gray-600 bg-gray-600 p-3 text-white hover:bg-transparent hover:text-gray-600 focus:ring-3 focus:outline-hidden"
             >
              <span className="sr-only"> Download </span>

              <svg
                className="size-4 rtl:rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
          </button>
        </div>
      </div>
      <div className="relative">
        <Swiper
          slidesPerView={4}
          spaceBetween={10}
          breakpoints={{
            100: {
              slidesPerView: 1.3,
              spaceBetween: 20,
            },
            450: {
              slidesPerView: 2.3,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 2.3,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4.3,
              spaceBetween: 40,
            },
          }}
          navigation={{
            nextEl: ".s-slider-next",
            prevEl: ".s-slider-prev",
          }}
          modules={[Autoplay, Navigation]}
          className="mySwiper"
        >
          {[...Array(10)].map((_, index) => (
            <SwiperSlide key={index} className="bg-wight important">
              <Card
                imageUrl={demo}
                title="مرتبة إسفنجية | سبا | 90x190 سم"
                description="مرتبة سبا الإسفنجية هي ما تبحث عنه "
                link="/product"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
