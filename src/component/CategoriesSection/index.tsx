import { memo, useCallback, useMemo, useState } from "react";
import { useStoreContext } from "../../context/hooks/useStoreContext";
import { SectionTitle } from "./common/SectionTitle";
import { CategoriesTabs } from "./components/CategoriesTabs";
import { ProductSlider } from "./components/ProductSlider";
import { CategoriesSlider } from "./components/CategoriesSlider";
import { Category, CategoryAncestor } from "../../types/category.type";
import LoadingSpinner from "../LoadingSpinner";

/**
 * Helper function to get full category path
 */
const getCategoryPath = (category: Category): string => {
  const ancestorNames =
    category.ancestors?.map((a: CategoryAncestor) => a.name) || [];
  return [...ancestorNames, category.name].join(" / ");
};

/**
 * Memoized main component to prevent unnecessary re-renders
 */
const CategoriesSection = memo(function CategoriesSection() {
  const { products, categories } = useStoreContext();
  const [activeTab, setActiveTab] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /**
   * Recursively get all child category IDs for a given category
   */
  const getCategoryChildren = useCallback(
    (categoryId: string): string[] => {
      return categories.reduce<string[]>((acc, child) => {
        if (child.parentId === categoryId) {
          return [...acc, child._id, ...getCategoryChildren(child._id)];
        }
        return acc;
      }, []);
    },
    [categories]
  );

  /**
   * Get category chain (self + children) for product counting
   */
  const getCategoryChain = useCallback(
    (categoryId: string): string[] => [
      categoryId,
      ...getCategoryChildren(categoryId),
    ],
    [getCategoryChildren]
  );

  /**
   * Calculate product count for each category including child categories
   */
  const countProductsForCategory = useCallback(
    (categoryId: string): number => {
      const validCategoryIds = new Set(getCategoryChain(categoryId));
      return products.filter((product) =>
        product.categories?.some((catId) => validCategoryIds.has(catId))
      ).length;
    },
    [products, getCategoryChain]
  );

  /**
   * Processed categories with product counts and full paths, sorted by displayOrder
   */
  const categoriesWithCount = useMemo(() => {
    return categories
      .filter((cat) => cat.isActive)
      .map((category) => ({
        ...category,
        productCount: countProductsForCategory(category._id),
        fullPath: getCategoryPath(category),
      }))
      .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
  }, [categories, countProductsForCategory]);

  /**
   * Handle tab change with loading state
   */
  const handleTabChange = useCallback((tabId: string) => {
    setIsLoading(true);
    setActiveTab(tabId);
    // Simulate loading completion (you might want to remove this in production)
    setTimeout(() => setIsLoading(false), 100);
  }, []);

  /**
   * Products filtered by active category and its children
   */
  const filteredProducts = useMemo(() => {
    if (!activeTab) return [];
    const validCategoryIds = new Set(getCategoryChain(activeTab));
    return products.filter((product) =>
      product.categories?.some((categoryId) => validCategoryIds.has(categoryId))
    );
  }, [products, activeTab, getCategoryChain]);

  if (isLoading) {
    return (
      <div className="w-full max-w-7xl mx-auto px-2 xs:px-4 py-4 xs:py-8">
        <SectionTitle title="التصنيفات المميزة">
          <CategoriesTabs
            categories={categoriesWithCount}
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />
        </SectionTitle>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-2 xs:px-4 py-4 xs:py-8">
      <SectionTitle title="التصنيفات المميزة">
        <CategoriesTabs
          categories={categoriesWithCount}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      </SectionTitle>

      {activeTab ? (
        <ProductSlider products={filteredProducts.slice(0, 6)} />
      ) : (
        <CategoriesSlider categories={categoriesWithCount} />
      )}
    </div>
  );
});

export default CategoriesSection;
