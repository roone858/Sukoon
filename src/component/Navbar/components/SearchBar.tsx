import { useState, useEffect, useRef } from "react";
import { IoSearchOutline } from 'react-icons/io5';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    // Clear previous timeout
    if (searchTimeoutRef.current) {
      window.clearTimeout(searchTimeoutRef.current);
    }

    // Set new timeout
    searchTimeoutRef.current = window.setTimeout(() => {
      if (searchQuery.trim()) {
        onSearch(searchQuery);
      } else {
        onSearch(""); // Clear search results when query is empty
      }
    }, 1000);

    // Cleanup function
    return () => {
      if (searchTimeoutRef.current) {
        window.clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery, onSearch]);

  return (
    <div className="relative hidden md:block">
      <input
        type="text"
        placeholder="ابحث عن المنتجات..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className={`w-48 bg-gray-100 rounded-lg py-2 pr-4 pl-10 transition-all duration-300 ${
          isSearchFocused ? 'w-64 ring-2 ring-purple-500 bg-white' : ''
        }`}
        onFocus={() => setIsSearchFocused(true)}
        onBlur={() => setIsSearchFocused(false)}
      />
      <IoSearchOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
    </div>
  );
};

export default SearchBar; 