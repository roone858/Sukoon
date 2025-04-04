import { useEffect, useState, useMemo } from "react";
import SearchAndFilters from "./components/ui/SearchAndFilters";
import CategoriesSlider from "./components/ui/CategoriesSlider";
import ProductsList from "./components/products/ProductsList";
import ProductsPagination from "./components/products/ProductsPagination";
import PromoSection from "./components/ui/PromoSection";
import { useStoreContext } from "../../context/hooks/useStoreContext";
import ProductsGrid from "./components/products/ProductsGrid";

const PRODUCTS_PER_PAGE = 8; // Number of products to show per page

type SortOption = "popular" | "newest" | "price-low" | "price-high";

const MegaProductsPage = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeCategory, setActiveCategory] = useState("الكل");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("popular");
  const { products, categories, isLoading } = useStoreContext();

  // Sort products based on selected option
  const sortedProducts = useMemo(() => {
    const productsToSort = [...products];
    
    switch (sortOption) {
      case "popular":
        return productsToSort.sort((a, b) => (b.stock || 0) - (a.stock || 0));
      case "newest":
        return productsToSort.sort((a, b) => 
          new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
        );
      case "price-low":
        return productsToSort.sort((a, b) => a.price - b.price);
      case "price-high":
        return productsToSort.sort((a, b) => b.price - a.price);
      default:
        return productsToSort;
    }
  }, [products, sortOption]);

  // Filter products based on category and search query
  const filteredProducts = useMemo(() => {
    let result = sortedProducts;

    // Filter by category
    if (activeCategory !== "الكل") {
      result = result.filter((product) =>
        product.categories.includes(activeCategory)
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          (product.description &&
            product.description.toLowerCase().includes(query))
      );
    }

    return result;
  }, [sortedProducts, activeCategory, searchQuery]);

  // Paginate products
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Optional: Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSortChange = (option: SortOption) => {
    setSortOption(option);
    setCurrentPage(1); // Reset to first page when sorting changes
  };

  useEffect(() => {
    // Reset to first page when category changes
    setCurrentPage(1);
  }, [activeCategory]);

  return (
    <div className="bg-gray-50 min-h-screen" dir="rtl">
      <SearchAndFilters
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        showFilters={showFilters}
        onToggleFilters={() => setShowFilters(!showFilters)}
        onSearch={handleSearch}
      />

      <CategoriesSlider
        categories={["الكل", ...categories]}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <main className="container mx-auto px-4 py-8">
        {isLoading ? (
          <ProductsGrid products={[]} loading={isLoading} />
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium text-gray-700">
                عرض {filteredProducts.length} منتج
              </h2>
              <div className="flex items-center gap-2 text-sm">
                <span>ترتيب حسب:</span>
                <select
                  className="border rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-purple-500"
                  value={sortOption}
                  onChange={(e) => handleSortChange(e.target.value as SortOption)}
                >
                  <option value="popular">الأكثر مبيعًا</option>
                  <option value="newest">الأحدث</option>
                  <option value="price-low">السعر من الأقل للأعلى</option>
                  <option value="price-high">السعر من الأعلى للأقل</option>
                </select>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium text-gray-700 mb-2">
                  لا توجد منتجات متطابقة
                </h3>
                <p className="text-gray-500">
                  لم نتمكن من العثور على أي منتجات تطابق بحثك
                </p>
              </div>
            ) : viewMode === "grid" ? (
              <ProductsGrid products={paginatedProducts} />
            ) : (
              <ProductsList products={paginatedProducts} />
            )}

            {filteredProducts.length > PRODUCTS_PER_PAGE && (
              <ProductsPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </main>

      <PromoSection />
    </div>
  );
};

export default MegaProductsPage;