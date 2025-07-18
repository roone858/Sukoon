import { useState } from "react";
import {
  FiFilter,
  FiShoppingBag,
  FiStar,
  FiShare2,
  FiChevronRight,
} from "react-icons/fi";
import { useStoreContext } from "../../context/hooks/useStoreContext";
import { useParams } from "react-router-dom";

const SingleCategoryPage = () => {
  const { id } = useParams();
  const [activeFilter, setActiveFilter] = useState<string>("الكل");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<string>("الأكثر شيوعاً");
  const { products, categories } = useStoreContext();
  
  const filters = ["الكل", "العروض", "الجديد", "الأعلى تقييماً"];
  const sortOptions = [
    "الأكثر شيوعاً",
    "الأحدث",
    "الأعلى سعراً",
    "الأقل سعراً",
  ];

  // Find the category by ID
  const category = categories.find((cat) => cat._id === id);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        الفئة غير موجودة
      </div>
    );
  }

  // Filter products by category first
  const categoryProducts = products.filter(
    (product) => product.categories && product.categories.includes(category._id)
  );

  // Apply additional filters
  const filteredProducts = categoryProducts.filter((product) => {
    if (activeFilter === "العروض") return product.discount;
    // if (activeFilter === "الجديد") return product.isNew;
    // if (activeFilter === "الأعلى تقييماً") return product.rating >= 4;
    return true;
  });

  // Apply sorting
  // const sortedProducts = [...filteredProducts].sort((a, b) => {
  //   if (sortBy === "الأحدث") return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
  //   if (sortBy === "الأعلى سعراً") return b.price - a.price;
  //   if (sortBy === "الأقل سعراً") return a.price - b.price;
  //   return (b.rating * (b.reviews || 0)) - (a.rating * (a.reviews || 0));
  // });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              className="flex items-center text-gray-600 hover:text-purple-600 transition-colors"
              onClick={() => window.history.back()}
            >
              <FiChevronRight className="text-xl transform rotate-180" />
              <span className="mr-1 text-sm">رجوع</span>
            </button>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 text-center flex-1">
              {category.name}
            </h1>
            <div className="w-8"></div>
          </div>
        </div>
      </header>

      {/* Category Hero Section */}
      <div className="relative h-48 md:h-64 lg:h-80 bg-gray-200 overflow-hidden">
        <img
          src={category.imageUrl || "https://via.placeholder.com/800x400?text=صورة+غير+متوفرة"}
          alt={category.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
          <div className="max-w-3xl">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
              {category.name}
            </h2>
            <p className="text-gray-100 md:text-lg">{category.description}</p>
          </div>
        </div>
      </div>

      {/* Filters and Sorting Section */}
      <div id="filters-section" className="bg-white shadow-sm sticky top-16 md:top-20 z-30 border-b border-gray-100">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <button
              className="md:hidden flex items-center text-purple-600 bg-purple-50 px-3 py-1.5 rounded-lg"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FiFilter className="ml-2" />
              {showFilters ? "إخفاء الفلاتر" : "تصفية المنتجات"}
            </button>

            <div
              className={`${
                showFilters ? "block" : "hidden"
              } md:block w-full overflow-x-auto pb-2 md:pb-0`}
            >
              <div className="flex space-x-2 md:space-x-0 md:flex-wrap md:gap-2 w-max md:w-auto">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => {
                      setActiveFilter(filter);
                      if (window.innerWidth < 768) setShowFilters(false);
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs md:text-sm transition-colors whitespace-nowrap ${
                      activeFilter === filter
                        ? "bg-purple-600 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative w-full md:w-48">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full pl-3 pr-8 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none hover:border-purple-400 transition-colors"
              >
                {sortOptions.map((option) => (
                  <option key={option} value={option}>
                    ترتيب حسب: {option}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-2.5 text-gray-400 pointer-events-none">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-2 sm:px-4 py-6">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">لا توجد منتجات متاحة</div>
            <button
              className="text-purple-600 hover:text-purple-800 font-medium"
              onClick={() => setActiveFilter("الكل")}
            >
              عرض جميع المنتجات
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg overflow-hidden hover:shadow-md transition-all duration-300 group relative border border-gray-100 hover:border-purple-100"
              >
                {/* Product Badges */}
                <div className="absolute top-2 left-2 z-10 flex flex-col space-y-1">
                  {/* {product.isNew && (
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full shadow-sm">
                      جديد
                    </span>
                  )} */}
                  {product.discount && (
                    <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full shadow-sm">
                      خصم {product.discount}%
                    </span>
                  )}
                </div>

                {/* Share Button */}
                <button
                  className="absolute top-2 right-2 z-10 bg-white/90 text-gray-700 p-1.5 rounded-full hover:bg-white hover:text-purple-600 transition-colors shadow-sm hover:shadow-md"
                  aria-label="مشاركة المنتج"
                >
                  <FiShare2 className="text-sm" />
                </button>

                {/* Product Image */}
                <div className="relative pt-[100%] bg-gray-100 overflow-hidden">
                  <img
                    src={product.images[0]?.url || "https://via.placeholder.com/300x300?text=صورة+غير+متوفرة"}
                    alt={product.name}
                    className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>

                {/* Product Info */}
                <div className="p-3">
                  <h3 className="font-medium text-gray-900 text-sm md:text-base line-clamp-2 mb-1 h-12 flex items-center">
                    {product.name}
                  </h3>

                  {/* Price */}
                  <div className="flex items-center mt-1">
                    <span className="text-purple-600 font-bold text-sm md:text-base">
                      $
                      {(
                        product.price *
                        (1 - (product.discount || 0) / 100)
                      ).toFixed(2)}
                    </span>
                    {product.discount && (
                      <span className="text-gray-400 text-xs line-through ml-2">
                        ${product.price.toFixed(2)}
                      </span>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center mt-2 text-xs text-gray-500">
                    <div className="flex items-center text-yellow-400 mr-1">
                      <FiStar className="fill-current" />
                      {/* <span className="ml-1 text-gray-700">
                        {product.rating}
                      </span> */}
                    </div>
                    {/* <span>({product.reviews || 0})</span> */}
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    className="w-full mt-3 bg-purple-600 text-white py-2 rounded-lg text-sm hover:bg-purple-700 transition-colors flex items-center justify-center active:scale-95 transform transition-transform"
                    aria-label={`أضف ${product.name} إلى السلة`}
                  >
                    <FiShoppingBag className="mr-2" />
                    أضف للسلة
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Load More Button */}
      {filteredProducts.length > 0 && (
        <div className="container mx-auto px-4 pb-8 text-center">
          <button className="bg-white text-purple-600 border border-purple-600 px-6 py-2 rounded-lg hover:bg-purple-50 transition-colors font-medium">
            عرض المزيد من المنتجات
          </button>
        </div>
      )}

      {/* Floating Action Button for Mobile */}
      <div className="fixed bottom-6 right-6 md:hidden">
        <button
          className="bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 transition-colors flex items-center justify-center animate-bounce"
          onClick={() => {
            setShowFilters(true);
            document
              .getElementById("filters-section")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          aria-label="عرض عوامل التصفية"
        >
          <FiFilter className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default SingleCategoryPage;