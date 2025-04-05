import React from "react";
import { FiSearch, FiX } from "react-icons/fi";

interface ProductSearchProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClearSearch: () => void;
}

const ProductSearch: React.FC<ProductSearchProps> = ({
  searchTerm,
  onSearchChange,
  onClearSearch,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
      <div className="relative max-w-md">
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <FiSearch className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="ابحث عن منتج..."
          value={searchTerm}
          onChange={onSearchChange}
          className="w-full pr-10 pl-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
        />
        {searchTerm && (
          <button
            onClick={onClearSearch}
            className="absolute inset-y-0 left-0 pl-3 flex items-center"
          >
            <FiX className="h-5 w-5 text-gray-400 hover:text-gray-500" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductSearch;