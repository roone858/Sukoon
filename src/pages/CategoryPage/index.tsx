import { useState } from 'react';
import {  FiFilter,  FiShoppingBag, FiStar, FiShare2, FiChevronRight } from 'react-icons/fi';

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
  isNew?: boolean;
  discount?: number;
};

const SingleCategoryPage = () => {
  const [activeFilter, setActiveFilter] = useState<string>('الكل');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<string>('الأكثر شيوعاً');
  
  const filters = ['الكل', 'العروض', 'الجديد', 'الأعلى تقييماً'];
  const sortOptions = ['الأكثر شيوعاً', 'الأحدث', 'الأعلى سعراً', 'الأقل سعراً'];
  
  const category = {
    id: 1,
    name: 'الإلكترونيات',
    description: 'اكتشف أحدث الأجهزة الإلكترونية لتحسين حياتك اليومية',
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03',
  };

  const products: Product[] = [
    {
      id: 101,
      name: 'سماعات لاسلكية بلوتوث 5.0',
      price: 129.99,
      discount: 15,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
      rating: 4.5,
      reviews: 128,
      isNew: true
    },
    {
      id: 102,
      name: 'ساعة ذكية مع شاشة AMOLED',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
      rating: 4.2,
      reviews: 86
    },
    {
      id: 103,
      name: 'سماعة بلوتوث مقاومة للماء',
      price: 89.99,
      discount: 20,
      image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb',
      rating: 4.7,
      reviews: 215
    },
    {
      id: 104,
      name: 'كاميرا 4K مع عدسات متعددة',
      price: 349.99,
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32',
      rating: 4.8,
      reviews: 42,
      isNew: true
    },
    {
      id: 105,
      name: 'لوحة مفاتيح ميكانيكية إضاءة RGB',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3',
      rating: 4.3,
      reviews: 156
    },
    {
      id: 106,
      name: 'ماوس لاسلكي دقة 16000DPI',
      price: 59.99,
      discount: 10,
      image: 'https://images.unsplash.com/photo-1527814050087-3793815479db',
      rating: 4.4,
      reviews: 92
    },
    {
      id: 107,
      name: 'شاحن لاسلكي سريع 15W',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90',
      rating: 4.1,
      reviews: 73
    },
    {
      id: 108,
      name: 'حامل هاتف ذكي متعدد الاستخدامات',
      price: 19.99,
      image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb',
      rating: 3.9,
      reviews: 58
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header مع زر العودة */}
      <header className="bg-white shadow-sm sticky top-0 z-20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center">
            <button className="ml-4 text-gray-600 hover:text-purple-600">
              <FiChevronRight className="text-xl" />
            </button>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">{category.name}</h1>
          </div>
        </div>
      </header>

      {/* Category Hero Section */}
      <div className="relative h-48 md:h-64 lg:h-80 bg-gray-200">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
          <div className="max-w-3xl">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
              {category.name}
            </h2>
            <p className="text-gray-100 md:text-lg">
              {category.description}
            </p>
          </div>
        </div>
      </div>

      {/* Filters and Sorting Section */}
      <div className="bg-white shadow-sm sticky top-16 md:top-20 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            {/* Filters Button for Mobile */}
            <button 
              className="md:hidden flex items-center text-purple-600"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FiFilter className="ml-2" />
              {showFilters ? 'إخفاء الفلاتر' : 'عرض الفلاتر'}
            </button>

            {/* Filters Row */}
            <div className={`${showFilters ? 'block' : 'hidden'} md:block w-full md:w-auto`}>
              <div className="flex flex-wrap gap-2">
                {filters.map(filter => (
                  <button
                    key={filter}
                    onClick={() => {
                      setActiveFilter(filter);
                      if (window.innerWidth < 768) setShowFilters(false);
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs md:text-sm transition-colors ${
                      activeFilter === filter
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Sort Dropdown */}
            <div className="relative w-full md:w-48">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full pl-3 pr-8 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
              >
                {sortOptions.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-2.5 text-gray-400 pointer-events-none">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-2 sm:px-4 py-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5">
          {products.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300 group relative"
            >
              {/* Product Badges */}
              <div className="absolute top-2 left-2 z-10 flex flex-col space-y-1">
                {product.isNew && (
                  <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    جديد
                  </span>
                )}
                {product.discount && (
                  <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                    خصم {product.discount}%
                  </span>
                )}
              </div>

              {/* Share Button */}
              <button className="absolute top-2 right-2 z-10 bg-white/80 text-gray-700 p-1.5 rounded-full hover:bg-white hover:text-purple-600 transition-colors shadow-sm">
                <FiShare2 className="text-sm" />
              </button>

              {/* Product Image */}
              <div className="relative pt-[100%] bg-gray-100 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>

              {/* Product Info */}
              <div className="p-3">
                <h3 className="font-medium text-gray-900 text-sm md:text-base line-clamp-2 mb-1">
                  {product.name}
                </h3>
                
                {/* Price */}
                <div className="flex items-center mt-1">
                  <span className="text-purple-600 font-bold text-sm md:text-base">
                    ${(product.price * (1 - (product.discount || 0) / 100)).toFixed(2)}
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
                    <span className="ml-1 text-gray-700">{product.rating}</span>
                  </div>
                  <span>({product.reviews})</span>
                </div>
                
                {/* Add to Cart Button */}
                <button className="w-full mt-3 bg-purple-600 text-white py-2 rounded-lg text-sm hover:bg-purple-700 transition-colors flex items-center justify-center">
                  <FiShoppingBag className="mr-2" />
                  أضف للسلة
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Load More Button */}
      <div className="container mx-auto px-4 pb-8 text-center">
        <button className="bg-white text-purple-600 border border-purple-600 px-6 py-2 rounded-lg hover:bg-purple-50 transition-colors">
          عرض المزيد
        </button>
      </div>

      {/* Floating Action Button for Mobile */}
      <div className="fixed bottom-6 right-6 md:hidden">
        <button 
          className="bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 transition-colors flex items-center justify-center"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <FiFilter className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default SingleCategoryPage;