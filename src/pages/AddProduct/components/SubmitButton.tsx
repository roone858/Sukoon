import React from "react";
import { SubmitButtonProps } from "./types";

const SubmitButton: React.FC<SubmitButtonProps> = ({ isLoading }) => (
  <button
    type="submit"
    disabled={isLoading}
    className="mt-5 cursor-pointer tracking-wide font-semibold bg-purple-800 text-gray-100 w-full py-4 rounded-lg hover:bg-purple-900 active:bg-purple-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed"
  >
    {isLoading ? (
      <span className="mr-3">جاري الإضافة...</span>
    ) : (
      <>
        <svg
          className="w-6 h-6 -mr-2"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 4v16m8-8H4" />
        </svg>
        <span className="mr-3">إضافة المنتج</span>
      </>
    )}
  </button>
);

export default SubmitButton;