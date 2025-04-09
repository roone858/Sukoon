import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

import ProductFormFields from "./components/ProductFormFields";

const AddProduct = () => {
  // State

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        {/* Form Section */}
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div>
            <img src={logo} className="w-32 mx-auto" alt="Logo" />
          </div>
          <div className="mt-2 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">
              إضافة منتج جديد
            </h1>
            <div className="w-full flex-1 mt-8">
              <ProductFormFields />

              {/* Back Link */}
              <p className="mt-6 text-xs text-gray-600 text-center">
                <Link
                  to="/products"
                  className="border-b border-gray-500 border-dotted hover:text-purple-800"
                >
                  العودة إلى قائمة المنتجات
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Illustration Section */}
        <div className="flex-1 bg-purple-100 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
