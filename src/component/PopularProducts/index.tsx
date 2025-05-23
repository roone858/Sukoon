import { useState, useMemo, useCallback, useTransition } from "react";
import { Link } from "react-router-dom";
import { useStoreContext } from "../../context/hooks/useStoreContext";
import ProductCard from "../CategoriesSection/ProductCard";
import { Category, CategoryAncestor } from "../../types/category.type";
import ProductCardPlaceholder from "../CardPlaceholder";

const getCategoryPath = (category: Category): string => {
  if (!category.ancestors?.length) return category.name;
  const ancestorNames = category.ancestors.map((a: CategoryAncestor) => a.name);
  return [...ancestorNames, category.name].join(' / ');
};

export default function PopularProducts() {
  const { products, categories, isLoading: contextLoading } = useStoreContext();
  const [activeTab, setActiveTab] = useState<string>("all");
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const getCategoryChildren = useCallback((categoryId: string): string[] => {
    const result: string[] = [];
    const children = categories.filter(cat => cat.parentId === categoryId);
    
    children.forEach(child => {
      result.push(child._id);
      const grandChildren = getCategoryChildren(child._id);
      result.push(...grandChildren);
    });
    
    return result;
  }, [categories]);

  const getCategoryChain = useCallback((categoryId: string): string[] => [
    categoryId,
    ...getCategoryChildren(categoryId)
  ], [getCategoryChildren]);

  const availableCategories = useMemo(() => [
    { _id: "all", name: "الكل", slug: "all" } as Category,
    ...categories.filter(cat => cat.isActive)
  ], [categories]);

  const filteredProducts = useMemo(() => {
    if (activeTab === "all") return products;
    const validCategoryIds = new Set(getCategoryChain(activeTab));
    return products.filter(product =>
      product.categories?.some(catId => validCategoryIds.has(catId))
    );
  }, [products, activeTab, getCategoryChain]);

  const handleTabChange = (categoryId: string) => {
    startTransition(() => {
      setActiveTab(categoryId);
    });
  };

  const showLoading = contextLoading || isPending;

  return (
    <section className="py-8 xs:py-12 sm:py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-3 xs:px-4 sm:px-6">
        <div className="text-center mb-6 xs:mb-8 sm:mb-12">
          <h2 className={`text-xl xs:text-2xl sm:text-3xl font-bold mb-4 xs:mb-6 ${
            showLoading ? "text-gray-500 dark:text-gray-400" : "text-gray-800 dark:text-white"
          }`}>
            المنتجات الشائعة
          </h2>
          
          <div className={`flex flex-wrap justify-center gap-1 xs:gap-2 sm:gap-3 pb-2 ${
            showLoading ? "opacity-50 pointer-events-none" : ""
          }`}>
            {availableCategories.map((category) => (
              <button
                key={category._id}
                onClick={() => handleTabChange(category._id)}
                onMouseEnter={() => setHoveredTab(category._id)}
                onMouseLeave={() => setHoveredTab(null)}
                disabled={showLoading}
                className={`relative px-3 xs:px-4 sm:px-5 py-1.5 xs:py-2 sm:py-2.5 rounded-full text-xs xs:text-sm font-medium whitespace-nowrap ${
                  activeTab === category._id
                    ? "text-white bg-purple-600"
                    : "text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
                } ${showLoading ? "cursor-not-allowed" : "cursor-pointer"}`}
                title={getCategoryPath(category)}
              >
                {hoveredTab === category._id && !showLoading && (
                  <span className="absolute inset-0 bg-gray-200 dark:bg-gray-700 rounded-full -z-10" />
                )}
                {activeTab === category._id && !showLoading && (
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-800 rounded-full -z-10" />
                )}
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {showLoading ? (
          <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 xs:gap-4 sm:gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={`placeholder-${index}`} className="h-full">
                <ProductCardPlaceholder />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 xs:gap-4 sm:gap-6">
            {filteredProducts.slice(0, 6).map((product) => (
              <div key={product.id} className="h-full">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}

        {!showLoading && filteredProducts.length > 6 && (
          <div className="text-center mt-8 xs:mt-10 sm:mt-12">
            <Link
              to={`/products?category=${activeTab === 'all' ? '' : activeTab}`}
              className="inline-flex items-center px-4 xs:px-5 sm:px-6 py-2 xs:py-2.5 sm:py-3 text-sm xs:text-base font-medium rounded-full text-white bg-purple-600 hover:bg-purple-700"
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