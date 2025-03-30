import { useState, useMemo, useEffect } from "react";
import Breadcrumb from "../../component/Breadcrumb";
import Card from "../../component/ProductCard";
// import CategoryBar from "../../component/CategoryBar";
import { BreadcrumbLink, Product } from "../../util/types";
import { useStoreContext } from "../../context/useContext/useStoreContext";
import { FiFilter, FiX, FiChevronDown, FiChevronUp } from "react-icons/fi";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

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
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategories([]);
    setPriceRange([minPrice, maxPrice]);
    setSortOption("latest");
    setFilteredProducts(sortProducts(products, "latest"));
    setMobileFiltersOpen(false);
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

        {/* Mobile Filter Button */}
        <div className="lg:hidden fixed bottom-6 right-6 z-30">
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-colors flex items-center justify-center"
            aria-label="فتح الفلاتر"
          >
            <FiFilter size={24} />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
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
                        <input
                          type="checkbox"
                          id={`cat-${category}`}
                          checked={selectedCategories.includes(category)}
                          onChange={() => toggleCategory(category)}
                          className="ml-2 h-4 w-4 text-indigo-600 rounded"
                        />
                        <label
                          htmlFor={`cat-${category}`}
                          className="text-gray-700"
                        >
                          {category}
                        </label>
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
                      <div key={option.value} className="flex items-center">
                        <input
                          type="radio"
                          id={`sort-${option.value}`}
                          name="sortOption"
                          value={option.value}
                          checked={sortOption === option.value}
                          onChange={() => setSortOption(option.value)}
                          className="ml-2 h-4 w-4 text-indigo-600"
                        />
                        <label
                          htmlFor={`sort-${option.value}`}
                          className="text-gray-700"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={applyFilters}
                  className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition-colors"
                >
                  تطبيق الفلتر
                </button>
                <button
                  onClick={resetFilters}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300 transition-colors"
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
                className="absolute inset-0 bg-black bg-opacity-50"
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
                            <div key={category} className="flex items-center">
                              <input
                                type="checkbox"
                                id={`mob-cat-${category}`}
                                checked={selectedCategories.includes(category)}
                                onChange={() => toggleCategory(category)}
                                className="ml-2 h-4 w-4 text-indigo-600 rounded"
                              />
                              <label
                                htmlFor={`mob-cat-${category}`}
                                className="text-gray-700"
                              >
                                {category}
                              </label>
                            </div>
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
                            <div
                              key={option.value}
                              className="flex items-center"
                            >
                              <input
                                type="radio"
                                id={`mob-sort-${option.value}`}
                                name="mobSortOption"
                                value={option.value}
                                checked={sortOption === option.value}
                                onChange={() => setSortOption(option.value)}
                                className="ml-2 h-4 w-4 text-indigo-600"
                              />
                              <label
                                htmlFor={`mob-sort-${option.value}`}
                                className="text-gray-700"
                              >
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 p-4">
                      <div className="flex gap-3">
                        <button
                          onClick={applyFilters}
                          className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition-colors"
                        >
                          تطبيق الفلتر
                        </button>
                        <button
                          onClick={resetFilters}
                          className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300 transition-colors"
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
                  className="border-gray-300 rounded text-sm"
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
                  className="mt-4 text-indigo-600 hover:text-indigo-800"
                >
                  إعادة تعيين الفلاتر
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <Card key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
