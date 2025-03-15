import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "./style.css";

import panel2 from "../../assets/panel2.png";
import panel3 from "../../assets/panel33.png";
import paner from "../../assets/panel1.png";
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
            <img src={panel2} />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <SwiperSlide>
            <div className=" w-full">
              {" "}
              <img src={panel3} />
            </div>
          </SwiperSlide>
        </SwiperSlide>
        <SwiperSlide>
          <img src={paner} />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
