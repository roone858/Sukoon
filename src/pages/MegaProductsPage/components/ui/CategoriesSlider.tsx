import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

interface CategoriesSliderProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

const CategoriesSlider = ({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoriesSliderProps) => {
  return (
    <div className="bg-white border-y border-gray-200 py-3 overflow-x-auto">
      <div className="container mx-auto px-4">
        <Swiper
          modules={[Pagination]}
          spaceBetween={10}
          slidesPerView="auto"
          freeMode={true}
          className="!py-2"
        >
          {categories.map((category, index) => (
            <SwiperSlide key={index} className="!w-auto">
              <button
                onClick={() => onCategoryChange(category)}
                className={`px-4 py-2 rounded-full whitespace-nowrap text-sm ${
                  activeCategory === category
                    ? "bg-purple-700 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default CategoriesSlider;
