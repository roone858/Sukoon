import React, { useState } from "react";

interface CategoryBarProps {
  categories: string[]; // List of categories
  onSelectCategory: (category: string) => void; // Callback when a category is selected
}

const CategoryBar: React.FC<CategoryBarProps> = ({ categories, onSelectCategory }) => {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    onSelectCategory(category);
  };

  return (
    <div className="bg-white shadow-sm p-4 rounded-lg mb-8">
      {/* Category Bar Title */}
      <h3 className="text-lg font-semibold mb-4">التصنيفات</h3>

      {/* Scrollable Container for Small Screens */}
      <div className="overflow-x-auto whitespace-nowrap scrollbar-hide">
        <div className="flex gap-2 w-max">
          {/* "All" Button */}
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === "all"
                ? "bg-purple-600 text-white" // Active state
                : "bg-gray-100 text-gray-700 hover:bg-gray-200" // Inactive state
            }`}
            onClick={() => handleCategoryClick("all")}
          >
            الكل
          </button>

          {/* Map through categories and render buttons */}
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category
                  ? "bg-purple-600 text-white" // Active state
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200" // Inactive state
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryBar;