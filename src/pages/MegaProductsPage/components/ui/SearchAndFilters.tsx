import { FiSearch, FiFilter, FiGrid, FiList } from "react-icons/fi";

interface SearchAndFiltersProps {
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
  showFilters: boolean;
  filterBtn?: boolean; // Optional prop to control filter button visibility
  onToggleFilters: () => void;
  onSearch: (query: string) => void;
}

const SearchAndFilters = ({
  viewMode,
  onViewModeChange,
  showFilters,
  filterBtn = false,
  onToggleFilters,
  onSearch,
}: SearchAndFiltersProps) => {
  return (
    <div className="bg-white sticky top-0 z-10 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col gap-4 items-center">
          <div className="relative flex-1 w-full">
            <input
              type="text"
              placeholder="ابحث عن منتجات سكون..."
              className="w-full pr-10 pl-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              onChange={(e) => onSearch(e.target.value)}
            />
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            {filterBtn ? (
              <button
                onClick={onToggleFilters}
                className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg text-sm md:hidden"
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

        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">السعر</label>
                <select className="w-full border rounded-lg p-2 text-sm">
                  <option>جميع الفئات</option>
                  <option>أقل من 1000 ر.س</option>
                  <option>1000 - 3000 ر.س</option>
                  <option>أكثر من 3000 ر.س</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchAndFilters;
