import { useState, useEffect, useRef, useCallback, memo } from "react";
import { IoSearchOutline } from "react-icons/io5";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = memo(({ onSearch }: SearchBarProps) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Memoize the debounced search handler
  const handleSearch = useCallback(
    (query: string) => {
      if (query.trim()) {
        onSearch(query);
      } else {
        onSearch(""); // Clear search results when query is empty
      }
    },
    [onSearch]
  );

  useEffect(() => {
    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Set new timeout
    searchTimeoutRef.current = setTimeout(() => {
      
    }, 1000);

    // Cleanup function
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery]);

  // Memoize the input change handler
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
      handleSearch(e.target.value);
    },
    []
  );

  // Memoize focus handlers
  const handleFocus = useCallback(() => setIsSearchFocused(true), []);
  const handleBlur = useCallback(() => setIsSearchFocused(false), []);

  return (
    <div className="relative hidden md:block">
      <input
        type="text"
        placeholder="ابحث عن المنتجات..."
        value={searchQuery}
        onChange={handleInputChange}
        className={`w-48 bg-gray-100 rounded-lg py-2 pr-4 pl-10 transition-all duration-300 ${
          isSearchFocused ? "w-64 ring-2 ring-purple-500 bg-white" : ""
        }`}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <IoSearchOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
    </div>
  );
});

SearchBar.displayName = "SearchBar"; // Add display name for better debugging
export default SearchBar;