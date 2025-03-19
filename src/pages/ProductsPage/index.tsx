import { useState, useMemo, useEffect } from "react";
import Breadcrumb from "../../component/Breadcrumb";
import Card from "../../component/Card";
import CategoryBar from "../../component/CategoryBar";
import { BreadcrumbLink, Product } from "../../util/types";
import { useStoreContext } from "../../context/useContext/useStoreContext";

const ProductsPage: React.FC = () => {
  const { products, isLoading } = useStoreContext();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  // Memoize the categories array to avoid unnecessary recalculations
  const categories = useMemo(() => {
    return [...new Set(products.map((product) => product.category))];
  }, [products]); // Only recalculate if `products` changes

  const handleSelectCategory = (category: string) => {
    if (category === "all") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product.category === category
      );
      setFilteredProducts(filtered);
    }
  };
  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  // Breadcrumb links
  const breadcrumbLinks: BreadcrumbLink[] = [
    {
      to: "/category/shirts/plain-tee",
      label: "المنتجات",
      isActive: true,
    },
  ];

  if (isLoading) return <p>Loading...</p>;
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      {/* Breadcrumb */}
      <Breadcrumb links={breadcrumbLinks} />

      {/* Page Content */}
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          منتجاتنا
        </h1>

        {/* Category Bar */}
        <CategoryBar
          categories={categories}
          onSelectCategory={handleSelectCategory}
        />

        {/* Product List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
