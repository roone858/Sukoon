import { useState, useEffect, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { FiFilter } from "react-icons/fi";
import { debounce } from "lodash";
import { Product } from "../../util/types";
import { useStoreContext } from "../../context/hooks/useStoreContext";
import LoadingSpinner from "../../component/LoadingSpinner";
import FilterSidebar from "./components/FilterSidebar";
import ActiveFilters from "./components/ActiveFilters";
import ProductsGrid from "./components/ProductsGrid";
import Pagination from "./components/Pagination";

const ITEMS_PER_PAGE = 12;
const DEBOUNCE_DELAY = 300;

const ProductsPage = () => {
  const { products, isLoading } = useStoreContext();
  const [searchParams, setSearchParams] = useSearchParams();

  // State initialization
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortOption, setSortOption] = useState<string>("latest");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Memoized derived values
  const minPrice = useMemo(() => {
    const prices = products.map((p) => p.price);
    return prices.length > 0 ? Math.floor(Math.min(...prices)) : 0;
  }, [products]);

  const maxPrice = useMemo(() => {
    const prices = products.map((p) => p.price);
    return prices.length > 0 ? Math.ceil(Math.max(...prices)) : 1000;
  }, [products]);

  const categories = useMemo(() => {
    return [...new Set(products.flatMap((product) => product.categories))];
  }, [products]);

  // Debounced filter application
  const applyFilters = useCallback(() => {
    let result = [...products];

    if (selectedCategories.length > 0) {
      result = result.filter((product) =>
        product.categories.some((cat) => selectedCategories.includes(cat))
      );
    }

    result = result.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sorting logic
    switch (sortOption) {
      case "latest":
        result = result.sort(
          (a, b) =>
            new Date(b.createdAt || "").getTime() -
            new Date(a.createdAt || "").getTime()
        );
        break;
      case "price-low":
        result = result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result = result.sort((a, b) => b.price - a.price);
        break;
    }

    setFilteredProducts(result);
  }, [products, selectedCategories, priceRange, sortOption]);

  // Create debounced version of applyFilters
  const debouncedApplyFilters = useMemo(
    () => debounce(applyFilters, DEBOUNCE_DELAY),
    [applyFilters]
  );

  // Initialize from URL params
  useEffect(() => {
    const initialCategories = searchParams.get("categories")?.split(",").filter(Boolean) || [];
    const initialMinPrice = Number(searchParams.get("minPrice")) || minPrice;
    const initialMaxPrice = Number(searchParams.get("maxPrice")) || maxPrice;
    const initialSort = searchParams.get("sort") || "latest";
    const initialPage = Number(searchParams.get("page")) || 1;

    setSelectedCategories(initialCategories);
    setPriceRange([initialMinPrice, initialMaxPrice]);
    setSortOption(initialSort);
    setCurrentPage(initialPage);
  }, [minPrice, maxPrice, searchParams]);

  // Apply filters when dependencies change
  useEffect(() => {
    debouncedApplyFilters();
    return () => debouncedApplyFilters.cancel();
  }, [debouncedApplyFilters]);

  // Update URL params
  useEffect(() => {
    const params = new URLSearchParams();

    if (selectedCategories.length > 0) {
      params.set("categories", selectedCategories.join(","));
    }
    if (priceRange[0] !== minPrice) {
      params.set("minPrice", priceRange[0].toString());
    }
    if (priceRange[1] !== maxPrice) {
      params.set("maxPrice", priceRange[1].toString());
    }
    if (sortOption !== "latest") {
      params.set("sort", sortOption);
    }
    if (currentPage > 1) {
      params.set("page", currentPage.toString());
    }

    setSearchParams(params);
  }, [selectedCategories, priceRange, sortOption, currentPage, minPrice, maxPrice, setSearchParams]);

  // Handler functions
  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
    setCurrentPage(1);
  };

  const handlePriceReset = () => {
    setPriceRange([minPrice, maxPrice]);
    setCurrentPage(1);
  };

  const handleSortReset = () => {
    setSortOption("latest");
    setCurrentPage(1);
  };

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const currentProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* <Breadcrumb links={breadcrumbLinks} /> */}

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
            selectedCategories={selectedCategories}
            toggleCategory={handleCategoryToggle}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            minPrice={minPrice}
            maxPrice={maxPrice}
            sortOption={sortOption}
            setSortOption={setSortOption}
            mobileFiltersOpen={mobileFiltersOpen}
            setMobileFiltersOpen={setMobileFiltersOpen}
          />

          {/* Main content */}
          <div className="flex-1">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">المنتجات</h1>
              <ActiveFilters
                selectedCategories={selectedCategories}
                priceRange={priceRange}
                sortOption={sortOption}
                onRemoveCategory={handleCategoryToggle}
                onResetPrice={handlePriceReset}
                onResetSort={handleSortReset}
              />
            </div>

            <ProductsGrid products={currentProducts} />

            {filteredProducts.length > ITEMS_PER_PAGE && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => {
                  setCurrentPage(page);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
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
