import { ChangeEvent, useRef, useState, KeyboardEvent } from "react";
import { useForm } from "react-hook-form";
import categoryService from "../../services/categories.service";
import { toast } from "react-toastify";
import { useStoreContext } from "../../context/hooks/useStoreContext";
import { Link } from "react-router-dom";

type FormData = {
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
  image?: FileList;
  imageUrl?: string;
  existingImageUrl?: string;
  metaTitle?: string;
  metaDescription?: string;
  seoKeywords?: string[];
  displayOrder?: number;
  isActive?: boolean;
};

export default function CategoryFormMobileOptimized() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>();
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [useImageUrl, setUseImageUrl] = useState(false); // حالة لتحديد طريقة إدخال الصورة
  const { categories, updateCategories } = useStoreContext();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [keywordInput, setKeywordInput] = useState("");

  // Get current keywords from form
  const currentKeywords = watch("seoKeywords") || [];
  const keywordsArray = Array.isArray(currentKeywords) ? currentKeywords : [];

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setValue("image", e.target.files);
      setValue("imageUrl", ""); // مسح رابط الصورة عند تحميل صورة جديدة
      setUseImageUrl(false);

      // إنشاء معاينة للصورة
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const removeImage = () => {
    setValue("image", undefined);
    setValue("existingImageUrl", "");
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  const handleImageUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue("imageUrl", e.target.value);
    if (e.target.value) {
      setImagePreview(e.target.value);
      setValue("image", undefined); // مسح ملف الصورة عند استخدام الرابط
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  // Handle keyword input
  const handleKeywordKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (["Enter", "Tab", ","].includes(e.key) && keywordInput.trim()) {
      e.preventDefault();
      addKeyword();
    }
  };

  const addKeyword = () => {
    if (keywordInput.trim()) {
      const newKeywords = [...keywordsArray, keywordInput.trim()];
      setValue("seoKeywords", newKeywords);
      setKeywordInput("");
    }
  };

  const removeKeyword = (index: number) => {
    const newKeywords = [...keywordsArray];
    newKeywords.splice(index, 1);
    setValue("seoKeywords", newKeywords);
  };
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();

      // Add required fields
      formData.append("name", data.name);
      formData.append("slug", data.slug);

      // Add optional fields if they exist
      if (data.description) formData.append("description", data.description);
      if (data.parentId) formData.append("parentId", data.parentId);
      if (data.metaTitle) formData.append("metaTitle", data.metaTitle);
      if (data.metaDescription)
        formData.append("metaDescription", data.metaDescription);
      if (data.seoKeywords && data.seoKeywords.length > 0) {
        data.seoKeywords.forEach((keyword) => {
          formData.append("seoKeywords[]", keyword);
        });
      }
      if (data.displayOrder)
        formData.append("displayOrder", data.displayOrder.toString());
      // if (data.isActive !== undefined)
      //   formData.append("isActive", data.isActive.toString());
      // معالجة الصورة
      if (data.image?.[0]) {
        formData.append("image", data.image[0]);
      } else if (data.imageUrl) {
        formData.append("imageUrl", data.imageUrl);
      }

      const newCat = await categoryService.createCategory(formData);
      if (newCat) {
        reset();
        toast.success("تمت إضافة الفئة بنجاح!");
        updateCategories([...categories, newCat]);
      } else {
        toast.error("حدث خطأ أثناء إضافة الفئة");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("حدث خطأ أثناء إضافة الفئة");
    } finally {
      setIsSubmitting(false);
    }
  };
