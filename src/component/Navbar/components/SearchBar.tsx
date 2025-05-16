import { useState, useCallback, memo, useRef, useLayoutEffect } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { debounce } from "../../../utils/performance";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = memo(({ onSearch }: SearchBarProps) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const isComposing = useRef(false);

  // Create a stable debounced search function
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      if (query.trim()) {
        onSearch(query);
      } else {
        onSearch(""); // Clear search results when query is empty
      }
    }, 300),
    [onSearch]
  );

  // Use Layout Effect for smoother transitions
  useLayoutEffect(() => {
    if (!isComposing.current) {
      debouncedSearch(searchQuery);
    }
  }, [searchQuery, debouncedSearch]);

  // Optimized input change handler
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Use requestAnimationFrame for smoother state updates
    requestAnimationFrame(() => {
      setSearchQuery(value);
    });
  }, []);

  // Optimized focus handlers with pointer events
  const handleFocus = useCallback(() => {
    setIsSearchFocused(true);
    inputRef.current?.setAttribute('autocomplete', 'off');
  }, []);

  const handleBlur = useCallback(() => {
    setIsSearchFocused(false);
  }, []);

  // Handle IME composition events
  const handleCompositionStart = useCallback(() => {
    isComposing.current = true;
  }, []);

  const handleCompositionEnd = useCallback((e: React.CompositionEvent<HTMLInputElement>) => {
    isComposing.current = false;
    // Trigger search after IME composition ends
    debouncedSearch(e.currentTarget.value);
  }, [debouncedSearch]);

  return (
    <div className="relative hidden md:block">
      <input
        ref={inputRef}
        type="search"
        role="searchbox"
        aria-label="ابحث عن المنتجات"
        placeholder="ابحث عن المنتجات..."
        value={searchQuery}
        onChange={handleInputChange}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
        className={`w-48 bg-gray-100 rounded-lg py-2 pr-4 pl-10 transition-all duration-300 will-change-transform ${
          isSearchFocused ? "w-64 ring-2 ring-purple-500 bg-white" : ""
        }`}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onPointerDown={(e) => e.currentTarget.focus()}
      />
      <IoSearchOutline 
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" 
        aria-hidden="true"
      />
    </div>
  );
});

SearchBar.displayName = "SearchBar";
export default SearchBar;
