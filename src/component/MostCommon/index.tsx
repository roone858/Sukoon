import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, A11y } from "swiper/modules";
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
    <div className="relative pb-12">
      {/* Header Section */}
      <div className="relative mb-6">
        <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-3 xs:gap-4">
          {/* Enhanced Title */}
          <h2 className="text-xs xs:text-sm sm:text-lg font-semibold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent transition-all duration-300 hover:scale-[1.02]">
            {title}
          </h2>

          {/* Navigation Buttons with improved accessibility */}
          <div className="flex space-x-2 xs:space-x-3">
            <button
              className="s-slider-prev group rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-x-0.5 active:translate-x-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-600 focus-visible:ring-offset-2"
              aria-label="Previous items"
            >
              <div className="inline-flex items-center justify-center rounded-full border-2 border-gray-600 bg-gray-600 p-2 xs:p-2.5 text-white hover:bg-white hover:text-gray-600 transition-colors duration-200 group-active:scale-95">
                <svg
                  className="size-3 xs:size-4 rtl:rotate-0 transition-transform group-hover:scale-110"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </div>
            </button>

            <button
              className="s-slider-next group rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:translate-x-0.5 active:-translate-x-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-600 focus-visible:ring-offset-2"
              aria-label="Next items"
            >
              <div className="inline-flex items-center justify-center rounded-full border-2 border-gray-600 bg-gray-600 p-2 xs:p-2.5 text-white hover:bg-white hover:text-gray-600 transition-colors duration-200 group-active:scale-95">
                <svg
                  className="size-3 xs:size-4 rtl:rotate-180 transition-transform group-hover:scale-110"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Swiper Slider */}
      <div className="relative px-1">
        {" "}
        {/* Added padding to prevent clipping */}
        <Swiper
          modules={[Navigation, Autoplay, A11y]}
          slidesPerView={1.2} // Default for smallest screens
          spaceBetween={16}
          navigation={{
            nextEl: ".s-slider-next",
            prevEl: ".s-slider-prev",
            disabledClass: "opacity-30 cursor-not-allowed",
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: true,
            pauseOnMouseEnter: true,
          }}
          a11y={{
            prevSlideMessage: "Previous products",
            nextSlideMessage: "Next products",
            firstSlideMessage: "This is the first set of products",
            lastSlideMessage: "This is the last set of products",
          }}
          breakpoints={{
            320: {
              slidesPerView: 1.5,
              spaceBetween: 16,
            },
            400: {
              slidesPerView: 1.8,
              spaceBetween: 16,
            },
            480: {
              slidesPerView: 2.2,
              spaceBetween: 16,
            },
            640: {
              slidesPerView: 2.5,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
            1280: {
              slidesPerView: 5,
              spaceBetween: 24,
            },
          }}
          className="!overflow-visible" // Allows cards to extend beyond container
          watchOverflow={true} // Disable navigation when not needed
          grabCursor={true} // Shows grab cursor on desktop
        >
          {products.map((product) => (
            <SwiperSlide key={product.id} className="!h-auto py-2">
              {" "}
              {/* Added vertical padding */}
              <div className="h-full transition-transform duration-300 hover:scale-[1.02] hover:shadow-md">
                <ProductCard product={product} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
