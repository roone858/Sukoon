import { useState, useEffect } from "react";
import { FiChevronLeft, FiFilter, FiX, FiLoader } from "react-icons/fi";
import { useStoreContext } from "../../context/hooks/useStoreContext";
import { resizeCloudinaryImage } from "../../util/cloudinaryUtils";
import { Link } from "react-router-dom";
import ProductCard from "../../component/CategoriesSection/ProductCard";

const CategoriesPage = () => {
  // const [activeFilter, setActiveFilter] = useState<string>("الكل");
  const [showFilters, setShowFilters] = useState(false);
  // const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { categories, products } = useStoreContext();

  // const filters = ["الكل", "الأكثر شيوعاً", "وصل حديثاً", "الأفضل مبيعاً"];

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <FiLoader className="animate-spin text-purple-600 text-4xl mb-4" />
          <p className="text-gray-600">جاري تحميل الفئات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with improved spacing and shadow */}
      <header className="bg-white shadow-sm  z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between text-center">
            <div className="mx-auto">
              <h1 className="text-2xl font-bold text-gray-900">فئات المتجر</h1>
              <p className="text-sm text-gray-600 mt-1">
                تصفح مجموعاتنا المختارة
              </p>
            </div>
            <button
              className="md:hidden flex items-center text-purple-600"
              onClick={() => setShowFilters(!showFilters)}
            >
              {/* {showFilters ? (
                <FiX className="text-xl" />
              ) : (
                <FiFilter className="text-xl" />
              )} */}
            </button>
          </div>
        </div>
      </header>

      {/* Filters and Search - Enhanced mobile experience */}
      {/* <div className="container mx-auto px-4 py-4">
        {showFilters && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden">
            <div className="bg-white h-full w-4/5 max-w-sm ml-auto p-4 overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">الفلاتر</h2>
                <button onClick={() => setShowFilters(false)}>
                  <FiX className="text-xl" />
                </button>
              </div>
              
              <div className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="ابحث في الفئات..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <FiSearch className="absolute left-3 top-3 text-gray-400" />
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium text-gray-700 mb-3">تصفية حسب:</h3>
                <div className="space-y-2">
                  {filters.map((filter) => (
                    <button
                      key={filter}
                      onClick={() => {
                        setActiveFilter(filter);
                        setShowFilters(false);
                      }}
                      className={`w-full text-right px-4 py-2 rounded-lg transition-colors ${
                        activeFilter === filter
                          ? "bg-purple-100 text-purple-700 font-medium"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
              
              <button
                onClick={() => setShowFilters(false)}
                className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium mt-4 hover:bg-purple-700 transition-colors"
              >
                تطبيق الفلاتر
              </button>
            </div>
          </div>
        )}

        <div className="hidden md:block">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="w-full">
              <div className="flex items-center mb-2">
                <FiFilter className="text-purple-600" />
                <span className="font-medium text-gray-700 mr-2">
                  تصفية حسب:
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-4 py-2 rounded-full text-sm transition-colors ${
                      activeFilter === filter
                        ? "bg-purple-600 text-white shadow-md"
                        : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="ابحث في الفئات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <FiSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>
        </div>
      </div> */}

      {/* Categories Grid */}
      <div className="container mx-auto px-2 py-4  sm:px-4 pb-8 md:pb-12">
        {categories.map((category) => {
          const categoryProducts = products.filter(
            (product) =>
              product.categories && product.categories.includes(category._id)
          );

          if (categoryProducts.length === 0) return null;

          return (
            <section key={category._id} className="mb-12 px-2 sm:px-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                <div className="mb-2 sm:mb-0">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                    {category.name}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {category.description
                      ? `${category.description.slice(0, 40)}${
                          category.description.length > 40 ? "..." : ""
                        }`
                      : ""}
                  </p>
                </div>
                <Link
                  to={`/categories/${category._id}`}
                  className="flex items-center text-purple-600 hover:text-purple-800 transition-colors text-sm md:text-base self-end sm:self-center"
                >
                  عرض الكل <FiChevronLeft className="mr-1" />
                </Link>
              </div>

              {/* Category Hero Image with hover effect */}
              <Link
                to={`/categories/${category._id}`}
                className="relative rounded-xl overflow-hidden mb-6 h-48 sm:h-56 md:h-64 bg-gray-200 block group"
              >
                <img
                  src={resizeCloudinaryImage(category.imageUrl || "", 800)}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-transparent flex items-end p-6">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-2xl md:text-3xl font-bold text-white">
                      {category.name}
                    </h3>
                    <p className="text-purple-100 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {categoryProducts.length} منتجات
                    </p>
                  </div>
                </div>
              </Link>

              {/* Products Grid with skeleton loading */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
                {categoryProducts.map((product) => (
                  <ProductCard product={product} />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Floating Action Button with animation */}
      <div className="fixed bottom-6 right-6 md:hidden">
        <button
          className="bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 transition-all transform hover:scale-110"
          onClick={() => setShowFilters(!showFilters)}
          aria-label="عرض الفلاتر"
        >
          {showFilters ? (
            <FiX className="text-xl" />
          ) : (
            <FiFilter className="text-xl" />
          )}
        </button>
      </div>
    </div>
  );
};

export default CategoriesPage;
