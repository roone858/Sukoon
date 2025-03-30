import { useState, useMemo, useEffect } from "react";
import Breadcrumb from "../../component/Breadcrumb";
import Card from "../../component/ProductCard";
// import CategoryBar from "../../component/CategoryBar";
import { BreadcrumbLink, Product } from "../../util/types";
import { useStoreContext } from "../../context/useContext/useStoreContext";
import { FiFilter, FiX, FiChevronDown, FiChevronUp, FiCheck, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const ITEMS_PER_PAGE = 12;

const ProductsPage: React.FC = () => {
  const { products, isLoading } = useStoreContext();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortOption, setSortOption] = useState<string>("latest");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    sort: true,
  });
  const [activeFilters, setActiveFilters] = useState<{ type: string; value: string }[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  // Get current page products
  const currentProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredProducts]);

  const minPrice = useMemo(() => {
    const prices = products.map((p) => p.price);
    return prices.length > 0 ? Math.floor(Math.min(...prices)) : 0;
  }, [products]);

  const maxPrice = useMemo(() => {
    const prices = products.map((p) => p.price);
    return prices.length > 0 ? Math.ceil(Math.max(...prices)) : 1000;
  }, [products]);

  // Memoize the categories array to avoid unnecessary recalculations
  const categories = useMemo(() => {
    return [...new Set(products.flatMap((product) => product.categories))];
  }, [products]);

  // Apply all filters
  const applyFilters = () => {
    let result = [...products];

    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter((product) =>
        product.categories.some((cat) => selectedCategories.includes(cat))
      );
    }

    // Price filter
    result = result.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sorting
    result = sortProducts(result, sortOption);

    setFilteredProducts(result);
    setMobileFiltersOpen(false);
    updateActiveFilters();
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategories([]);
    setPriceRange([minPrice, maxPrice]);
    setSortOption("latest");
    setFilteredProducts(sortProducts(products, "latest"));
    setMobileFiltersOpen(false);
    setActiveFilters([]);
  };

  const updateActiveFilters = () => {
    const filters: { type: string; value: string }[] = [];
    
    if (selectedCategories.length > 0) {
      filters.push({ type: "categories", value: selectedCategories.join(", ") });
    }
    
    if (priceRange[0] !== minPrice || priceRange[1] !== maxPrice) {
      filters.push({ 
        type: "price", 
        value: `${priceRange[0]} - ${priceRange[1]} ر.س` 
      });
    }
    
    if (sortOption !== "latest") {
      filters.push({ 
        type: "sort", 
        value: getSortLabel(sortOption) 
      });
    }
    
    setActiveFilters(filters);
  };

  const getSortLabel = (value: string): string => {
    const options = {
      "latest": "الأحدث",
      "best-selling": "الأكثر مبيعًا",
      "top-rated": "الأعلى تقييمًا",
      "price-low": "الأقل سعرًا",
      "price-high": "الأعلى سعرًا",
    };
    return options[value as keyof typeof options] || value;
  };

  // Sorting function
  const sortProducts = (products: Product[], option: string): Product[] => {
    switch (option) {
      case "latest":
        return [...products].sort(
          (a, b) =>
            new Date(b.createdAt || "").getTime() -
            new Date(a.createdAt || "").getTime()
        );
      case "best-selling":
        return products;
      // return [...products].sort((a, b) => (b.sales || 0) - (a.sales || 0));
      case "top-rated":
        return products;
      // return [...products].sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case "price-low":
        return [...products].sort((a, b) => a.price - b.price);
      case "price-high":
        return [...products].sort((a, b) => b.price - a.price);
      default:
        return products;
    }
  };

  // Toggle category selection
  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  // Toggle filter section expansion
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  useEffect(() => {
    setFilteredProducts(products);
    setPriceRange([minPrice, maxPrice]);
  }, [products, minPrice, maxPrice]);

  // Breadcrumb links
  const breadcrumbLinks: BreadcrumbLink[] = [
    {
      to: "/",
      label: "الرئيسية",
      isActive: false,
    },
    {
      to: "/products",
      label: "المنتجات",
      isActive: true,
    },
  ];

  if (isLoading)
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex justify-center items-center">
        <div className="animate-pulse text-gray-500">جاري التحميل...</div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4">
        <Breadcrumb links={breadcrumbLinks} />
      </div>

      {/* Page Content */}
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          منتجاتنا
        </h1>

        {/* Active Filters Display */}
        {activeFilters.length > 0 && (
          <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
            <div className="flex flex-wrap gap-2">
              {activeFilters.map((filter, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-purple-100 text-purple-800 px-3 py-1.5 rounded-full text-sm"
                >
                  <span>{filter.value}</span>
                  <button
                    onClick={() => {
                      if (filter.type === "categories") {
                        setSelectedCategories([]);
                      } else if (filter.type === "price") {
                        setPriceRange([minPrice, maxPrice]);
                      } else if (filter.type === "sort") {
                        setSortOption("latest");
                      }
                      applyFilters();
                    }}
                    className="hover:text-purple-900"
                  >
                    <FiX size={16} />
                  </button>
                </div>
              ))}
              <button
                onClick={resetFilters}
                className="text-sm text-purple-600 hover:text-purple-800"
              >
                إعادة تعيين جميع الفلاتر
              </button>
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Desktop Filters - Left Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-4">
              {/* Categories Section */}
              <div className="mb-6">
                <div
                  className="flex justify-between items-center cursor-pointer mb-3"
                  onClick={() => toggleSection("categories")}
                >
                  <h3 className="font-semibold text-lg text-gray-800">
                    الفئات
                  </h3>
                  {expandedSections.categories ? (
                    <FiChevronUp />
                  ) : (
                    <FiChevronDown />
                  )}
                </div>
                {expandedSections.categories && (
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center">
                        <button
                          onClick={() => toggleCategory(category)}
                          className={`flex items-center w-full p-2 rounded-lg transition-colors ${
                            selectedCategories.includes(category)
                              ? "bg-purple-50 text-purple-700"
                              : "hover:bg-gray-50"
                          }`}
                        >
                          <div
                            className={`w-5 h-5 border rounded flex items-center justify-center mr-2 ${
                              selectedCategories.includes(category)
                                ? "bg-purple-600 border-purple-600"
                                : "border-gray-300"
                            }`}
                          >
                            {selectedCategories.includes(category) && (
                              <FiCheck className="text-white" size={14} />
                            )}
                          </div>
                          <span>{category}</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Price Range Section */}
              <div className="mb-6">
                <div
                  className="flex justify-between items-center cursor-pointer mb-3"
                  onClick={() => toggleSection("price")}
                >
                  <h3 className="font-semibold text-lg text-gray-800">
                    نطاق السعر
                  </h3>
                  {expandedSections.price ? <FiChevronUp /> : <FiChevronDown />}
                </div>
                {expandedSections.price && (
                  <div dir="rtl" className="px-2">
                    <Slider
                      range
                      min={minPrice}
                      max={maxPrice}
                      value={priceRange}
                      onChange={(value) =>
                        setPriceRange(value as [number, number])
                      }
                      trackStyle={[{ backgroundColor: "#4f46e5" }]}
                      handleStyle={[
                        { backgroundColor: "#4f46e5", borderColor: "#4f46e5" },
                        { backgroundColor: "#4f46e5", borderColor: "#4f46e5" },
                      ]}
                    />
                    <div className="flex justify-between mt-2 text-sm text-gray-600">
                      <span>{priceRange[0]} ر.س</span>
                      <span>{priceRange[1]} ر.س</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Sort Options Section */}
              <div className="mb-6">
                <div
                  className="flex justify-between items-center cursor-pointer mb-3"
                  onClick={() => toggleSection("sort")}
                >
                  <h3 className="font-semibold text-lg text-gray-800">
                    ترتيب حسب
                  </h3>
                  {expandedSections.sort ? <FiChevronUp /> : <FiChevronDown />}
                </div>
                {expandedSections.sort && (
                  <div className="space-y-2">
                    {[
                      { value: "latest", label: "الأحدث" },
                      { value: "best-selling", label: "الأكثر مبيعًا" },
                      { value: "top-rated", label: "الأعلى تقييمًا" },
                      { value: "price-low", label: "الأقل سعرًا" },
                      { value: "price-high", label: "الأعلى سعرًا" },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setSortOption(option.value)}
                        className={`flex items-center w-full p-2 rounded-lg transition-colors ${
                          sortOption === option.value
                            ? "bg-purple-50 text-purple-700"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 border rounded-full flex items-center justify-center mr-2 ${
                            sortOption === option.value
                              ? "bg-purple-600 border-purple-600"
                              : "border-gray-300"
                          }`}
                        >
                          {sortOption === option.value && (
                            <div className="w-2 h-2 bg-white rounded-full" />
                          )}
                        </div>
                        <span>{option.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={applyFilters}
                  className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  تطبيق الفلتر
                </button>
                <button
                  onClick={resetFilters}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  إعادة التعيين
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Filters - Drawer */}
          {mobileFiltersOpen && (
            <div className="fixed inset-0 z-50 overflow-hidden">
              <div
                className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
                onClick={() => setMobileFiltersOpen(false)}
              />
              <div className="absolute inset-y-0 right-0 max-w-full flex">
                <div className="relative w-screen max-w-md">
                  <div className="h-full flex flex-col bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto py-6 px-4">
                      <div className="flex items-start justify-between">
                        <h2 className="text-lg font-medium text-gray-900">
                          الفلاتر
                        </h2>
                        <button
                          type="button"
                          className="-mr-2 p-2 text-gray-400 hover:text-gray-500"
                          onClick={() => setMobileFiltersOpen(false)}
                        >
                          <FiX size={24} />
                        </button>
                      </div>

                      {/* Categories Section */}
                      <div className="mt-6">
                        <h3 className="font-semibold text-lg text-gray-800 mb-3">
                          الفئات
                        </h3>
                        <div className="space-y-2">
                          {categories.map((category) => (
                            <button
                              key={category}
                              onClick={() => toggleCategory(category)}
                              className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                                selectedCategories.includes(category)
                                  ? "bg-purple-50 text-purple-700"
                                  : "hover:bg-gray-50"
                              }`}
                            >
                              <div
                                className={`w-5 h-5 border rounded flex items-center justify-center mr-2 ${
                                  selectedCategories.includes(category)
                                    ? "bg-purple-600 border-purple-600"
                                    : "border-gray-300"
                                }`}
                              >
                                {selectedCategories.includes(category) && (
                                  <FiCheck className="text-white" size={14} />
                                )}
                              </div>
                              <span>{category}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Price Range Section */}
                      <div className="mt-6">
                        <h3 className="font-semibold text-lg text-gray-800 mb-3">
                          نطاق السعر
                        </h3>
                        <div className="px-2">
                          <Slider
                            range
                            min={minPrice}
                            max={maxPrice}
                            value={priceRange}
                            onChange={(value) =>
                              setPriceRange(value as [number, number])
                            }
                            trackStyle={[{ backgroundColor: "#4f46e5" }]}
                            handleStyle={[
                              {
                                backgroundColor: "#4f46e5",
                                borderColor: "#4f46e5",
                              },
                              {
                                backgroundColor: "#4f46e5",
                                borderColor: "#4f46e5",
                              },
                            ]}
                          />
                          <div className="flex justify-between mt-2 text-sm text-gray-600">
                            <span>{priceRange[0]} ر.س</span>
                            <span>{priceRange[1]} ر.س</span>
                          </div>
                        </div>
                      </div>

                      {/* Sort Options Section */}
                      <div className="mt-6">
                        <h3 className="font-semibold text-lg text-gray-800 mb-3">
                          ترتيب حسب
                        </h3>
                        <div className="space-y-2">
                          {[
                            { value: "latest", label: "الأحدث" },
                            { value: "best-selling", label: "الأكثر مبيعًا" },
                            { value: "top-rated", label: "الأعلى تقييمًا" },
                            { value: "price-low", label: "الأقل سعرًا" },
                            { value: "price-high", label: "الأعلى سعرًا" },
                          ].map((option) => (
                            <button
                              key={option.value}
                              onClick={() => setSortOption(option.value)}
                              className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                                sortOption === option.value
                                  ? "bg-purple-50 text-purple-700"
                                  : "hover:bg-gray-50"
                              }`}
                            >
                              <div
                                className={`w-5 h-5 border rounded-full flex items-center justify-center mr-2 ${
                                  sortOption === option.value
                                    ? "bg-purple-600 border-purple-600"
                                    : "border-gray-300"
                                }`}
                              >
                                {sortOption === option.value && (
                                  <div className="w-2 h-2 bg-white rounded-full" />
                                )}
                              </div>
                              <span>{option.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex-shrink-0 border-t border-gray-200 p-4">
                      <div className="flex gap-3">
                        <button
                          onClick={applyFilters}
                          className="flex-1 bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors"
                        >
                          تطبيق الفلتر
                        </button>
                        <button
                          onClick={resetFilters}
                          className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          إعادة التعيين
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Product List */}
          <div className="flex-1">
            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="w-full bg-white text-gray-700 p-3 rounded-lg shadow-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <FiFilter size={20} />
                <span>الفلاتر</span>
                {activeFilters.length > 0 && (
                  <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full text-sm">
                    {activeFilters.length}
                  </span>
                )}
              </button>
            </div>

            {/* Active Filters (Desktop) */}
            <div className="hidden lg:flex items-center justify-between mb-6 bg-white p-4 rounded-lg shadow-sm">
              <div className="text-sm text-gray-600">
                {filteredProducts.length} منتج
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">الترتيب:</span>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="border-gray-300 rounded-lg text-sm focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="latest">الأحدث</option>
                  <option value="best-selling">الأكثر مبيعًا</option>
                  <option value="top-rated">الأعلى تقييمًا</option>
                  <option value="price-low">الأقل سعرًا</option>
                  <option value="price-high">الأعلى سعرًا</option>
                </select>
              </div>
            </div>

            {/* Product Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                <p className="text-gray-600">
                  لا توجد منتجات تطابق معايير البحث الخاصة بك.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-4 text-purple-600 hover:text-purple-800"
                >
                  إعادة تعيين الفلاتر
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {currentProducts.map((product) => (
                    <Card key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-8 flex justify-center">
                    <nav className="flex items-center gap-2">
                      <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className={`p-2 rounded-lg transition-colors ${
                          currentPage === 1
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                        aria-label="الصفحة السابقة"
                      >
                        <FiChevronRight size={20} />
                      </button>

                      <div className="flex items-center gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`w-8 h-8 rounded-lg text-sm transition-colors ${
                              currentPage === page
                                ? "bg-purple-600 text-white"
                                : "text-gray-700 hover:bg-gray-100"
                            }`}
                          >
                            {page}
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className={`p-2 rounded-lg transition-colors ${
                          currentPage === totalPages
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                        aria-label="الصفحة التالية"
                      >
                        <FiChevronLeft size={20} />
                      </button>
                    </nav>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
