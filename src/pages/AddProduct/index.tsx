import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import React, { useState } from "react";
import { toast } from "react-toastify";
import LoadingPage from "../LoadingPage";
import productService from "../../services/products.service";

const AddProduct = () => {
  const [productName, setProductName] = useState<string>("");
  const [productDescription, setProductDescription] = useState<string>("");
  const [productPrice, setProductPrice] = useState<string>("");
  const [productCategory, setProductCategory] = useState<string>("");
  const [productImages, setProductImages] = useState<File[]>([]); 
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files); 
      setProductImages(files);
      const previews = files.map((file) => URL.createObjectURL(file));
      setImagePreviews(previews);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !productName ||
      !productDescription ||
      !productPrice ||
      productImages.length === 0
    ) {
      toast.error("يرجى ملء جميع الحقول المطلوبة");
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", productName);
      formData.append("description", productDescription);
      formData.append("price", productPrice);
      formData.append("category", productCategory);
      productImages.forEach((image) => {
        formData.append(`images`, image);
      });

      const res = await productService.addProduct(formData);
      console.log(res);
      toast.success("تم إضافة المنتج بنجاح");
      //  navigate("/products");
    } catch (err) {
      console.error("حدث خطأ غير متوقع:", err);
      toast.error("حدث خطأ أثناء إضافة المنتج");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <LoadingPage />;

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        {/* الجانب الأيسر (النموذج) */}
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div>
            <img src={logo} className="w-32 mx-auto" alt="شعار" />
          </div>
          <div className="mt-2 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">
              إضافة منتج جديد
            </h1>
            <div className="w-full flex-1 mt-8">
              {/* حقول الإدخال */}
              <div className="mx-auto max-w-xs">
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="اسم المنتج"
                />
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="text"
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                  placeholder="وصف المنتج"
                />
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="number"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                  placeholder="سعر المنتج"
                />
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="text"
                  value={productCategory}
                  onChange={(e) => setProductCategory(e.target.value)}
                  placeholder="الفئة"
                />
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="file"
                  onChange={handleImageChange}
                  accept="image/*"
                  multiple // السماح باختيار عدة ملفات
                />
                {imagePreviews.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {imagePreviews.map((preview, index) => (
                      <img
                        key={index}
                        src={preview}
                        alt={`معاينة الصورة ${index + 1}`}
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                )}
                <button
                  onClick={handleSubmit}
                  className="mt-5 cursor-pointer tracking-wide font-semibold bg-purple-800 text-gray-100 w-full py-4 rounded-lg hover:bg-purple-900 active:bg-purple-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                >
                  <svg
                    className="w-6 h-6 -mr-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 4v16m8-8H4" />
                  </svg>
                  <span className="mr-3">إضافة المنتج</span>
                </button>
                <p className="mt-6 text-xs text-gray-600 text-center">
                  <Link
                    to={"/products"}
                    className="border-b border-gray-500 border-dotted"
                  >
                    العودة إلى قائمة المنتجات
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* الجانب الأيمن (صورة توضيحية) */}
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
