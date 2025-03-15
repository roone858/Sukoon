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
        loop={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
        pagination={{
          // bulletActiveClass:"swiper-pagination-bullet-active ",
          clickable: true,
        }}
        navigation={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
      >
        <SwiperSlide>
          <div className=" w-full">
            {" "}
            <img src={panelOne} />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <SwiperSlide>
            <div className=" w-full">
              {" "}
              <img src={PanelTow} />
            </div>
          </SwiperSlide>
        </SwiperSlide>
        <SwiperSlide>
          <img src={panelThree} />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
