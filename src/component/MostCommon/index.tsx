import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "./style.css";
import ProductCard from "../ProductCard";
import { Product } from "../../util/types";

export default function MostCommon({
  title,
  products,
}: {
  title: string;
  products: Product[];
}) {
  return (
    <div className="relative">
      {/* Header Section */}
      <div className="flex justify-between items-center pb-4">
        <h2 className="text-lg font-semibold">{title}</h2>

        {/* Navigation Buttons */}
        <div className="space-x-3 opacity-0 md:opacity-100 transition-opacity duration-500">
          <button className="s-slider-prev s-slider-nav-arrow">
            <a className="inline-block rounded-full border border-gray-600 bg-gray-600 p-3 text-white hover:bg-transparent hover:text-gray-600 focus:outline-none">
              <span className="sr-only">Previous</span>
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
            <a className="inline-block rounded-full border border-gray-600 bg-gray-600 p-3 text-white hover:bg-transparent hover:text-gray-600 focus:outline-none">
              <span className="sr-only">Next</span>
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

      {/* Swiper Slider */}
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
          {products.map((product, index) => (
            <SwiperSlide key={index}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
