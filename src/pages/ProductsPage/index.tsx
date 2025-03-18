import Breadcrumb from "../../component/Breadcrumb";
import Card from "../../component/Card";
import { products } from "../../db";

const ProductsPage = () => {
  // بيانات المنتجات (يمكن استبدالها بطلب API)


  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <Breadcrumb
        links={[
          {
            to: "/category/shirts/plain-tee",
            label: "المنتجات",
            isActive: true,
          },
        ]}
      />
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          منتجاتنا
        </h1>

        {/* عرض قائمة المنتجات */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
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
