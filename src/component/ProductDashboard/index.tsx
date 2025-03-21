import ProductTable from "../ProductTable";

const ProductDashboard = () => {
  return (
    <div className="p-6  dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        قائمة المنتجات
      </h1>
      <ProductTable />
    </div>
  );
};

export default ProductDashboard;
