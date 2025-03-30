import React from "react";
import { TagInputSectionProps } from "./types";

const TagInputSection: React.FC<TagInputSectionProps> = ({
  label,
  items,
  currentInput,
  onInputChange,
  onAddItem,
  onRemoveItem,
  placeholder,
  maxLength,
}) => (
  <div className="mt-5">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <div className="flex">
      <input
        type="text"
        value={currentInput}
        onChange={(e) => onInputChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 px-2 py-2 rounded-r-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
        maxLength={maxLength}
      />
      <button
        type="button"
        onClick={onAddItem}
        className="bg-purple-600 text-white px-4 py-2 rounded-l-lg hover:bg-purple-700"
      >
        إضافة
      </button>
    </div>
    {items.length > 0 && (
      <div className="mt-2 flex flex-wrap gap-2">
        {items.map((item, index) => (
          <span
            key={index}
            className="inline-flex items-center px-3 py-1 rounded-full bg-gray-200 text-gray-800 text-sm"
          >
            {item}
            <button
              type="button"
              onClick={() => onRemoveItem(item)}
              className="mr-1 text-gray-600 hover:text-gray-900"
            >
              ×
            </button>
          </span>
        ))}
      </div>
    )}
  </div>
);

export default TagInputSection;