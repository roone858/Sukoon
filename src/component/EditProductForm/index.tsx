import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useForm, SubmitHandler, UseFormRegister, Path } from "react-hook-form";
import { Product } from "../../util/types";
import { Dimension } from "../../pages/AddProduct/components/types";
import { MAX_CATEGORIES, MAX_TAGS } from "../../pages/AddProduct/components/constants";
import SelectInputSection from "../../pages/AddProduct/components/SelectInputSection";
import TagInputSection from "../../pages/AddProduct/components/TagInputSection";
import { useStoreContext } from "../../context/hooks/useStoreContext";
import LoadingPage from "../../pages/LoadingPage";

interface Option {
  value: string;
  label: string;
}
interface ProductImage {
  public_id?: string;
  url: string;
  altText?: string;
}
interface EditProductFormProps {
  product: Product & { _id: string };
  onSave: (data: {
    _id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    discount: number;
    discountEndDate?: string;
    categories?: string[];
    tags?: string[];
    images: { public_id?: string; url: string; altText?: string }[];
    newImages?: File[];
    imagesToDelete?: string[];
    dimensions?: Dimension[];
  }) => Promise<void> | void;
  onCancel: () => void;
}

interface FormValues {
  name: string;
  description: string;
  price: number;
  stock: number;
  discount: number;
  discountEndDate: string;
}

interface FormFieldProps {
  register: UseFormRegister<FormValues>;
  errors: Partial<Record<keyof FormValues, { message?: string }>>;
}

interface DimensionSectionProps {
  dimensions: Dimension[];
  addDimension: () => void;
  updateDimension: (
    index: number,
    field: keyof Dimension | `size.${keyof Dimension['size']}`,
    value: string | number | boolean
  ) => void;
  removeDimension: (index: number) => void;
}

interface DimensionInputProps {
  label: string;
  value: string | number;
  onChange: (value: string | number) => void;
  required?: boolean;
  min?: string;
  type?: string;
  placeholder?: string;
  className?: string;
}

interface ImagesSectionProps {
  selectedImages: Array<{ url: string; altText?: string; public_id?: string }>;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeImage: (index: number) => void;
}

interface FormActionsProps {
  isSubmitting: boolean;
  onCancel: () => void;
}

