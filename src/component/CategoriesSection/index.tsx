import { memo, useCallback, useMemo, useState } from "react";
import { useStoreContext } from "../../context/hooks/useStoreContext";
import { SectionTitle } from "./common/SectionTitle";
import { CategoriesTabs } from "./components/CategoriesTabs";
import { ProductSlider } from "./components/ProductSlider";
import { CategoriesSlider } from "./components/CategoriesSlider";

// Memoize the main component to prevent unnecessary re-renders
const CategoriesSection = memo(function CategoriesSection() {
  const { products } = useStoreContext();
  const [activeTab, setActiveTab] = useState<string>("");

  // Memoize the tab change handler
  const handleTabChange = useCallback((tabId: string) => {
    setActiveTab(tabId);
  }, []);

  // Optimize category calculation
  const topCategories = useMemo(() => {
    // Early return if no products
    if (products.length === 0) return [];

    const categoryCounts: Record<string, number> = {};
    const categoryImages: Record<string, string> = {};
    const seenCategories = new Set<string>();

    // Single pass through products to collect counts and images
    for (const product of products) {
      for (const category of product.categories) {
        categoryCounts[category] = (categoryCounts[category] || 0) + 1;

        // Only set image once per category
        if (!seenCategories.has(category)) {
          seenCategories.add(category);
          categoryImages[category] =
            product.images[0]?.url || "/path/to/default-image.png";
        }
      }
    }

    // Convert to array and sort
    return Object.keys(categoryCounts)
      .map((category) => ({
        id: category,
        name: category,
        itemCount: categoryCounts[category],
        link: `/category/${category.toLowerCase().replace(/\s+/g, "-")}`,
        image: categoryImages[category],
      }))
      .sort((a, b) => b.itemCount - a.itemCount)
      .slice(0, 4);
  }, [products]);

  // Optimize product filtering
  const filteredProducts = useMemo(() => {
    if (!activeTab) return [];
    return products.filter((p) => p.categories.includes(activeTab));
  }, [products, activeTab]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <SectionTitle title="التصنيفات المميزة">
        <CategoriesTabs
          categories={topCategories}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      </SectionTitle>

      {activeTab ? (
        <ProductSlider products={filteredProducts} isCategorySelected={true} />
      ) : (
        <CategoriesSlider categories={topCategories} />
      )}
    </div>
  );
});

export default CategoriesSection;
