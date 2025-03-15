// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import "./style.css";

import { Navigation, Pagination, Autoplay } from "swiper/modules";

export default function App() {
  return (
    <div className="relative">
      <Swiper
        slidesPerView={1.3} // عرض جزء من الشريحة التالية والسابقة
        spaceBetween={40} // المسافة بين الشرائح
        centeredSlides={true}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="bg-black h-96 w-full"></div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-green-800 h-96 w-full"></div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-red-800 h-96 w-full"></div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
