import { memo, useCallback, useMemo, useState } from "react";
import { useStoreContext } from "../../context/hooks/useStoreContext";
import { SectionTitle } from "./common/SectionTitle";
import { CategoriesTabs } from "./components/CategoriesTabs";
import { ProductSlider } from "./components/ProductSlider";
import { CategoriesSlider } from "./components/CategoriesSlider";
import { Category, CategoryAncestor } from "../../types/category.type";

// Helper function to get full category path
const getCategoryPath = (category: Category): string => {
  if (!category.ancestors?.length) return category.name;
  const ancestorNames = category.ancestors.map((a: CategoryAncestor) => a.name);
  return [...ancestorNames, category.name].join(" / ");
};

// Memoize the main component to prevent unnecessary re-renders
const CategoriesSection = memo(function CategoriesSection() {
  const { products, categories } = useStoreContext();
  const [activeTab, setActiveTab] = useState<string>("");

  // Get all child categories for a given category
  const getCategoryChildren = useCallback(
    (categoryId: string): string[] => {
      const result: string[] = [];
      const children = categories.filter((cat) => cat.parentId === categoryId);

      children.forEach((child) => {
        result.push(child._id);
        // Recursively get children of children
        const grandChildren = getCategoryChildren(child._id);
        result.push(...grandChildren);
      });

      return result;
    },
    [categories]
  );

  // Get category chain (self + children) for counting
  const getCategoryChain = useCallback(
    (categoryId: string): string[] => {
      return [categoryId, ...getCategoryChildren(categoryId)];
    },
    [getCategoryChildren]
  );

  // Calculate product count for each category including child categories and sort by displayOrder
  const categoriesWithCount = useMemo(() => {
    return categories
      .filter((cat) => cat.isActive) // Only show active categories
      .map((category) => {
        const validCategoryIds = new Set(getCategoryChain(category._id));
        const count = products.filter((product) =>
          product.categories?.some((catId) => validCategoryIds.has(catId))
        ).length;

        return {
          ...category,
          productCount: count,
          fullPath: getCategoryPath(category),
        };
      })
      .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)); // Sort by displayOrder
  }, [categories, products, getCategoryChain]);

  // Memoize the tab change handler
  const handleTabChange = useCallback((tabId: string) => {
    setActiveTab(tabId);
  }, []);

  // Optimize product filtering to include child categories
  const filteredProducts = useMemo(() => {
    if (!activeTab) return [];
    const validCategoryIds = new Set(getCategoryChain(activeTab));
    return products.filter((product) =>
      product.categories?.some((categoryId) => validCategoryIds.has(categoryId))
    );
  }, [products, activeTab, getCategoryChain]);

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
