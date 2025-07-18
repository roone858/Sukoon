import { useState } from "react";
import {
  FiChevronLeft,
  FiFilter,
  FiSearch,
  FiShoppingBag,
} from "react-icons/fi";
import { useStoreContext } from "../../context/hooks/useStoreContext";
import { resizeCloudinaryImage } from "../../util/cloudinaryUtils";
import { Link } from "react-router-dom";

const CategoriesPage = () => {
  const [activeFilter, setActiveFilter] = useState<string>("الكل");
  const [showFilters, setShowFilters] = useState(false);
  const { categories, products } = useStoreContext();
  const filters = ["الكل", "الأكثر شيوعاً", "وصل حديثاً", "الأفضل مبيعاً"];
  // const categories: Category[] = [
  //   {
  //     id: 1,
  //     name: "الإلكترونيات",
  //     description: "أحدث الأجهزة والإلكترونيات للعصر الحديث",
  //     image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03",
  //     products: [
  //       {
  //         id: 101,
  //         name: "سماعات لاسلكية",
  //         price: 129.99,
  //         image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
  //       },
  //       {
  //         id: 102,
  //         name: "ساعة ذكية",
  //         price: 199.99,
  //         image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
  //       },
  //       {
  //         id: 103,
  //         name: "سماعة بلوتوث",
  //         price: 89.99,
  //         image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb",
  //       },
  //       {
  //         id: 104,
  //         name: "كاميرا 4K",
  //         price: 349.99,
  //         image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
  //       },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     name: "المنزل والمعيشة",
  //     description: "أساسيات أنيقة لرفع مستوى مساحتك",
  //     image: "https://images.unsplash.com/photo-1556911220-bff31c812dba",
  //     products: [
  //       {
  //         id: 201,
  //         name: "مزهرية خزفية",
  //         price: 45.99,
  //         image: "https://images.unsplash.com/photo-1600566752225-3f2fe3fcfb0d",
  //       },
  //       {
  //         id: 202,
  //         name: "كرسي خشبي",
  //         price: 129.99,
  //         image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c",
  //       },
  //       {
  //         id: 203,
  //         name: "مصباح طاولة",
  //         price: 59.99,
  //         image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15",
  //       },
  //       {
  //         id: 204,
  //         name: "وسادة ديكور",
  //         price: 29.99,
  //         image: "https://images.unsplash.com/photo-1579656592043-a20e25a4aa4b",
  //       },
  //     ],
  //   },
  //   {
  //     id: 3,
  //     name: "الموضة",
  //     description: "أحدث الصيحات لكل المناسبات",
  //     image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f",
  //     products: [
  //       {
  //         id: 301,
  //         name: "جاكيت دينيم",
  //         price: 79.99,
  //         image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea",
  //       },
  //       {
  //         id: 302,
  //         name: "حقيبة جلدية",
  //         price: 149.99,
  //         image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7",
  //       },
  //       {
  //         id: 303,
  //         name: "حذاء رياضي",
  //         price: 89.99,
  //         image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
  //       },
  //       {
  //         id: 304,
  //         name: "وشاح حريري",
  //         price: 39.99,
  //         image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b",
  //       },
  //     ],
  //   },
  // ];
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - تحسين للجوال */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 md:py-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            فئات المتجر
          </h1>
          <p className="text-sm md:text-base text-gray-600 mt-1 md:mt-2">
            تصفح مجموعاتنا المختارة
          </p>
        </div>
      </header>

      {/* Filters and Search - تصميم متجاوب متقدم */}
      <div className="container mx-auto px-4 py-4 md:py-6">
        {/* زر عرض/إخفاء الفلاتر للجوال */}
        <button
          className="md:hidden flex items-center mb-4 text-purple-600"
          onClick={() => setShowFilters(!showFilters)}
        >
          <FiFilter className="ml-2" />
          {showFilters ? "إخفاء الفلاتر" : "عرض الفلاتر"}
        </button>

        <div className={`${showFilters ? "block" : "hidden"} md:block`}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="w-full">
              <div className="flex items-center mb-2 md:mb-0">
                <FiFilter className="text-purple-600 hidden md:block" />
                <span className="font-medium text-gray-700 text-sm md:text-base mr-2">
                  تصفية حسب:
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => {
                      setActiveFilter(filter);
                      if (window.innerWidth < 768) setShowFilters(false);
                    }}
                    className={`px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm transition-colors ${
                      activeFilter === filter
                        ? "bg-purple-600 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative w-full md:w-64 mt-2 md:mt-0">
              <input
                type="text"
                placeholder="ابحث في الفئات..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm md:text-base"
              />
              <FiSearch className="absolute left-3 top-2.5 md:top-3 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Categories Grid - تحسينات التجاوب */}
    <div className="container mx-auto px-2 sm:px-4 pb-8 md:pb-12">
  {categories.map((category) => {
    // Filter products that belong to this category
    const categoryProducts = products.filter(
      (product) =>
        product.categories && 
        product.categories.includes(category._id)
    );

    // Only render the category section if there are products in it
    if (categoryProducts.length === 0) return null;

    return (
      <section key={category._id} className="mb-8 md:mb-12 px-2 sm:px-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 md:mb-6">
          <div className="mb-2 sm:mb-0">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">
              {category.name}
            </h2>
            <p className="text-xs md:text-sm text-gray-600">
              {category.description}
            </p>
          </div>
          <Link  className="flex items-center text-purple-600 hover:text-purple-800 transition-colors text-sm md:text-base self-end sm:self-center" to={"/categories/"+ category._id}>
            عرض الكل <FiChevronLeft className="mr-1" />
          </Link>
        </div>

        {/* Category Hero Image */}
        <div className="relative rounded-xl overflow-hidden mb-4 md:mb-6 h-48 sm:h-56 md:h-64 bg-gray-200">
          <img
            src={resizeCloudinaryImage(category.imageUrl ||"",400)}
            alt={category.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-purple-700/70 to-transparent flex items-end p-4 md:p-6">
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              {category.name}
            </h3>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {categoryProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg md:rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 group"
            >
              <div className="relative pt-[100%] bg-gray-100 overflow-hidden">
                <img
                  src={resizeCloudinaryImage(product.images[0].url,300)}
                  alt={product.name}
                  className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <button
                  className="absolute bottom-2 right-2 md:bottom-4 md:right-4 bg-purple-600 text-white p-1.5 md:p-2 rounded-full hover:bg-purple-700 transition-colors shadow-lg"
                  aria-label={`إضافة ${product.name} إلى السلة`}
                >
                  <FiShoppingBag className="text-sm md:text-base" />
                </button>
              </div>
              <div className="p-2 md:p-3 lg:p-4">
                <h3 className="font-medium text-gray-900 text-xs sm:text-sm md:text-base line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-purple-600 font-bold mt-1 md:mt-2 text-sm md:text-base">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  })}
</div>

      {/* Floating Action Button للجوال */}
      <div className="fixed bottom-6 right-6 md:hidden">
        <button
          className="bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition-colors"
          onClick={() => setShowFilters(!showFilters)}
          aria-label="عرض الفلاتر"
        >
          <FiFilter className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default CategoriesPage;
