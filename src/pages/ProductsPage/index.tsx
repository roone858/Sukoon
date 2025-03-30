import { useState, useMemo, useEffect } from "react";
import Breadcrumb from "../../component/Breadcrumb";
import Card from "../../component/ProductCard";
// import CategoryBar from "../../component/CategoryBar";
import { BreadcrumbLink, Product } from "../../util/types";
import { useStoreContext } from "../../context/useContext/useStoreContext";
import {
  FiFilter,
  FiX,
  FiChevronDown,
  FiChevronUp,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
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
  const [activeFilters, setActiveFilters] = useState<
    { type: string; value: string }[]
  >([]);
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
      filters.push({
        type: "categories",
        value: selectedCategories.join(", "),
      });
    }

    if (priceRange[0] !== minPrice || priceRange[1] !== maxPrice) {
      filters.push({
        type: "price",
        value: `${priceRange[0]} - ${priceRange[1]} ر.س`,
      });
    }

    if (sortOption !== "latest") {
      filters.push({
        type: "sort",
        value: getSortLabel(sortOption),
      });
    }

    setActiveFilters(filters);
  };

  const getSortLabel = (value: string): string => {
    const options = {
      latest: "الأحدث",
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex justify-center items-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          <div className="text-gray-600">جاري تحميل المنتجات...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Breadcrumb */}
      <Breadcrumb links={breadcrumbLinks} />

      <div className="container mx-auto px-4 mt-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div
            className={`fixed inset-0 z-50 lg:relative lg:inset-auto lg:w-80 bg-white lg:bg-transparent transition-transform duration-300 ease-in-out ${
              mobileFiltersOpen
                ? "translate-x-0"
                : "translate-x-full lg:translate-x-0"
            }`}
          >
            <div className="h-full lg:h-auto bg-white shadow-lg lg:shadow-none rounded-lg p-6">
              {/* Mobile Header */}
              <div className="flex items-center justify-between mb-6 lg:hidden">
                <h2 className="text-lg font-semibold text-gray-900">الفلاتر</h2>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              {/* Categories Section */}
              <div className="mb-6">
                <button
                  onClick={() => toggleSection("categories")}
                  className="flex items-center justify-between w-full text-left mb-3"
                >
                  <h3 className="text-lg font-semibold text-gray-900">
                    الفئات
                  </h3>
                  {expandedSections.categories ? (
                    <FiChevronUp className="w-5 h-5" />
                  ) : (
                    <FiChevronDown className="w-5 h-5" />
                  )}
                </button>
                {expandedSections.categories && (
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label
                        key={category}
                        className="flex items-center gap-2 cursor-pointer group"
                      >
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category)}
                          onChange={() => toggleCategory(category)}
                          className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                        />
                        <span className="text-gray-700 group-hover:text-purple-600">
                          {category}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Price Range Section */}
              <div className="mb-6">
                <button
                  onClick={() => toggleSection("price")}
                  className="flex items-center justify-between w-full text-left mb-3"
                >
                  <h3 className="text-lg font-semibold text-gray-900">السعر</h3>
                  {expandedSections.price ? (
                    <FiChevronUp className="w-5 h-5" />
                  ) : (
                    <FiChevronDown className="w-5 h-5" />
                  )}
                </button>
                {expandedSections.price && (
                  <div className="px-4">
                    <Slider
                      range
                      min={minPrice}
                      max={maxPrice}
                      value={priceRange}
                      onChange={(value) =>
                        setPriceRange(value as [number, number])
                      }
                    />
                    <div className="flex justify-between mt-2 text-sm text-gray-600">
                      <span>{priceRange[1]} ر.س</span>
                      <span>{priceRange[0]} ر.س</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Sort Section */}
              <div className="mb-6">
                <button
                  onClick={() => toggleSection("sort")}
                  className="flex items-center justify-between w-full text-left mb-3"
                >
                  <h3 className="text-lg font-semibold text-gray-900">
                    الترتيب
                  </h3>
                  {expandedSections.sort ? (
                    <FiChevronUp className="w-5 h-5" />
                  ) : (
                    <FiChevronDown className="w-5 h-5" />
                  )}
                </button>
                {expandedSections.sort && (
                  <div className="space-y-2">
                    {[
                      { value: "latest", label: "الأحدث" },
                      { value: "best-selling", label: "الأكثر مبيعًا" },
                      { value: "top-rated", label: "الأعلى تقييمًا" },
                      { value: "price-low", label: "الأقل سعرًا" },
                      { value: "price-high", label: "الأعلى سعرًا" },
                    ].map((option) => (
                      <label
                        key={option.value}
                        className="flex items-center gap-2 cursor-pointer group"
                      >
                        <input
                          type="radio"
                          name="sort"
                          value={option.value}
                          checked={sortOption === option.value}
                          onChange={(e) => setSortOption(e.target.value)}
                          className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                        />
                        <span className="text-gray-700 group-hover:text-purple-600">
                          {option.label}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Filter Actions */}
              <div className="flex gap-3">
                <button
                  onClick={applyFilters}
                  className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  تطبيق الفلاتر
                </button>
                <button
                  onClick={resetFilters}
                  className="flex-1 bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  إعادة تعيين
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filter Button */}
            <div className="flex items-center justify-between mb-6 lg:hidden">
              <h1 className="text-2xl font-bold text-gray-900">المنتجات</h1>
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                <FiFilter className="w-5 h-5" />
                <span>الفلاتر</span>
              </button>
            </div>

            {/* Active Filters */}
            {activeFilters.length > 0 && (
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {activeFilters.map((filter, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm"
                    >
                      <span>{filter.value}</span>
                      <button
                        onClick={() => {
                          const newFilters = activeFilters.filter(
                            (_, i) => i !== index
                          );
                          setActiveFilters(newFilters);
                          if (filter.type === "categories") {
                            setSelectedCategories([]);
                          } else if (filter.type === "price") {
                            setPriceRange([minPrice, maxPrice]);
                          } else if (filter.type === "sort") {
                            setSortOption("latest");
                          }
                          applyFilters();
                        }}
                        className="text-purple-700 hover:text-purple-900"
                      >
                        <FiX className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentProducts.map((product) => (
                <Card key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <nav className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(1, prev - 1))
                    }
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                  >
                    <FiChevronRight className="w-5 h-5" />
                  </button>
                  <span className="px-4 py-2 text-gray-700">
                    صفحة {currentPage} من {totalPages}
                  </span>
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                  >
                    <FiChevronLeft className="w-5 h-5" />
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
