import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { Category } from "../../../../services/categories.service";

interface CategoriesSliderProps {
  categories: (Category | { _id: string; name: string })[];
  activeCategoryId: string;
  onCategoryChange: (categoryId: string) => void;
}

const CategoriesSlider = ({
  categories,
  activeCategoryId,
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
          {categories.map((category) => (
            <SwiperSlide key={category._id} className="!w-auto">
              <button
                onClick={() => onCategoryChange(category._id)}
                className={`px-4 py-2 rounded-full whitespace-nowrap text-sm ${
                  activeCategoryId === category._id
                    ? "bg-purple-700 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {category.name}
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default CategoriesSlider;
