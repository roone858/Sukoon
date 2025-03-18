import Breadcrumb from "../../component/Breadcrumb";
import Card from "../../component/Card";

const ProductsPage = () => {
  // بيانات المنتجات (يمكن استبدالها بطلب API)
  const products = [
    {
      id: 1,
      name: "مرتبة فندقية فاخرة",
      description: "مرتبة فندقية بجودة عالية، مريحة ومناسبة لجميع الأجسام.",
      price: 1200,
      image: "https://via.placeholder.com/300",
    },
    {
      id: 2,
      name: "مرتبة طبية",
      description: "مرتبة طبية تدعم الظهر وتوفر الراحة أثناء النوم.",
      price: 1500,
      image: "https://via.placeholder.com/300",
    },
    {
      id: 3,
      name: "مرتبة أطفال",
      description: "مرتبة ناعمة ومريحة مصممة خصيصًا للأطفال.",
      price: 800,
      image: "https://via.placeholder.com/300",
    },
    {
      id: 4,
      name: "مرتبة إسفنج عالي الكثافة",
      description: "مرتبة إسفنجية عالية الكثافة تدعم الجسم بشكل مثالي.",
      price: 1000,
      image: "https://via.placeholder.com/300",
    },
  ];

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
              title={product.name}
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
