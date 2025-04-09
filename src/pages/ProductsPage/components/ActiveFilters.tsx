// components/Products/ActiveFilters.tsx
import { FiX } from "react-icons/fi";
import { Category } from "../../../types/category.type";

interface ActiveFiltersProps {
  selectedCategories: Category[];
  priceRange: [number, number];
  sortOption: string;
  onRemoveCategory: (category: Category) => void;
  onResetPrice: () => void;
  onResetSort: () => void;
}

const sortOptionLabels: Record<string, string> = {
  latest: "الأحدث",
  "price-low": "الأقل سعراً",
  "price-high": "الأعلى سعراً",
};

const ActiveFilters = ({
  selectedCategories,
  priceRange,
  sortOption,
  onRemoveCategory,
  onResetPrice,
  onResetSort,
}: ActiveFiltersProps) => {
  if (
    selectedCategories.length === 0 &&
    sortOption === "latest" &&
    priceRange[0] === 0 &&
    priceRange[1] === 1000
  ) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {/* Category filters */}
      {selectedCategories.map((category) => (
        <button
          key={category.slug}
          onClick={() => onRemoveCategory(category)}
          className="inline-flex items-center bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm hover:bg-purple-200 transition-colors"
        >
          {category.name}
          <FiX className="mr-1 h-4 w-4" />
        </button>
      ))}

      {/* Price filter */}
      {(priceRange[0] !== 0 || priceRange[1] !== 1000) && (
        <button
          onClick={onResetPrice}
          className="inline-flex items-center bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm hover:bg-purple-200 transition-colors"
        >
          السعر: {priceRange[0]} - {priceRange[1]} ر.س
          <FiX className="mr-1 h-4 w-4" />
        </button>
      )}

      {/* Sort filter */}
      {sortOption !== "latest" && (
        <button
          onClick={onResetSort}
          className="inline-flex items-center bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm hover:bg-purple-200 transition-colors"
        >
          الترتيب: {sortOptionLabels[sortOption]}
          <FiX className="mr-1 h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default ActiveFilters;
