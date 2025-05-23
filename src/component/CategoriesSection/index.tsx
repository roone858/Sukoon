import { memo, useCallback, useMemo, useState, useTransition } from "react";
import { useStoreContext } from "../../context/hooks/useStoreContext";
import { SectionTitle } from "./common/SectionTitle";
import { CategoriesTabs } from "./components/CategoriesTabs";
import { ProductSlider } from "./components/ProductSlider";
import { CategoriesSlider } from "./components/CategoriesSlider";
import { Category, CategoryAncestor } from "../../types/category.type";
import ProductCardPlaceholder from "../CardPlaceholder";

/**
 * Helper function to get full category path
 */
const getCategoryPath = (category: Category): string => {
  const ancestorNames =
    category.ancestors?.map((a: CategoryAncestor) => a.name) || [];
  return [...ancestorNames, category.name].join(" / ");
};

const SKELETON_COUNT = 4;

/**
 * Memoized main component to prevent unnecessary re-renders
 */
const CategoriesSection = memo(function CategoriesSection() {
  const { products, categories } = useStoreContext();
  const [activeTab, setActiveTab] = useState<string>("");
  const [isPending, startTransition] = useTransition();

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
   * Handle tab change with loader and transition
   */
  const handleTabChange = useCallback((tabId: string) => {
    // Show loader only if transition takes longer than 200ms

    startTransition(() => {
      setActiveTab(tabId);
    });
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

  // Hide loader as soon as transition is done



  return (
    <div className="w-full max-w-7xl mx-auto px-2 xs:px-4 py-4 xs:py-8">
      <SectionTitle title="التصنيفات المميزة">
        <CategoriesTabs
          categories={categoriesWithCount}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      </SectionTitle>

      {isPending ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-10 mx-10 mt-6">
          {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <ProductCardPlaceholder key={i} />
          ))}
        </div>
      ) : activeTab ? (
        <ProductSlider products={filteredProducts.slice(0, 6)} />
      ) : (
        <CategoriesSlider categories={categoriesWithCount} />
      )}
    </div>
  );
});

export default CategoriesSection;
