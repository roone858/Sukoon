import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import React, { useState, useCallback, useMemo } from "react";
import { toast } from "react-toastify";
import LoadingPage from "../LoadingPage";
import productService from "../../services/products.service";
import { useStoreContext } from "../../context/useContext/useStoreContext";

// Types
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

interface ImagePreview {
  url: string;
  name: string;
}

// Constants
const MAX_CATEGORIES = 10;
const MAX_TAGS = 10;
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
const VALID_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

const AddProduct = () => {
  // State
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
  const [imagePreviews, setImagePreviews] = useState<ImagePreview[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentCategoryInput, setCurrentCategoryInput] = useState<string>("");
  const [currentTagInput, setCurrentTagInput] = useState<string>("");
  const navigate = useNavigate();

  // Computed values
  const discountedPrice = useMemo(() => {
    if (Number(formData.discount) > 0 && Number(formData.price) > 0) {
      return Number(formData.price) * (1 - Number(formData.discount) / 100);
    }
    return null;
  }, [formData.price, formData.discount]);

  // Handlers
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    []
  );

  const handleAddItem = useCallback(
    (type: "categories" | "tags") => {
      const currentInput =
        type === "categories" ? currentCategoryInput : currentTagInput;
      const currentItems = formData[type];
      const maxItems = type === "categories" ? MAX_CATEGORIES : MAX_TAGS;

      if (!currentInput || currentItems.includes(currentInput)) return;

      if (currentItems.length >= maxItems) {
        toast.warning(
          `يمكنك إضافة ${maxItems} ${
            type === "categories" ? "فئات" : "علامات"
          } كحد أقصى`
        );
        return;
      }

      setFormData((prev) => ({
        ...prev,
        [type]: [...prev[type], currentInput],
      }));

      if (type === "categories") {
        setCurrentCategoryInput("");
      } else {
        setCurrentTagInput("");
      }
    },
    [currentCategoryInput, currentTagInput, formData]
  );

  const handleRemoveItem = useCallback(
    (type: "categories" | "tags") => (itemToRemove: string) => {
      setFormData((prev) => ({
        ...prev,
        [type]: prev[type].filter((item) => item !== itemToRemove),
      }));
    },
    []
  );

  const handleImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files || e.target.files.length === 0) return;

      const files = Array.from(e.target.files);
      const validFiles: File[] = [];
      const newPreviews: ImagePreview[] = [];

      files.forEach((file) => {
        if (!VALID_IMAGE_TYPES.includes(file.type)) {
          toast.warning(`تم تخطي ${file.name}: نوع الملف غير مدعوم`);
          return;
        }

        if (file.size > MAX_IMAGE_SIZE) {
          toast.warning(
            `تم تخطي ${file.name}: حجم الملف كبير جداً (الحد الأقصى 5MB)`
          );
          return;
        }

        validFiles.push(file);
        newPreviews.push({
          url: URL.createObjectURL(file),
          name: file.name,
        });
      });

      // Clean up previous previews
      imagePreviews.forEach((preview) => URL.revokeObjectURL(preview.url));

      setProductImages(validFiles);
      setImagePreviews(newPreviews);
    },
    [imagePreviews]
  );

  const validateForm = () => {
    const price = Number(formData.price);
    const stock = Number(formData.stock);
    const discount = Number(formData.discount);

    // Required fields validation
    if (
      !formData.name ||
      !formData.description ||
      isNaN(price) ||
      isNaN(stock) ||
      formData.categories.length === 0 ||
      productImages.length === 0
    ) {
      toast.error("يرجى ملء جميع الحقول المطلوبة");
      return false;
    }

    // Price validation
    if (price <= 0) {
      toast.error("يرجى إدخال سعر صحيح (أكبر من 0)");
      return false;
    }

    // Stock validation
    if (stock < 0) {
      toast.error("يرجى إدخال كمية مخزون صحيحة (0 أو أكثر)");
      return false;
    }

    // Discount validation
    if (isNaN(discount) || discount < 0 || discount > 100) {
      toast.error("نسبة الخصم يجب أن تكون بين 0 و 100");
      return false;
    }

    // Discount end date validation
    if (discount > 0 && !formData.discountEndDate) {
      toast.error("يرجى تحديد تاريخ انتهاء الخصم");
      return false;
    }

    return true;
  };

  const prepareFormData = () => {
    const formDataToSend = new FormData();
    const price = Number(formData.price);
    const stock = Number(formData.stock);
    const discount = Number(formData.discount);

    // Append simple fields
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("price", price.toString());
    formDataToSend.append("stock", stock.toString());
    formDataToSend.append("discount", discount.toString());

    // Append discount end date only if discount exists
    if (discount > 0) {
      formDataToSend.append("discountEndDate", formData.discountEndDate);
    }

    // Append arrays
    formData.categories.forEach((cat) =>
      formDataToSend.append("categories[]", cat)
    );
    formData.tags.forEach((tag) => formDataToSend.append("tags[]", tag));

    // Append images
    productImages.forEach((image) => formDataToSend.append("images", image));

    return formDataToSend;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const formDataToSend = prepareFormData();
      const newProduct = await productService.addProduct(formDataToSend);

      if (newProduct) {
        updateProducts([newProduct, ...products]);
        toast.success("تم إضافة المنتج بنجاح");
        navigate("/products");
      }
    } catch (err) {
      handleSubmissionError(err);
    } finally {
      cleanup();
    }
  };

  const handleSubmissionError = (err: unknown) => {
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
  };

  const cleanup = () => {
    setIsLoading(false);
    imagePreviews.forEach((preview) => URL.revokeObjectURL(preview.url));
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
                  onChange={handleInputChange}
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
                      min={new Date().toISOString().split("T")[0]}
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
                <TagInputSection
                  label="الفئات (مطلوب)"
                  items={formData.categories}
                  currentInput={currentCategoryInput}
                  onInputChange={setCurrentCategoryInput}
                  onAddItem={() => handleAddItem("categories")}
                  onRemoveItem={handleRemoveItem("categories")}
                  placeholder="أضف فئة جديدة"
                  maxLength={30}
                />

                {/* Tags Input */}
                <TagInputSection
                  label="العلامات (اختياري)"
                  items={formData.tags}
                  currentInput={currentTagInput}
                  onInputChange={setCurrentTagInput}
                  onAddItem={() => handleAddItem("tags")}
                  onRemoveItem={handleRemoveItem("tags")}
                  placeholder="أضف علامة جديدة"
                  maxLength={20}
                />

                {/* Images Input */}
                <div className="mt-5">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    صور المنتج (مطلوب)
                  </label>
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="file"
                    onChange={handleImageChange}
                    accept={VALID_IMAGE_TYPES.join(", ")}
                    multiple
                    required
                  />
                </div>

                {/* Discount Info */}
                {discountedPrice && (
                  <DiscountInfo
                    originalPrice={Number(formData.price)}
                    discount={Number(formData.discount)}
                    discountedPrice={discountedPrice}
                    discountEndDate={formData.discountEndDate}
                  />
                )}

                {/* Image Previews */}
                {imagePreviews.length > 0 && (
                  <ImagePreviewsSection previews={imagePreviews} />
                )}

                {/* Submit Button */}
                <SubmitButton isLoading={isLoading} />

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

// Sub-components
interface TagInputSectionProps {
  label: string;
  items: string[];
  currentInput: string;
  onInputChange: (value: string) => void;
  onAddItem: () => void;
  onRemoveItem: (item: string) => void;
  placeholder: string;
  maxLength: number;
}

const TagInputSection: React.FC<TagInputSectionProps> = ({
  label,
  items,
  currentInput,
  onInputChange,
  onAddItem,
  onRemoveItem,
  placeholder,
  maxLength,
}) => (
  <div className="mt-5">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <div className="flex">
      <input
        type="text"
        value={currentInput}
        onChange={(e) => onInputChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 px-4 py-2 rounded-r-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
        maxLength={maxLength}
      />
      <button
        type="button"
        onClick={onAddItem}
        className="bg-purple-600 text-white px-4 py-2 rounded-l-lg hover:bg-purple-700"
      >
        إضافة
      </button>
    </div>
    {items.length > 0 && (
      <div className="mt-2 flex flex-wrap gap-2">
        {items.map((item, index) => (
          <span
            key={index}
            className="inline-flex items-center px-3 py-1 rounded-full bg-gray-200 text-gray-800 text-sm"
          >
            {item}
            <button
              type="button"
              onClick={() => onRemoveItem(item)}
              className="mr-1 text-gray-600 hover:text-gray-900"
            >
              ×
            </button>
          </span>
        ))}
      </div>
    )}
  </div>
);

interface DiscountInfoProps {
  originalPrice: number;
  discount: number;
  discountedPrice: number;
  discountEndDate: string;
}

const DiscountInfo: React.FC<DiscountInfoProps> = ({
  originalPrice,
  discount,
  discountedPrice,
  discountEndDate,
}) => (
  <div className="mt-3 p-3 bg-blue-50 rounded-lg">
    <p className="text-blue-800 font-medium">
      السعر بعد الخصم:{" "}
      <span className="font-bold">{discountedPrice.toFixed(2)} ر.س</span>
    </p>
    <p className="text-sm text-blue-600 mt-1">
      (السعر الأصلي: {originalPrice.toFixed(2)} ر.س - خصم: {discount}%)
    </p>
    {discountEndDate && (
      <p className="text-sm text-blue-600 mt-1">
        صالح حتى: {new Date(discountEndDate).toLocaleDateString("ar-EG")}
      </p>
    )}
  </div>
);

interface ImagePreviewsSectionProps {
  previews: ImagePreview[];
}

const ImagePreviewsSection: React.FC<ImagePreviewsSectionProps> = ({
  previews,
}) => (
  <div className="mt-5">
    <h3 className="text-sm font-medium text-gray-700 mb-2">معاينة الصور:</h3>
    <div className="flex flex-wrap gap-2">
      {previews.map((preview, index) => (
        <div key={index} className="relative">
          <img
            src={preview.url}
            alt={`معاينة الصورة ${index + 1}`}
            className="w-24 h-24 object-cover rounded-lg border"
          />
          <span className="absolute top-0 right-0 bg-black bg-opacity-50 text-white text-xs px-1 rounded">
            {preview.name}
          </span>
        </div>
      ))}
    </div>
  </div>
);

interface SubmitButtonProps {
  isLoading: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ isLoading }) => (
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
);

export default AddProduct;
