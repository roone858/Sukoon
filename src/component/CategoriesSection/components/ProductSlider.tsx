// components/Categories/ProductSlider.tsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import "../style.css";
import { Product } from "../../../util/types";
import ProductCard from "../ProductCard";

interface ProductSliderProps {
  products: Product[];
  isCategorySelected: boolean;
}

export const ProductSlider = ({ products, isCategorySelected }: ProductSliderProps) => (
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
    {products.map((product, index) => (
      <SwiperSlide key={product.id}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.5,
                delay: isCategorySelected ? index * 0.1 : 0.2,
                ease: "easeOut",
              },
            },
          }}
        >
          <ProductCard product={product} />
        </motion.div>
      </SwiperSlide>
    ))}
  </Swiper>
);