const EditProductForm: React.FC<EditProductFormProps> = ({ product, onSave, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<FormValues>({
    defaultValues: {
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      discount: product.discount || 0,
      discountEndDate: product.discountEndDate
        ? new Date(product.discountEndDate).toISOString().split("T")[0]
        : "",
    },
  });

  // State management
  const [selectedImages, setSelectedImages] = useState(product.images || []);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);
  const [dimensions, setDimensions] = useState<Dimension[]>(product.dimensions || []);
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>(product.tags || []);
  const [isLoading, setIsLoading] = useState(false);

  // Context and derived values
  const { categories } = useStoreContext();
  const categoryOptions = useMemo<Option[]>(
    () => categories.map((cat) => ({ value: cat._id, label: cat.name })),
    [categories]
  );

  const [selectedCategories, setSelectedCategories] = useState<Option[]>(() =>
    (product.categories || [])
      .map((cat) => categoryOptions.find((opt) => opt.value === cat))
      .filter((opt): opt is Option => opt !== undefined)
  );

  const watchDiscount = watch("discount", product.discount || 0);

  // Reset form when product changes
  useEffect(() => {
    reset({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      discount: product.discount || 0,
      discountEndDate: product.discountEndDate
        ? new Date(product.discountEndDate).toISOString().split("T")[0]
        : "",
    });
    setSelectedImages(product.images || []);
    setNewImages([]);
    setImagesToDelete([]);
    setDimensions(product.dimensions || []);
    setSelectedCategories(
      (product.categories || [])
        .map((cat) => categoryOptions.find((opt) => opt.value === cat))
        .filter((opt): opt is Option => opt !== undefined)
    );
    setTags(product.tags || []);
  }, [categoryOptions, product, reset]);

  // Clean up image URLs when component unmounts
  useEffect(() => {
    return () => {
      selectedImages.forEach((image) => {
        if (image.url && !image.public_id) {
          URL.revokeObjectURL(image.url);
        }
      });
    };
  }, [selectedImages]);

  // Dimension handlers
  const addDimension = useCallback(() => {
    setDimensions((prev) => [
      ...prev,
      {
        _id: "",
        size: {
          width: 200,
          height: 200,
          label: "200×200 سم",
        },
        price: product.price,
        stock: product.stock || 0,
        isAvailable: true,
      },
    ]);
  }, [product.price, product.stock]);

  const updateDimension = useCallback(
    (
      index: number,
      field: keyof Dimension | `size.${keyof Dimension['size']}`,
      value: string | number | boolean
    ) => {
      setDimensions((prev) => {
        const updated = [...prev];
        if ((field as string).startsWith("size.")) {
          const sizeField = (field as string).split(".")[1] as keyof Dimension["size"];
          updated[index] = {
            ...updated[index],
            size: {
              ...updated[index].size,
              [sizeField]: value,
              ...(sizeField === "width" || sizeField === "height"
                ? {
                    label: `${
                      sizeField === "width" ? value : updated[index].size.width
                    }×${
                      sizeField === "height" ? value : updated[index].size.height
                    } سم`,
                  }
                : {}),
            },
          };
        } else {
          updated[index] = {
            ...updated[index],
            [field]: value,
          };
        }
        return updated;
      });
    },
    []
  );

  const removeDimension = useCallback((index: number) => {
    if (window.confirm("هل أنت متأكد من حذف هذا المقاس؟")) {
      setDimensions((prev) => prev.filter((_, i) => i !== index));
    }
  }, []);

  // Image handlers
  const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const validFiles = files.filter(
      (file) => file.type.startsWith("image/") && file.size <= 5 * 1024 * 1024
    );

    if (validFiles.length !== files.length) {
      alert("تم تجاهل بعض الملفات غير الصالحة أو كبيرة الحجم (الحد الأقصى 5MB)");
    }

    setNewImages((prev) => [...prev, ...validFiles]);
    const newPreviews = validFiles.map((file) => ({
      url: URL.createObjectURL(file),
      altText: file.name,
    }));
    setSelectedImages((prev) => [...prev, ...newPreviews]);
  }, []);

  const removeImage = useCallback((index: number) => {
    setSelectedImages((prev) => {
      const imageToRemove = prev[index];
      if (imageToRemove.public_id) {
        setImagesToDelete((current) => [...current, imageToRemove.public_id!]);
      } else {
        URL.revokeObjectURL(imageToRemove.url);
        setNewImages((current) =>
          current.filter((file) => URL.createObjectURL(file) !== imageToRemove.url)
        );
      }
      return prev.filter((_, i) => i !== index);
    });
  }, []);

  // Form submission
  const onSubmit: SubmitHandler<FormValues> = async (formData) => {
    setIsLoading(true);
    try {
      await onSave({
        _id: product._id,
        ...formData,
        categories: selectedCategories.map((cat) => cat.value),
        tags,
        images: selectedImages,
        newImages,
        imagesToDelete,
        dimensions,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <LoadingPage />;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 md:p-8 rounded-xl shadow-2xl w-full max-w-5xl max-h-[95vh] overflow-y-auto">
        <FormHeader onCancel={onCancel} />
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6 md:space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {/* Left Column */}
            <div className="space-y-4 sm:space-y-6">
              <NameField register={register} errors={errors} />
              <DescriptionField register={register} errors={errors} />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">التصنيفات</h3>
                <SelectInputSection
                  label="اختر التصنيفات"
                  options={categoryOptions}
                  selectedOptions={selectedCategories}
                  onChange={setSelectedCategories}
                  isMulti={true}
                />
                {selectedCategories.length > MAX_CATEGORIES && (
                  <p className="text-red-500 text-sm">
                    الحد الأقصى للتصنيفات هو {MAX_CATEGORIES}
                  </p>
                )}
              </div>

              <TagInputSection
                label="اختر الكلمات المفتاحية"
                items={tags}
                currentInput={tagInput}
                onInputChange={setTagInput}
                onAddItem={() => {
                  if (tagInput.trim() && !tags.includes(tagInput.trim())) {
                    setTags([...tags, tagInput.trim()]);
                    setTagInput("");
                  }
                }}
                onRemoveItem={(tag) => setTags(tags.filter((t) => t !== tag))}
                placeholder="اكتب الكلمة المفتاحية ثم اضغط إضافة"
                maxLength={50}
              />
              {tags.length > MAX_TAGS && (
                <p className="text-red-500 text-sm">
                  الحد الأقصى للكلمات المفتاحية هو {MAX_TAGS}
                </p>
              )}
            </div>

            {/* Right Column */}
            <div className="space-y-4 sm:space-y-6">
              <PricingSection register={register} errors={errors} />
              <DiscountSection register={register} errors={errors} watchDiscount={watchDiscount} />
            </div>
          </div>

          <DimensionsSection
            dimensions={dimensions}
            addDimension={addDimension}
            updateDimension={updateDimension}
            removeDimension={removeDimension}
          />

          <ImagesSection
            selectedImages={selectedImages}
            handleImageChange={handleImageChange}
            removeImage={removeImage}
          />

          <FormActions isSubmitting={isSubmitting} onCancel={onCancel} />
        </form>
      </div>
    </div>
  );
};

// Sub-components for better organization
const FormHeader = ({ onCancel }: { onCancel: () => void }) => (
  <div className="flex justify-between items-center mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-200 dark:border-gray-700">
    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
      تعديل المنتج
    </h2>
    <button
      type="button"
      onClick={onCancel}
      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
    >
      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
);

const NameField: React.FC<FormFieldProps> = ({ register, errors }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
      اسم المنتج <span className="text-red-500">*</span>
    </label>
    <input
      type="text"
      {...register("name" as Path<FormValues>, {
        required: "هذا الحقل مطلوب",
        maxLength: { value: 120, message: "الحد الأقصى 120 حرف" },
      })}
      className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white transition-colors text-sm sm:text-base"
      placeholder="مثال: قميص رجالي قطني"
    />
    {errors.name && (
      <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600">{errors.name.message}</p>
    )}
  </div>
);

const DescriptionField: React.FC<FormFieldProps> = ({ register, errors }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
      الوصف <span className="text-red-500">*</span>
    </label>
    <textarea
      {...register("description" as Path<FormValues>, {
        required: "هذا الحقل مطلوب",
        maxLength: { value: 2000, message: "الحد الأقصى 2000 حرف" },
      })}
      rows={3}
      className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white transition-colors resize-none text-sm sm:text-base"
      placeholder="وصف تفصيلي للمنتج..."
    />
    {errors.description && (
      <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600">{errors.description.message}</p>
    )}
  </div>
);

const PricingSection: React.FC<FormFieldProps> = ({ register, errors }) => (
  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 sm:p-6 rounded-lg">
    <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
      السعر والمخزون
    </h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
          السعر الأساسي <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <span className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm sm:text-base">
            $
          </span>
          <input
            type="number"
            step="0.01"
            min="0.01"
            {...register("price" as Path<FormValues>, {
              required: "هذا الحقل مطلوب",
              min: { value: 0.01, message: "يجب أن يكون السعر أكبر من 0" },
            })}
            className="w-full pl-6 sm:pl-8 pr-3 sm:pr-4 py-2 sm:py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white text-sm sm:text-base"
          />
        </div>
        {errors.price && (
          <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600">{errors.price.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
          الكمية في المخزن <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          min="0"
          {...register("stock" as Path<FormValues>, {
            required: "هذا الحقل مطلوب",
            min: { value: 0, message: "يجب أن تكون الكمية 0 أو أكثر" },
          })}
          className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white text-sm sm:text-base"
        />
        {errors.stock && (
          <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600">{errors.stock.message}</p>
        )}
      </div>
    </div>
  </div>
);

interface DiscountSectionProps extends FormFieldProps {
  watchDiscount: number;
}

const DiscountSection: React.FC<DiscountSectionProps> = ({ register, errors, watchDiscount }) => (
  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 sm:p-6 rounded-lg">
    <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
      الخصم
    </h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
          نسبة الخصم (%)
        </label>
        <input
          type="number"
          min="0"
          max="100"
          {...register("discount" as Path<FormValues>, {
            min: { value: 0, message: "يجب أن تكون نسبة الخصم 0 أو أكثر" },
            max: { value: 100, message: "يجب أن تكون نسبة الخصم 100 أو أقل" },
          })}
          className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white text-sm sm:text-base"
        />
        {errors.discount && (
          <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600">{errors.discount.message}</p>
        )}
      </div>

      {watchDiscount > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
            تاريخ انتهاء الخصم
          </label>
          <input
            type="date"
            min={new Date().toISOString().split("T")[0]}
            {...register("discountEndDate" as Path<FormValues>)}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white text-sm sm:text-base"
          />
        </div>
      )}
    </div>
  </div>
);

const DimensionsSection: React.FC<DimensionSectionProps> = ({
  dimensions,
  addDimension,
  updateDimension,
  removeDimension,
}) => (
  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 sm:p-6 rounded-lg">
    <div className="flex justify-between items-center mb-3 sm:mb-4">
      <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
        المقاسات والأبعاد
      </h3>
      <button
        type="button"
        onClick={addDimension}
        className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 border border-transparent text-xs sm:text-sm font-medium rounded-lg text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
      >
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:ml-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        إضافة مقاس جديد
      </button>
    </div>

    {dimensions.length === 0 ? (
      <div className="text-center py-6 sm:py-8 text-gray-500 dark:text-gray-400 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-sm sm:text-base">
        لا توجد مقاسات مضافة
      </div>
    ) : (
      <div className="space-y-3 sm:space-y-4">
        {dimensions.map((dimension: Dimension, index: number) => (
          <div
            key={index}
            className="p-4 sm:p-6 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 space-y-3 sm:space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              <DimensionInput
                label="العرض (سم)"
                value={dimension.size.width}
                onChange={(value: string | number) => updateDimension(index, "size.width", Number(value))}
                required
                min="1"
              />

              <DimensionInput
                label="الطول (سم)"
                value={dimension.size.height}
                onChange={(value: string | number) => updateDimension(index, "size.height", Number(value))}
                required
                min="1"
              />

              <DimensionInput
                label="التسمية"
                value={dimension.size.label}
                onChange={(value: string | number) => updateDimension(index, "size.label", String(value))}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                  السعر <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm sm:text-base">
                    $
                  </span>
                  <input
                    type="number"
                    value={dimension.price}
                    onChange={(e) => updateDimension(index, "price", Number(e.target.value))}
                    className="w-full pl-6 sm:pl-8 pr-3 sm:pr-4 py-2 sm:py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white text-sm sm:text-base"
                    min="0.01"
                    step="0.01"
                    required
                  />
                </div>
              </div>

              <DimensionInput
                label="الكمية"
                value={dimension.stock}
                onChange={(value: string | number) => updateDimension(index, "stock", Number(value))}
                required
                min="0"
              />

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={`available-${index}`}
                  checked={dimension.isAvailable ?? true}
                  onChange={(e) => updateDimension(index, "isAvailable", e.target.checked)}
                  className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <label
                  htmlFor={`available-${index}`}
                  className="mr-2 block text-sm text-gray-700 dark:text-gray-300"
                >
                  متاح للبيع
                </label>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => removeDimension(index)}
                className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 border border-transparent text-xs sm:text-sm font-medium rounded-lg text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                حذف المقاس
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

const DimensionInput: React.FC<DimensionInputProps> = ({ label, value, onChange, required, min, type, placeholder, className }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type || (typeof value === 'number' ? 'number' : 'text')}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white text-sm sm:text-base ${className || ''}`}
      required={required}
      min={min}
      placeholder={placeholder}
    />
  </div>
);

const ImagesSection: React.FC<ImagesSectionProps> = ({ selectedImages, handleImageChange, removeImage }) => (
  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 sm:p-6 rounded-lg">
    <div className="flex justify-between items-center mb-3 sm:mb-4">
      <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
        صور المنتج <span className="text-red-500">*</span>
      </h3>
      <label className="cursor-pointer inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 border border-transparent text-xs sm:text-sm font-medium rounded-lg text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors">
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:ml-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        اختر صور
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="sr-only"
        />
      </label>
    </div>

    {selectedImages.length > 0 ? (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4">
        {selectedImages.map((image: ProductImage, index: number) => (
          <div key={index} className="relative group">
            <img
              src={image.url}
              alt={image.altText || `صورة المنتج ${index + 1}`}
              className="w-full h-32 sm:h-40 object-cover rounded-lg shadow-sm"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/placeholder-image.jpg";
              }}
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-red-500 text-white rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
              aria-label="حذف الصورة"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    ) : (
      <div className="text-center py-8 sm:py-12 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 dark:text-gray-400">
        <svg
          className="mx-auto h-8 w-8 sm:h-12 sm:w-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <p className="mt-2 text-xs sm:text-sm">لا توجد صور مضافة</p>
        <p className="mt-1 text-xs text-gray-400">
          يمكنك اختيار أكثر من صورة (الحد الأقصى 5MB لكل صورة)
        </p>
      </div>
    )}
  </div>
);

const FormActions: React.FC<FormActionsProps> = ({ isSubmitting, onCancel }) => (
  <div className="flex justify-end space-x-2 sm:space-x-3 pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-700">
    <button
      type="button"
      onClick={onCancel}
      disabled={isSubmitting}
      className="px-4 sm:px-6 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
    >
      إلغاء
    </button>
    <button
      type="submit"
      disabled={isSubmitting}
      className={`px-4 sm:px-6 py-2 sm:py-3 border border-transparent rounded-lg shadow-sm text-xs sm:text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors ${
        isSubmitting ? "opacity-70 cursor-not-allowed" : ""
      }`}
    >
      {isSubmitting ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5 text-white inline"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          جاري الحفظ...
        </>
      ) : (
        "حفظ التغييرات"
      )}
    </button>
  </div>
);

export default EditProductForm;