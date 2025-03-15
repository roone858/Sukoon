import { Swiper, SwiperSlide } from "swiper/react";
import Card from "../Cart";
import { Autoplay, Navigation } from "swiper/modules";
import demo from "../../assets/demo.webp"
import "./style.css";
export default function MostCommon() {
  return (
    <div className="relative ">
      <div className="flex justify-between pb-20 ">
        <div className="text-xl font-bold">
          <h2>المنتجات الأكثر مبيعاً</h2>
        </div>
        <div className="relative">
          <button className="s-slider-prev s-slider-nav-arrow ">prev</button>
          <button className="s-slider-next s-slider-nav-arrow">next</button>
        </div> 
      </div>
      <div className="relative">
        <Swiper
          slidesPerView={4}
          spaceBetween={20}
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
