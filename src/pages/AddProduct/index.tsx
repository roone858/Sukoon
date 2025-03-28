import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import React, { useState, useCallback } from "react";
import { toast } from "react-toastify";
import LoadingPage from "../LoadingPage";
import productService from "../../services/products.service";
import { useStoreContext } from "../../context/useContext/useStoreContext";

interface FormDataState {
  name: string;
  description: string;
  price: number | string;
  stock: number | string;
  discount: number | string;
  discountEndDate: string;
  categories: string[];
  tags: string[];
}

const AddProduct = () => {
  const [formData, setFormData] = useState<FormDataState>({
    name: "",
    description: "",
    price: "",
    stock: "",
    discount: "0",
    discountEndDate: "",
    categories: [],
    tags: [],
  });
  const { products, updateProducts } = useStoreContext();
  const [productImages, setProductImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentCategoryInput, setCurrentCategoryInput] = useState<string>("");
  const [currentTagInput, setCurrentTagInput] = useState<string>("");
  const navigate = useNavigate();

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    []
  );

  const handleAddCategory = useCallback(() => {
    if (
      currentCategoryInput &&
      !formData.categories.includes(currentCategoryInput)
    ) {
      if (formData.categories.length >= 10) {
        toast.warning("يمكنك إضافة 10 فئات كحد أقصى");
        return;
      }
      setFormData((prev) => ({
        ...prev,
        categories: [...prev.categories, currentCategoryInput],
      }));
      setCurrentCategoryInput("");
    }
  }, [currentCategoryInput, formData.categories]);

  const handleRemoveCategory = useCallback((categoryToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.filter((cat) => cat !== categoryToRemove),
    }));
  }, []);

  const handleAddTag = useCallback(() => {
    if (currentTagInput && !formData.tags.includes(currentTagInput)) {
      if (formData.tags.length >= 10) {
        toast.warning("يمكنك إضافة 10 علامات كحد أقصى");
        return;
      }
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, currentTagInput],
      }));
      setCurrentTagInput("");
    }
  }, [currentTagInput, formData.tags]);

  const handleRemoveTag = useCallback((tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  }, []);

  const handleImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const files = Array.from(e.target.files);

        const validFiles = files.filter((file) => {
          const validTypes = ["image/jpeg", "image/png", "image/webp"];
          const maxSize = 5 * 1024 * 1024;

          if (!validTypes.includes(file.type)) {
            toast.warning(`تم تخطي ${file.name}: نوع الملف غير مدعوم`);
            return false;
          }

          if (file.size > maxSize) {
            toast.warning(
              `تم تخطي ${file.name}: حجم الملف كبير جداً (الحد الأقصى 5MB)`
            );
            return false;
          }

          return true;
        });

        imagePreviews.forEach((preview) => URL.revokeObjectURL(preview));
        const previews = validFiles.map((file) => URL.createObjectURL(file));
        setProductImages(validFiles);
        setImagePreviews(previews);
      }
    },
    [imagePreviews]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Convert price and stock to numbers
    const price = Number(formData.price);
    const stock = Number(formData.stock);
    const discount = Number(formData.discount);

    // Validate form
    if (
      !formData.name ||
      !formData.description ||
      isNaN(price) ||
      isNaN(stock) ||
      formData.categories.length === 0 ||
      productImages.length === 0
    ) {
      toast.error("يرجى ملء جميع الحقول المطلوبة");
      return;
    }

    if (price <= 0) {
      toast.error("يرجى إدخال سعر صحيح (أكبر من 0)");
      return;
    }

    if (stock < 0) {
      toast.error("يرجى إدخال كمية مخزون صحيحة (0 أو أكثر)");
      return;
    }
    if (isNaN(discount) || discount < 0 || discount > 100) {
      toast.error("نسبة الخصم يجب أن تكون بين 0 و 100");
      return;
    }
    if (discount > 0 && !formData.discountEndDate) {
      toast.error("يرجى تحديد تاريخ انتهاء الخصم");
      return;
    }

    setIsLoading(true);

    try {
      const formDataToSend = new FormData();

      // Append simple fields
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("price", price.toString());
      formDataToSend.append("stock", stock.toString());
      formDataToSend.append("discount", discount.toString());
      formDataToSend.append("discountEndDate", formData.discountEndDate);
      // Append arrays properly
      formData.categories.forEach((cat) => {
        formDataToSend.append("categories[]", cat);
      });

      formData.tags.forEach((tag) => {
        formDataToSend.append("tags[]", tag);
      });

      // Append images
      productImages.forEach((image) => {
        formDataToSend.append("images", image);
      });

      if (discount <= 0) {
        formDataToSend.delete("discountEndDate");
      }

      const newProduct = await productService.addProduct(formDataToSend);
      if (newProduct) updateProducts([newProduct, ...products]);
      // After successful submission
      setImagePreviews([]); // Clear previews
      // URL.revokeObjectURL(preview); // Clean up memory

      toast.success("تم إضافة المنتج بنجاح");
      navigate("/products");
    } catch (err) {
      console.error("Error adding product:", err);

      let errorMessage = "حدث خطأ أثناء إضافة المنتج";

      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === "object" && err !== null && "response" in err) {
        const axiosError = err as {
          response?: { data?: { message?: string } };
        };
        errorMessage = axiosError.response?.data?.message || errorMessage;
      }

      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
      imagePreviews.forEach((preview) => URL.revokeObjectURL(preview));
    }
  };

  if (isLoading) return <LoadingPage />;

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
              <form onSubmit={handleSubmit} className="mx-auto max-w-xs">
                {/* Name Input */}
                <input
                  name="name"
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="اسم المنتج"
                  required
                  maxLength={120}
                />

                {/* Description Input */}
                <textarea
                  name="description"
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="وصف المنتج"
                  required
                  maxLength={2000}
                  rows={4}
                />

                {/* Price Input */}
                <input
                  name="price"
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="سعر المنتج"
                  required
                />
                {/* Discount Input */}
                <div className="mt-5">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الخصم (%) (اختياري)
                  </label>
                  <input
                    name="discount"
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.discount}
                    onChange={handleInputChange}
                    placeholder="نسبة الخصم"
                  />
                </div>
                {/* Discount End Date Input */}
                {Number(formData.discount) > 0 && (
                  <div className="mt-3">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      تاريخ انتهاء الخصم
                    </label>
                    <input
                      name="discountEndDate"
                      type="date"
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      value={formData.discountEndDate}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split("T")[0]} // Disable past dates
                    />
                  </div>
                )}
                {/* Stock Input */}
                <input
                  name="stock"
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="number"
                  min="0"
                  value={formData.stock}
                  onChange={handleInputChange}
                  placeholder="الكمية في المخزن"
                  required
                />

                {/* Categories Input */}
                <div className="mt-5">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الفئات (مطلوب)
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      value={currentCategoryInput}
                      onChange={(e) => setCurrentCategoryInput(e.target.value)}
                      placeholder="أضف فئة جديدة"
                      className="flex-1 px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      maxLength={30}
                    />
                    <button
                      type="button"
                      onClick={handleAddCategory}
                      className="bg-purple-600 text-white px-4 py-2 rounded-r-lg hover:bg-purple-700"
                    >
                      إضافة
                    </button>
                  </div>
                  {formData.categories.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {formData.categories.map((category, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full bg-gray-200 text-gray-800 text-sm"
                        >
                          {category}
                          <button
                            type="button"
                            onClick={() => handleRemoveCategory(category)}
                            className="mr-1 text-gray-600 hover:text-gray-900"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Tags Input */}
                <div className="mt-5">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    العلامات (اختياري)
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      value={currentTagInput}
                      onChange={(e) => setCurrentTagInput(e.target.value)}
                      placeholder="أضف علامة جديدة"
                      className="flex-1 px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      maxLength={20}
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="bg-purple-600 text-white px-4 py-2 rounded-r-lg hover:bg-purple-700"
                    >
                      إضافة
                    </button>
                  </div>
                  {formData.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {formData.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full bg-gray-200 text-gray-800 text-sm"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => handleRemoveTag(tag)}
                            className="mr-1 text-gray-600 hover:text-gray-900"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Images Input */}
                <div className="mt-5">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    صور المنتج (مطلوب)
                  </label>
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="file"
                    onChange={handleImageChange}
                    accept="image/jpeg, image/png, image/webp"
                    multiple
                    required
                  />
                </div>
                {Number(formData.discount) > 0 && (
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                    <p className="text-blue-800 font-medium">
                      السعر بعد الخصم:{" "}
                      <span className="font-bold">
                        {(
                          Number(formData.price) *
                          (1 - Number(formData.discount) / 100)
                        ).toFixed(2)}{" "}
                        ر.س
                      </span>
                    </p>
                    <p className="text-sm text-blue-600 mt-1">
                      (السعر الأصلي: {Number(formData.price).toFixed(2)} ر.س -
                      خصم: {formData.discount}%)
                    </p>
                    {formData.discountEndDate && (
                      <p className="text-sm text-blue-600 mt-1">
                        صالح حتى:{" "}
                        {new Date(formData.discountEndDate).toLocaleDateString(
                          "ar-EG"
                        )}
                      </p>
                    )}
                  </div>
                )}
                {/* Image Previews */}
                {imagePreviews.length > 0 && (
                  <div className="mt-5">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">
                      معاينة الصور:
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative">
                          <img
                            src={preview}
                            alt={`معاينة الصورة ${index + 1}`}
                            className="w-24 h-24 object-cover rounded-lg border"
                          />
                          <span className="absolute top-0 right-0 bg-black bg-opacity-50 text-white text-xs px-1 rounded">
                            {productImages[index]?.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="mt-5 cursor-pointer tracking-wide font-semibold bg-purple-800 text-gray-100 w-full py-4 rounded-lg hover:bg-purple-900 active:bg-purple-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="mr-3">جاري الإضافة...</span>
                  ) : (
                    <>
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
                    </>
                  )}
                </button>

                {/* Back Link */}
                <p className="mt-6 text-xs text-gray-600 text-center">
                  <Link
                    to="/products"
                    className="border-b border-gray-500 border-dotted hover:text-purple-800"
                  >
                    العودة إلى قائمة المنتجات
                  </Link>
                </p>
              </form>
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
