// components/Products/FilterSidebar.tsx
import { useState } from "react";
import { FiChevronDown, FiChevronUp, FiX } from "react-icons/fi";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

interface FilterSidebarProps {
  categories: string[];
  selectedCategories: string[];
  toggleCategory: (category: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  minPrice: number;
  maxPrice: number;
  sortOption: string;
  setSortOption: (option: string) => void;
  mobileFiltersOpen: boolean;
  setMobileFiltersOpen: (open: boolean) => void;
}

const FilterSidebar = ({
  categories,
  selectedCategories,
  toggleCategory,
  priceRange,
  setPriceRange,
  minPrice,
  maxPrice,
  sortOption,
  setSortOption,
 
  mobileFiltersOpen,
  setMobileFiltersOpen,
}: FilterSidebarProps) => {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    sort: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div
      className={`fixed inset-0 z-50 lg:relative lg:inset-auto lg:w-80 bg-white lg:bg-transparent transition-transform duration-300 ease-in-out ${
        mobileFiltersOpen
          ? "translate-x-0"
          : "translate-x-full lg:translate-x-0"
      }`}
    >
      <div className="h-full lg:h-auto bg-white shadow-lg lg:shadow-none rounded-lg p-6">
        {/* Mobile Header */}
        <div className="flex items-center justify-between mb-6 lg:hidden">
          <h2 className="text-lg font-semibold text-gray-900">الفلاتر</h2>
          <button
            onClick={() => setMobileFiltersOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        {/* Categories Section */}
        <div className="mb-6">
          <button
            onClick={() => toggleSection("categories")}
            className="flex items-center justify-between w-full text-left mb-3"
          >
            <h3 className="text-lg font-semibold text-gray-900">الفئات</h3>
            {expandedSections.categories ? (
              <FiChevronUp className="w-5 h-5" />
            ) : (
              <FiChevronDown className="w-5 h-5" />
            )}
          </button>
          {expandedSections.categories && (
            <div className="space-y-2">
              {categories.map((category) => (
                <label
                  key={category}
                  className="flex items-center gap-2 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => toggleCategory(category)}
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <span className="text-gray-700 group-hover:text-purple-600">
                    {category}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Price Range Section */}
        <div className="mb-6">
          <button
            onClick={() => toggleSection("price")}
            className="flex items-center justify-between w-full text-left mb-3"
          >
            <h3 className="text-lg font-semibold text-gray-900">السعر</h3>
            {expandedSections.price ? (
              <FiChevronUp className="w-5 h-5" />
            ) : (
              <FiChevronDown className="w-5 h-5" />
            )}
          </button>
          {expandedSections.price && (
            <div className="px-4">
              <Slider
                range
                min={minPrice}
                max={maxPrice}
                value={priceRange}
                onChange={(value) => setPriceRange(value as [number, number])}
              />
              <div className="flex justify-between mt-2 text-sm text-gray-600">
                <span>{priceRange[1]} ر.س</span>
                <span>{priceRange[0]} ر.س</span>
              </div>
            </div>
          )}
        </div>

        {/* Sort Section */}
        <div className="mb-6">
          <button
            onClick={() => toggleSection("sort")}
            className="flex items-center justify-between w-full text-left mb-3"
          >
            <h3 className="text-lg font-semibold text-gray-900">الترتيب</h3>
            {expandedSections.sort ? (
              <FiChevronUp className="w-5 h-5" />
            ) : (
              <FiChevronDown className="w-5 h-5" />
            )}
          </button>
          {expandedSections.sort && (
            <div className="space-y-2">
              {[
                { value: "latest", label: "الأحدث" },
                { value: "best-selling", label: "الأكثر مبيعًا" },
                { value: "top-rated", label: "الأعلى تقييمًا" },
                { value: "price-low", label: "الأقل سعرًا" },
                { value: "price-high", label: "الأعلى سعرًا" },
              ].map((option) => (
                <label
                  key={option.value}
                  className="flex items-center gap-2 cursor-pointer group"
                >
                  <input
                    type="radio"
                    name="sort"
                    value={option.value}
                    checked={sortOption === option.value}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                  />
                  <span className="text-gray-700 group-hover:text-purple-600">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default FilterSidebar;