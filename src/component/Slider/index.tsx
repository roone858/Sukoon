// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import "./style.css";

import { Navigation, Pagination, Autoplay } from "swiper/modules";
import panel2 from "../../assets/panel2.PNG";
import panel3 from "../../assets/panel3.PNG";
import paner from "../../assets/paner.png";
export default function App() {
  return (
    <div className="relative w-screen  ">
      <Swiper
        slidesPerView={1.3} // عرض جزء من الشريحة التالية والسابقة
        spaceBetween={20} // المسافة بين الشرائح
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
