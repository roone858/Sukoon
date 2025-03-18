import { useState } from "react";
import Breadcrumb from "../../component/Breadcrumb";
import Card from "../../component/Card";
import { products } from "../../db";
import CategoryBar from "../../component/CategoryBar";
import { BreadcrumbLink, Product } from "../../util/types";

const ProductsPage: React.FC = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  const categories: string[] = [
    ...new Set(products.map((product) => product.category)),
  ];

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

  const breadcrumbLinks: BreadcrumbLink[] = [
    {
      to: "/category/shirts/plain-tee",
      label: "المنتجات",
      isActive: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <Breadcrumb links={breadcrumbLinks} />
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          منتجاتنا
        </h1>
        <CategoryBar
          categories={categories}
          onSelectCategory={handleSelectCategory}
        />
        {/* <SideMenu
          categories={categories}
          onSelectCategory={handleSelectCategory}
        /> */}
        {/* عرض قائمة المنتجات */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              imageUrl={product.image}
              title={product.title}
              description={product.description}
              link={product.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
