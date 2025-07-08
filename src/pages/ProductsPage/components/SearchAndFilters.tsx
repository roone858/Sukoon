import { FiSearch, FiFilter, FiGrid, FiList } from "react-icons/fi";

interface SearchAndFiltersProps {
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
  filterBtn?: boolean; // Optional prop to control filter button visibility
  onToggleFilters: () => void;
  onSearch: (query: string) => void;
}

const SearchAndFilters = ({
  viewMode,
  onViewModeChange,
  filterBtn = false,
  onToggleFilters,
  onSearch,
}: SearchAndFiltersProps) => {
  return (
    <div className="bg-white rounded  top-0 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col gap-4 items-center md:items-start">
          <div className="relative flex-1 w-full">
            <input
              type="text"
              placeholder="ابحث عن منتجات سكون..."
              className="w-full pr-10 pl-4 py-2 border-1 border-gray-400  rounded-lg focus:outline-none focus:ring-2   focus:ring-purple-500  focus:bg-white  outline-none text-sm "
              onChange={(e) => onSearch(e.target.value)}
            />
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
          </div>

          <div className=" flex items-center justify-between gap-2 w-full  lg:justify-end">
            {filterBtn ? (
              <button
                onClick={onToggleFilters}
                className="flex items-center  gap-1 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg text-sm lg:hidden"
              >
                <FiFilter />
                <span>الفلاتر</span>
              </button>
            ) : null}
            <div className="flex bg-gray-100 rounded-lg">
              <button
                onClick={() => onViewModeChange("grid")}
                className={`p-2 ${
                  viewMode === "grid" ? "bg-purple-100 text-purple-700" : ""
                }`}
                aria-label="عرض شبكي"
              >
                <FiGrid />
              </button>
              <button
                onClick={() => onViewModeChange("list")}
                className={`p-2 ${
                  viewMode === "list" ? "bg-purple-100 text-purple-700" : ""
                }`}
                aria-label="عرض قائمة"
              >
                <FiList />
              </button>
            </div>
          </div>
        </div>

      
      </div>
    </div>
  );
};

export default SearchAndFilters;
