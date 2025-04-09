import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { Category } from "../../../../types/category.type";

// Helper function to get full category path
const getCategoryPath = (category: Category): string => {
  if (!category.ancestors?.length) return category.name;
  const ancestorNames = category.ancestors.map(a => a.name);
  return [...ancestorNames, category.name].join(' / ');
};

interface CategoriesSliderProps {
  categories: Category[];
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
                title={category._id === "all" ? category.name : getCategoryPath(category)}
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