//return
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white py-4 px-3 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header - Optimized for mobile */}
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 px-4 py-3 sm:px-6 sm:py-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              إضافة فئة جديدة
            </h2>
            <p className="text-purple-100 text-xs sm:text-sm mt-1">
              املأ التفاصيل الأساسية للفئة
            </p>
          </div>

          {/* Form - Mobile optimized */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-4 sm:p-6 space-y-4 sm:space-y-6"
          >
            {/* Basic Information Section */}
            <div className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:gap-6">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    اسم الفئة <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("name", { required: true })}
                    className={`w-full px-3 py-2 text-sm sm:text-base rounded-lg border ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                    placeholder="مثال: إلكترونيات"
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-600">هذا الحقل مطلوب</p>
                  )}
                </div>

                {/* Slug Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    الرابط (Slug) <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("slug", { required: true })}
                    className={`w-full px-3 py-2 text-sm sm:text-base rounded-lg border ${
                      errors.slug ? "border-red-500" : "border-gray-300"
                    } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                    placeholder="مثال: electronics"
                  />
                  {errors.slug && (
                    <p className="mt-1 text-xs text-red-600">هذا الحقل مطلوب</p>
                  )}
                </div>
              </div>

              {/* Description Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  الوصف
                </label>
                <textarea
                  {...register("description")}
                  rows={2}
                  className="w-full px-3 py-2 text-sm sm:text-base rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="وصف مختصر للفئة..."
                ></textarea>
              </div>

              {/* Image Upload Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  صورة الفئة
                </label>

                {/* Toggle between upload and URL */}
                <div className="flex space-x-2 mb-3">
                  <button
                    type="button"
                    onClick={() => setUseImageUrl(false)}
                    className={`px-3 py-1 text-sm rounded ${
                      !useImageUrl
                        ? "bg-purple-600 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    تحميل صورة
                  </button>
                  <button
                    type="button"
                    onClick={() => setUseImageUrl(true)}
                    className={`px-3 py-1 text-sm rounded ${
                      useImageUrl
                        ? "bg-purple-600 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    استخدام رابط
                  </button>
                </div>

                {!useImageUrl ? (
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                    <div className="relative w-full sm:w-auto">
                      <label className="flex items-center justify-center px-3 py-2 text-sm sm:text-base bg-purple-50 text-purple-700 rounded-lg border border-purple-200 cursor-pointer hover:bg-purple-100 transition-colors">
                        <span>اختر صورة</span>
                        <input
                          type="file"
                          {...register("image")}
                          onChange={handleImageChange}
                          className="hidden"
                          accept="image/*"
                          ref={fileInputRef}
                        />
                      </label>
                    </div>
                    <span className="text-xs sm:text-sm text-gray-500">
                      الحد الأقصى لحجم الملف: 5MB
                    </span>
                  </div>
                ) : (
                  <div>
                    <input
                      type="url"
                      {...register("imageUrl")}
                      onChange={handleImageUrlChange}
                      className="w-full px-3 py-2 text-sm sm:text-base rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="أدخل رابط الصورة (URL)"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      يجب أن يكون الرابط يشير إلى صورة مباشرة
                    </p>
                  </div>
                )}

                {imagePreview && (
                  <div className="mt-3 flex flex-col items-start">
                    <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-lg overflow-hidden border border-gray-200">
                      <img
                        src={imagePreview}
                        alt="معاينة الصورة"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3 sm:h-4 sm:w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                    <span className="mt-1 text-xs text-gray-500">
                      {useImageUrl ? "رابط الصورة" : "الصورة المختارة"}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Advanced Options Toggle - Mobile friendly */}
            <div className="pt-3 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
                className="flex items-center justify-between w-full text-purple-600 hover:text-purple-800 transition-colors"
              >
                <span className="font-medium text-sm sm:text-base">
                  خيارات متقدمة
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 transform transition-transform ${
                    isAdvancedOpen ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            {/* Advanced Options - Stacked on mobile */}
            {isAdvancedOpen && (
              <div className="space-y-4 sm:space-y-6 bg-purple-50 rounded-lg p-4 sm:p-6 mt-3">
                <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2">
                  {/* Parent Category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      الفئة الأب
                    </label>
                    <select
                      {...register("parentId")}
                      className="w-full px-3 py-2 text-sm sm:text-base rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">-- اختر فئة أب --</option>

                      {categories?.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                          {cat.slug}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Display Order */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ترتيب العرض
                    </label>
                    <input
                      type="number"
                      {...register("displayOrder")}
                      className="w-full px-3 py-2 text-sm sm:text-base rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="0"
                    />
                  </div>
                </div>

                {/* SEO Fields */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-700">
                    إعدادات SEO
                  </h4>

                  <div>
                    <label className="block text-xs sm:text-sm text-gray-600 mb-1">
                      عنوان SEO
                    </label>
                    <input
                      {...register("metaTitle")}
                      className="w-full px-3 py-2 text-sm sm:text-base rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="عنوان محسن لمحركات البحث"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm text-gray-600 mb-1">
                      وصف SEO
                    </label>
                    <textarea
                      {...register("metaDescription")}
                      rows={2}
                      className="w-full px-3 py-2 text-sm sm:text-base rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="وصف محسن لمحركات البحث..."
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm text-gray-600 mb-1">
                      كلمات دلالية
                    </label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {keywordsArray.map((keyword, index) => (
                        <div
                          key={index}
                          className="flex items-center bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs"
                        >
                          {keyword}
                          <button
                            type="button"
                            onClick={() => removeKeyword(index)}
                            className="mr-1 cursor-pointer text-purple-500 hover:text-purple-700"
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                    </div>
                    <input
                      type="text"
                      value={keywordInput}
                      onChange={(e) => setKeywordInput(e.target.value)}
                      onKeyDown={handleKeywordKeyDown}
                      onBlur={addKeyword}
                      className="w-full px-3 py-2 text-sm sm:text-base rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="أضف كلمات دلالية (اضغط Enter أو Tab بعد كل كلمة)"
                    />
                    <input type="hidden" {...register("seoKeywords")} />
                    <p className="mt-1 text-xs text-gray-500">
                      استخدم علامة الفاصلة أو اضغط Enter لإضافة كلمات متعددة
                    </p>
                  </div>
                </div>

                {/* Status - Mobile friendly */}
                <div className="flex items-center pt-2">
                  <input
                    type="checkbox"
                    id="isActive"
                    {...register("isActive")}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="isActive"
                    className="ml-2 block text-xs sm:text-sm text-gray-700"
                  >
                    الفئة مفعلة
                  </label>
                </div>
              </div>
            )}

            {/* Form Actions - Stacked on mobile */}
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end space-y-2 space-y-reverse sm:space-y-0 sm:space-x-3 pt-4">
              <Link
                to="/dashboard/categories"
                className="px-4 py-2 sm:px-6 sm:py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm sm:text-base"
              >
                إلغاء
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 sm:px-6 sm:py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors text-sm sm:text-base"
              >
                {isSubmitting ? "جاري الحفظ..." : "حفظ الفئة"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
