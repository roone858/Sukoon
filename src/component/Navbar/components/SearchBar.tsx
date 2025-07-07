import { useState, useCallback, memo, FormEvent } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const SearchBar = memo(() => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigator = useNavigate();

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
      // Optional: Add debounced search as user types
    },
    []
  );
  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      navigator("/products?search=" + encodeURIComponent(searchQuery));
    },
    [navigator, searchQuery]
  );

  return (
    <form onSubmit={handleSubmit} className="relative hidden md:block">
      <input
        type="text"
        placeholder="ابحث عن المنتجات..."
        value={searchQuery}
        className={
          "w-48 bg-gray-100 rounded-lg py-2 pr-4 pl-10 transition-all duration-300 focus:w-64 focus:ring-2 focus:ring-purple-500 border-0  focus:bg-white  outline-none text-sm text-gray-700 dark:bg-gray-800 dark:text-gray-300"
        }
        onChange={handleInputChange}
        aria-label="Search products"
      />
      <button
        type="submit"
        aria-label="Submit search"
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
      >
        <IoSearchOutline />
      </button>
    </form>
  );
});

SearchBar.displayName = "SearchBar";
export default SearchBar;
