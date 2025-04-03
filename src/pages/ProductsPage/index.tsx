import { FiFilter } from "react-icons/fi";
import { useStoreContext } from "../../context/hooks/useStoreContext";
import LoadingSpinner from "../../component/LoadingSpinner";
import FilterSidebar from "./components/FilterSidebar";
import ActiveFilters from "./components/ActiveFilters";
import ProductsGrid from "./components/ProductsGrid";
import Pagination from "./components/Pagination";
import { useProductFilters } from "./hooks/useProductFilters";
import { ITEMS_PER_PAGE } from "./constants";

const ProductsPage = () => {
  const { products, isLoading } = useStoreContext();
  
  const {
    state,
    actions,
    filteredProducts,
    derivedData,
    mobileFiltersOpen,
    setMobileFiltersOpen
  } = useProductFilters(products);

  const { currentPage } = state;
  const { categories, minPrice, maxPrice } = derivedData;

  // Pagination calculations
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 mt-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile filter button */}
          <button
            className="lg:hidden flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm hover:bg-gray-50"
            onClick={() => setMobileFiltersOpen(true)}
          >
            <FiFilter className="w-5 h-5" />
            <span>الفلاتر</span>
          </button>

          {/* Filters */}
          <FilterSidebar
            categories={categories}
            selectedCategories={state.selectedCategories}
            toggleCategory={actions.onCategoryToggle}
            priceRange={state.priceRange}
            setPriceRange={actions.onPriceChange}
            minPrice={minPrice}
            maxPrice={maxPrice}
            sortOption={state.sortOption}
            setSortOption={actions.onSortChange}
            mobileFiltersOpen={mobileFiltersOpen}
            setMobileFiltersOpen={setMobileFiltersOpen}
          />

          {/* Main content */}
          <div className="flex-1">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">المنتجات</h1>
              <ActiveFilters
                selectedCategories={state.selectedCategories}
                priceRange={state.priceRange}
                sortOption={state.sortOption}
                onRemoveCategory={actions.onCategoryToggle}
                onResetPrice={actions.onPriceReset}
                onResetSort={actions.onSortReset}
              />
            </div>

            <ProductsGrid products={currentProducts} />

            {filteredProducts.length > ITEMS_PER_PAGE && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={actions.onPageChange}
              />
            )}

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  لم يتم العثور على منتجات تطابق معايير البحث
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
