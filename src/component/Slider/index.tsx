import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "./style.css";

import PanelTow from "../../assets/panelTwo.png";
import panelThree from "../../assets/panelThree.png";
import panelOne from "../../assets/panelOne.png";
export default function App() {
  return (
    <div className="relative w-screen  ">
      <Swiper
        slidesPerView={1.3}
        spaceBetween={20}
        centeredSlides={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper "
        pagination={{
          clickable: true,
        }}
        navigation={true}
        autoplay={{
          delay: 5000,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          100: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          450: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 1.3,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 1.3,
            spaceBetween: 20,
          },
        }}
      >
        <SwiperSlide>
          <img src={panelOne} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={PanelTow} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={panelThree} />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
