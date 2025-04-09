import { memo, useCallback, useMemo, useState } from "react";
import { useStoreContext } from "../../context/hooks/useStoreContext";
import { SectionTitle } from "./common/SectionTitle";
import { CategoriesTabs } from "./components/CategoriesTabs";
import { ProductSlider } from "./components/ProductSlider";
import { CategoriesSlider } from "./components/CategoriesSlider";

// Memoize the main component to prevent unnecessary re-renders
const CategoriesSection = memo(function CategoriesSection() {
  const { products ,categories} = useStoreContext();
  const [activeTab, setActiveTab] = useState<string>("");

  // Memoize the tab change handler
  const handleTabChange = useCallback((tabId: string) => {
    setActiveTab(tabId);
  }, []);

  // Optimize category calculation
  

  // Optimize product filtering
  const filteredProducts = useMemo(() => {
    if (!activeTab) return [];
    return products.filter((p) => p.categories.includes(activeTab));
  }, [products, activeTab]);

  return (
    <div className="w-full max-w-7xl mx-auto px-2 xs:px-4 py-4 xs:py-8">
      <SectionTitle title="التصنيفات المميزة">
        <CategoriesTabs
          categories={categories}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      </SectionTitle>

      {activeTab ? (
        <ProductSlider products={filteredProducts} isCategorySelected={true} />
      ) : (
        <CategoriesSlider categories={categories} />
      )}
    </div>
  );
});

export default CategoriesSection;
