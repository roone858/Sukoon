import { ChangeEvent, useEffect, useRef, useState,KeyboardEvent  } from "react";
import { useForm } from "react-hook-form";
import categoryService from "../../services/categories.service";
import { toast } from "react-toastify";
import { useStoreContext } from "../../context/hooks/useStoreContext";
import { useNavigate, useParams } from "react-router-dom";

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

export default function EditCategoryForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>();
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [useImageUrl, setUseImageUrl] = useState(false);
  const { categories, updateCategories } = useStoreContext();
  const [keywordInput, setKeywordInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { id } = useParams();
  // Get current keywords from form
  const currentKeywords = watch("seoKeywords") || [];
  const keywordsArray = Array.isArray(currentKeywords) ? currentKeywords : [];

  useEffect(() => {
    const loadCategory = async () => {
      if (!id) return;
      try {
        const category = await categoryService.getCategoryById(id);
        if (category) {
          setValue("name", category.name);
          setValue("slug", category.slug);
          setValue("description", category.description || "");
          setValue("parentId", category.parentId || "");
          setValue("metaTitle", category.metaTitle || "");
          setValue("metaDescription", category.metaDescription || "");
          setValue("seoKeywords", category.seoKeywords || []);
          setValue("displayOrder", category.displayOrder || 0);
          setValue("isActive", category.isActive);

          if (category.imageUrl) {
            setImagePreview(category.imageUrl);
            setValue("existingImageUrl", category.imageUrl);
            setUseImageUrl(true);
          }
        }
      } catch (error) {
        console.error("Error loading category:", error);
        toast.error("حدث خطأ أثناء تحميل بيانات الفئة");
      } finally {
        setIsLoading(false);
      }
    };

    loadCategory();
  }, [id, setValue]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setValue("image", e.target.files);
      setUseImageUrl(false);

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
      setValue("image", undefined);
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
    if (!id) return;

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
   
      if (data.displayOrder)
        formData.append("displayOrder", data.displayOrder.toString());
     // Append each keyword individually
      if (data.seoKeywords && data.seoKeywords.length > 0) {
        data.seoKeywords.forEach(keyword => {
          formData.append("seoKeywords[]", keyword);
        });
      }

      if (data.displayOrder) formData.append("displayOrder", data.displayOrder.toString());

      // Handle image
      if (data.image?.[0]) {
        formData.append("image", data.image[0]);
      } else if (data.imageUrl) {
        formData.append("imageUrl", data.imageUrl);
      } else if (data.existingImageUrl) {
        formData.append("imageUrl", data.existingImageUrl);
      }
      const updatedCategory = await categoryService.updateCategory(
        id,
        formData
      );
      if (updatedCategory) {
        toast.success("تم تحديث الفئة بنجاح!");
        updateCategories(
          categories.map((cat) =>
            cat._id === updatedCategory._id ? updatedCategory : cat
          )
        );
        navigate("/dashboard");
      } else {
        toast.error("حدث خطأ أثناء تحديث الفئة");
      }
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error("حدث خطأ أثناء تحديث الفئة");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white py-4 px-3 sm:px-6 flex items-center justify-center">
        <div className="text-purple-600">جاري تحميل بيانات الفئة...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white py-4 px-3 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 px-4 py-3 sm:px-6 sm:py-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              تحديث الفئة
            </h2>
            <p className="text-purple-100 text-xs sm:text-sm mt-1">
              قم بتعديل تفاصيل الفئة
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-4 sm:p-6 space-y-4 sm:space-y-6"
          >
            <div className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:gap-6">
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  صورة الفئة
                </label>

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
                  <div className="mt-4">
                    <div className="relative w-32 h-32">
                      <img
                        src={imagePreview}
                        alt="معاينة"
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
                  className="text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center"
                >
                  {isAdvancedOpen ? "إخفاء" : "عرض"} الإعدادات المتقدمة
                  <svg
                    className={`w-4 h-4 mr-1 transform transition-transform ${
                      isAdvancedOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {isAdvancedOpen && (
                  <div>
                    <div className="mt-4 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          الفئة الأم
                        </label>
                        <select
                          {...register("parentId")}
                          className="w-full px-3 py-2 text-sm sm:text-base rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                          <option value="">بدون فئة أم</option>
                          {categories
                            .filter((cat) => cat._id !== id)
                            .map((category) => (
                              <option key={category._id} value={category._id}>
                                {category.name}
                              </option>
                            ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          عنوان ميتا
                        </label>
                        <input
                          type="text"
                          {...register("metaTitle")}
                          className="w-full px-3 py-2 text-sm sm:text-base rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="عنوان SEO"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          وصف ميتا
                        </label>
                        <textarea
                          {...register("metaDescription")}
                          rows={2}
                          className="w-full px-3 py-2 text-sm sm:text-base rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="وصف SEO"
                        ></textarea>
                      </div>

                      <div>
                        <label className="block text-xs sm:text-sm text-gray-600 mb-1">كلمات دلالية</label>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {keywordsArray.map((keyword, index) => (
                            <div key={index} className="flex items-center bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                              {keyword}
                              <button
                                type="button"
                                onClick={() => removeKeyword(index)}
                                className="ml-1 text-purple-500 hover:text-purple-700"
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
                        <p className="mt-1 text-xs text-gray-500">استخدم علامة الفاصلة أو اضغط Enter لإضافة كلمات متعددة</p>
                      </div>
                    </div>

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
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                إلغاء
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
              >
                {isSubmitting ? "جاري التحديث..." : "تحديث الفئة"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
