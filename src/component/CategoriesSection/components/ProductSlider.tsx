// components/Categories/ProductSlider.tsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "../style.css";
import ProductCard from "../ProductCard";
import { Product } from "../../../types/product.type";

interface ProductSliderProps {
  products: Product[];
}

export const ProductSlider = ({ products }: ProductSliderProps) => (
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
    {products.map((product) => (
      <SwiperSlide key={product.id}>
        <div className="opacity-100">
          <ProductCard product={product} />
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
);
