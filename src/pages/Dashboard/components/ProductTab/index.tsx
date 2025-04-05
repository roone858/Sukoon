import { Link } from "react-router-dom";
import ProductTable from "../ProductTable";

const ProductDashboard = () => {
  return (
    <div className=" dark:bg-gray-900 min-h-screen">
      {/* Header container - column on mobile, row on sm+ */}
      <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center mb-3 sm:mb-4">
        {/* Title - smaller on mobile */}
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
          قائمة المنتجات
        </h1>
        
        {/* Add product button - full width on mobile, auto width on sm+ */}
        <Link
          className="w-full sm:w-auto text-xs sm:text-sm font-semibold bg-purple-800 text-gray-100 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg hover:bg-purple-900 active:bg-purple-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
          to={"/add-product"}
        >
          اضافة منتج جديد
        </Link>
      </div>
      
      {/* Product table - reduced padding/margins on mobile */}
      <div className="overflow-x-auto">
        <ProductTable />
      </div>
    </div>
  );
};

export default ProductDashboard;