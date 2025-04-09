import { useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { useStoreContext } from "../../context/hooks/useStoreContext";
import "./style.css";
import ProductCard from "../CategoriesSection/ProductCard";
import { Category, CategoryAncestor } from "../../types/category.type";

// Helper function to get full category path
const getCategoryPath = (category: Category): string => {
  if (!category.ancestors?.length) return category.name;
  const ancestorNames = category.ancestors.map((a: CategoryAncestor) => a.name);
  return [...ancestorNames, category.name].join(' / ');
};

export default function PopularProducts() {
  const { products, categories } = useStoreContext();
  const [activeTab, setActiveTab] = useState<string>("all");
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  // Get all child categories for a given category
  const getCategoryChildren = useCallback((categoryId: string): string[] => {
    const result: string[] = [];
    const children = categories.filter(cat => cat.parentId === categoryId);
    
    children.forEach(child => {
      result.push(child._id);
      // Recursively get children of children
      const grandChildren = getCategoryChildren(child._id);
      result.push(...grandChildren);
    });
    
    return result;
  }, [categories]);

  // Get category chain (self + children) for filtering
  const getCategoryChain = useCallback((categoryId: string): string[] => {
    return [
      categoryId,
      ...getCategoryChildren(categoryId)
    ];
  }, [getCategoryChildren]);

  // Filter active categories and add "all" option
  const availableCategories = useMemo(() => {
    const activeCategories = categories.filter(cat => cat.isActive);
    return [
      { _id: "all", name: "الكل", slug: "all" } as Category,
      ...activeCategories
    ];
  }, [categories]);

  const filteredProducts = useMemo(() => {
    if (activeTab === "all") return products;
    const validCategoryIds = new Set(getCategoryChain(activeTab));
    return products.filter((product) =>
      product.categories?.some(catId => validCategoryIds.has(catId))
    );
  }, [products, activeTab, getCategoryChain]);

  return (
    <section className="popular-products py-8 xs:py-12 sm:py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-3 xs:px-4 sm:px-6">
        {/* Section Header */}
        <div className="section-header text-center mb-6 xs:mb-8 sm:mb-12">
          <h2 
            className="text-xl xs:text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-4 xs:mb-6 opacity-0 animate-fade-in-up"
          >
            المنتجات الشائعة
          </h2>
          
          {/* Responsive Tabs */}
          <div className="flex flex-wrap justify-center gap-1 xs:gap-2 sm:gap-3 relative overflow-x-auto pb-2 -mx-2 px-2">
            {availableCategories.map((category) => (
              <button
                key={category._id}
                onClick={() => setActiveTab(category._id)}
                onMouseEnter={() => setHoveredTab(category._id)}
                onMouseLeave={() => setHoveredTab(null)}
                className={`relative px-3 xs:px-4 sm:px-5 py-1.5 xs:py-2 sm:py-2.5 rounded-full text-xs xs:text-sm font-medium transition-all duration-300 z-10 whitespace-nowrap ${
                  activeTab === category._id
                    ? "text-white"
                    : "text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
                }`}
                title={category._id === "all" ? category.name : getCategoryPath(category)}
              >
                {hoveredTab === category._id && (
                  <span
                    className="absolute inset-0 bg-gray-200 dark:bg-gray-700 rounded-full -z-10 transition-opacity duration-300"
                  />
                )}
                {activeTab === category._id && (
                  <span
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-800 rounded-full -z-10 transition-all duration-300"
                  />
                )}
                {/* Show only the category name in the button, but full path in tooltip */}
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Responsive Products Grid */}
        <div
          className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 xs:gap-4 sm:gap-6"
        >
          {filteredProducts.slice(0, 6).map((product, index) => (
            <div
              key={product.id}
              className="h-full opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Responsive View More Button */}
        {filteredProducts.length > 6 && (
          <div 
            className="text-center mt-8 xs:mt-10 sm:mt-12 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "300ms" }}
          >
            <Link
              to={`/products?category=${activeTab === 'all' ? '' : activeTab}`}
              className="inline-flex items-center px-4 xs:px-5 sm:px-6 py-2 xs:py-2.5 sm:py-3 border border-transparent text-sm xs:text-base font-medium rounded-full shadow-sm text-white bg-purple-600 hover:bg-purple-700 transition-colors duration-300"
            >
              عرض المزيد
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 xs:h-5 xs:w-5 mr-1 xs:mr-2 rtl:rotate-180"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}