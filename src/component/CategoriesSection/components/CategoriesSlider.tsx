// components/Categories/CategoriesSlider.tsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "../style.css";
import CategoryCard from "../CategoryCard";
import { Category } from "../../../services/categories.service";

interface CategoriesSliderProps {
  categories: (Category & { productCount: number })[];
}

export const CategoriesSlider = ({ categories }: CategoriesSliderProps) => {
  return (
    <Swiper
      slidesPerView={2}
      spaceBetween={16}
      modules={[Navigation, Pagination, Autoplay]}
      className="categories-swiper"
      navigation={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      breakpoints={{
        480: { slidesPerView: 2, spaceBetween: 16 },
        640: { slidesPerView: 2, spaceBetween: 20 },
        768: { slidesPerView: 3, spaceBetween: 30 },
        1024: { slidesPerView: 4, spaceBetween: 30 },
      }}
    >
      {categories.map((category, index) => (
        <SwiperSlide key={category._id}>
          <CategoryCard
            image={category.imageUrl || ""}
            title={category.name}
            itemCount={category.productCount}
            link={"category/" + category.slug}
            delay={index * 0.1}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
