import React, { useState } from "react";

// Define the props interface
interface SideMenuProps {
  categories: string[]; // List of categories
  onSelectCategory: (category: string) => void; // Callback when a category is selected
}

const SideMenu: React.FC<SideMenuProps> = ({ categories, onSelectCategory }) => {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // Handle category click event
  const handleCategoryClick = (category: string) => {
    setActiveCategory(category); // Update the active category
    onSelectCategory(category); // Notify the parent component
  };

  return (
    <div className="w-64 bg-white shadow-sm p-4 rounded-lg">
      {/* Side Menu Title */}
      <h3 className="text-lg font-semibold mb-4">التصنيفات</h3>

      {/* Category List */}
      <ul className="space-y-2">
        {/* "All" Button */}
        <li>
          <button
            className={`w-full text-left px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeCategory === "all"
                ? "bg-purple-600 text-white" // Active state
                : "bg-gray-100 text-gray-700 hover:bg-gray-200" // Inactive state
            }`}
            onClick={() => handleCategoryClick("all")}
          >
            الكل
          </button>
        </li>

        {/* Map through categories and render buttons */}
        {categories.map((category) => (
          <li key={category}>
            <button
              className={`w-full text-left px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeCategory === category
                  ? "bg-purple-600 text-white" // Active state
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200" // Inactive state
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideMenu;