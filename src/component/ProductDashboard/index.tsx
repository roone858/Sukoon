import { Link } from "react-router-dom";
import ProductTable from "../ProductTable";

const ProductDashboard = () => {
  return (
    <div className="p-6  dark:bg-gray-900 min-h-screen">
      <div className="flex justify-between mb-4 items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white ">
          قائمة المنتجات
        </h1>
        <Link
          className=" cursor-pointer text-sm  font-semibold bg-purple-800 text-gray-100 px-4 py-2 rounded-lg hover:bg-purple-900 active:bg-purple-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
          to={"/add-product"}
        >
          {" "}
          اضافة منتج جديد
        </Link>
      </div>
      <ProductTable />
    </div>
  );
};

export default ProductDashboard;
