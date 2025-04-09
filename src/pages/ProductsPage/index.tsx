import { useStoreContext } from "../../context/hooks/useStoreContext";
import LoadingSpinner from "../../component/LoadingSpinner";
import FilterSidebar from "./components/FilterSidebar";
import ActiveFilters from "./components/ActiveFilters";
import Pagination from "./components/Pagination";
import { useProductFilters } from "./hooks/useProductFilters";
import { ITEMS_PER_PAGE } from "./constants";
import SearchAndFilters from "../MegaProductsPage/components/ui/SearchAndFilters";
import { useState } from "react";
import ProductsList from "../MegaProductsPage/components/products/ProductsList";
import ProductsGrid from "../MegaProductsPage/components/products/ProductsGrid";

const ProductsPage = () => {
  const { products, isLoading } = useStoreContext();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const {
    state,
    actions,
    filteredProducts,
    derivedData,
    mobileFiltersOpen,
    setMobileFiltersOpen,
    setSearchQuery,
  } = useProductFilters(products);

  const { currentPage } = state;
  const { categories, minPrice, maxPrice } = derivedData;

  // Pagination calculations
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 ">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile filter button */}

          <SearchAndFilters
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            showFilters={false}
            onToggleFilters={() => setMobileFiltersOpen(true)}
            onSearch={setSearchQuery}
          />

          {/* <CategoriesSlider
        categories={["الكل", ...categories]}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      /> */}

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
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                المنتجات
              </h1>
              <ActiveFilters
                selectedCategories={categories.filter((cat) =>
                  state.selectedCategories.find((s) => s._id == cat._id)
                )}
                priceRange={state.priceRange}
                sortOption={state.sortOption}
                onRemoveCategory={actions.onCategoryToggle}
                onResetPrice={actions.onPriceReset}
                onResetSort={actions.onSortReset}
              />
            </div>

            {viewMode === "grid" ? (
              <ProductsGrid products={currentProducts} />
            ) : (
              <ProductsList products={currentProducts} />
            )}

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
