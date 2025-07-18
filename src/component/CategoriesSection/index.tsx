import { memo, useCallback, useEffect, useState } from "react";
import { useStoreContext } from "../../context/hooks/useStoreContext";
import { SectionTitle } from "./common/SectionTitle";
import { CategoriesTabs } from "./components/CategoriesTabs";
import { ProductSlider } from "./components/ProductSlider";
import { CategoriesSlider } from "./components/CategoriesSlider";
import ProductCardPlaceholder from "../CardPlaceholder";
import categoriesService from "../../services/categories.service";
import { Product } from "../../types/product.type";

const CategoriesSection = memo(function CategoriesSection() {
  const { categories } = useStoreContext();
  const [activeTab, setActiveTab] = useState<string>("");
  const [productsOfCategory, setProductsOfCategory] = useState<Product[]>([]);

  const [isPending, setIsPending] = useState(false);

  const handleTabChange = useCallback((tabId: string) => {
    setActiveTab(tabId);
  }, []);

  useEffect(() => {
    const fetchProductsOfCategory = async () => {
      setIsPending(true);
      if (activeTab) {
        const result = await categoriesService.getProductsOfCategory(activeTab);
        setProductsOfCategory(result || []);
      }
    };
    fetchProductsOfCategory().finally(() => setIsPending(false));
  }, [activeTab]);

  return (
    <div className="w-full max-w-7xl mx-auto px-2 xs:px-4 py-4 xs:py-8">
      <SectionTitle title="التصنيفات المميزة">
        <CategoriesTabs
          categories={categories}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      </SectionTitle>

      {isPending ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-10 mx-10 mt-6">
          {Array.from({ length: 2 }).map((_, i) => (
            <ProductCardPlaceholder key={i} />
          ))}
        </div>
      ) : activeTab && productsOfCategory.length > 0 ? (
        <ProductSlider products={productsOfCategory.slice(0, 6) || []} />
      ) : (
        <CategoriesSlider categories={categories} />
      )}
    </div>
  );
});

export default CategoriesSection;
