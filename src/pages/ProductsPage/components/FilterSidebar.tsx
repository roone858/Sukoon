import { useState, useEffect } from "react";
import { FiChevronDown, FiChevronUp, FiX } from "react-icons/fi";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { Category } from "../../../services/categories.service";

interface FilterSidebarProps {
  categories: Category[];
  selectedCategories: Category[];
  toggleCategory: (category: Category) => void;
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

  // Close mobile filters when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileFiltersOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setMobileFiltersOpen]);

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Mobile filter button for extra small screens
  // if (!mobileFiltersOpen) {
  //   return (
  //     <button
  //       onClick={() => setMobileFiltersOpen(true)}
  //       className="fixed bottom-6 left-6 z-40 lg:hidden flex items-center justify-center w-14 h-14 rounded-full bg-purple-600 text-white shadow-lg hover:bg-purple-700 transition-colors"
  //       aria-label="فتح الفلاتر"
  //     >
  //       <FiFilter className="w-6 h-6" />
  //     </button>
  //   );
  // }

  return (
    <>
      {/* Mobile overlay with enhanced touch target */}
      <div
        onClick={() => setMobileFiltersOpen(false)}
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          mobileFiltersOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        } lg:hidden`}
      />

      {/* Sidebar container */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-full max-w-xs bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
          mobileFiltersOpen ? "translate-x-0" : "-translate-x-full"
        } lg:relative lg:inset-auto lg:translate-x-0 lg:w-72 lg:shadow-none lg:bg-transparent`}
      >
        <div className="h-full overflow-y-auto pb-24 lg:pb-0">
          {/* Mobile header with close button */}
          <div className="sticky top-0 z-10 bg-white p-4 border-b flex items-center justify-between lg:hidden">
            <h2 className="text-xl font-bold text-gray-900">تصفية المنتجات</h2>
            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="p-1 text-gray-500 hover:text-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
              aria-label="إغلاق الفلاتر"
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>

          <div className="p-4 space-y-6">
            {/* Categories section */}
            <div className="border-b border-gray-200 pb-4">
              <button
                onClick={() => toggleSection("categories")}
                className="flex items-center justify-between w-full text-left mb-2"
                aria-expanded={expandedSections.categories}
              >
                <h3 className="text-lg font-semibold text-gray-900">الفئات</h3>
                {expandedSections.categories ? (
                  <FiChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <FiChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>

              {expandedSections.categories && (
                <div className="grid grid-cols-2 gap-2 mt-3">
                  {categories.map((category) => (
                    <label
                      key={category._id}
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.some(
                          (cat) => cat._id == category._id
                        )}
                        onChange={() => toggleCategory(category)}
                        className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                      />
                      <span className="text-sm text-gray-700 truncate">
                        {category.name}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Price range section */}
            <div className="border-b border-gray-200 pb-4">
              <button
                onClick={() => toggleSection("price")}
                className="flex items-center justify-between w-full text-left mb-2"
                aria-expanded={expandedSections.price}
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  نطاق السعر
                </h3>
                {expandedSections.price ? (
                  <FiChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <FiChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>

              {expandedSections.price && (
                <div className="mt-3 px-2">
                  <Slider
                    range
                    min={minPrice}
                    max={maxPrice}
                    value={priceRange}
                    onChange={(value) =>
                      setPriceRange(value as [number, number])
                    }
                    trackStyle={[{ backgroundColor: "#7C3AED" }]}
                    handleStyle={[
                      { backgroundColor: "#7C3AED", borderColor: "#7C3AED" },
                      { backgroundColor: "#7C3AED", borderColor: "#7C3AED" },
                    ]}
                    railStyle={{ backgroundColor: "#E5E7EB" }}
                  />
                  <div className="flex justify-between mt-3 text-sm">
                    <span className="px-3 py-1 bg-gray-100 rounded-full">
                      {priceRange[0]} ر.س
                    </span>
                    <span className="px-3 py-1 bg-gray-100 rounded-full">
                      {priceRange[1]} ر.س
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Sort options section */}
            <div className="border-b border-gray-200 pb-4">
              <button
                onClick={() => toggleSection("sort")}
                className="flex items-center justify-between w-full text-left mb-2"
                aria-expanded={expandedSections.sort}
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  ترتيب حسب
                </h3>
                {expandedSections.sort ? (
                  <FiChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <FiChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>

              {expandedSections.sort && (
                <div className="space-y-2 mt-3">
                  {[
                    { value: "latest", label: "الأحدث" },
                    { value: "best-selling", label: "الأكثر مبيعًا" },
                    { value: "top-rated", label: "الأعلى تقييمًا" },
                    { value: "price-low", label: "السعر: من الأقل للأعلى" },
                    { value: "price-high", label: "السعر: من الأعلى للأقل" },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="sort"
                        value={option.value}
                        checked={sortOption === option.value}
                        onChange={(e) => setSortOption(e.target.value)}
                        className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                      />
                      <span className="text-sm text-gray-700">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile apply filters button */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 lg:hidden">
          <button
            onClick={() => setMobileFiltersOpen(false)}
            className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
          >
            تطبيق الفلاتر
          </button>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;
