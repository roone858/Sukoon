// components/Categories/CategoriesSlider.tsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "../style.css";
import CategoryCard from "../CategoryCard";

interface CategoriesSliderProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  categories: any[];
}

export const CategoriesSlider = ({ categories }: CategoriesSliderProps) => (
  <Swiper
    slidesPerView={2}
    spaceBetween={20}
    modules={[Navigation, Pagination, Autoplay]}
    className="categories-swiper"
    navigation={true}
    autoplay={{
      delay: 5000,
      disableOnInteraction: false,
    }}
    breakpoints={{
      640: { slidesPerView: 2, spaceBetween: 20 },
      768: { slidesPerView: 3, spaceBetween: 30 },
      1024: { slidesPerView: 4, spaceBetween: 30 },
    }}
  >
    {categories.map((category, index) => (
      <SwiperSlide key={category.id}>
        <CategoryCard
          image={category.image}
          title={category.name}
          itemCount={category.itemCount}
          link={category.link}
          delay={index * 0.1}
        />
      </SwiperSlide>
    ))}
  </Swiper>
);
