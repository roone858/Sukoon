import React, { useState, useEffect, useCallback } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Product } from "../../util/types";
import { Dimension } from "../../pages/AddProduct/components/types";

interface EditProductFormProps {
  product: Product;
  onSave: (data: {
    _id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    discount?: number;
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
  categories: string;
  tags: string;
}

const EditProductForm: React.FC<EditProductFormProps> = ({
  product,
  onSave,
  onCancel,
}) => {
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
      discountEndDate:
        (product.discountEndDate instanceof Date
          ? product.discountEndDate.toISOString()
          : product.discountEndDate) || undefined,
      categories: product.categories?.join(", ") || "",
      tags: product.tags?.join(", ") || "",
    },
  });

  const [selectedImages, setSelectedImages] = useState<
    { public_id?: string; url: string; altText?: string }[]
  >(product.images || []);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);
  const [dimensions, setDimensions] = useState<Dimension[]>(
    product.dimensions || []
  );
  const watchDiscount = watch("discount", product.discount || 0);

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
      categories: product.categories?.join(", ") || "",
      tags: product.tags?.join(", ") || "",
    });
    setSelectedImages(product.images || []);
    setNewImages([]);
    setImagesToDelete([]);
    setDimensions(product.dimensions || []);
  }, [product, reset]);

  const addDimension = useCallback(() => {
    const newDimension: Dimension = {
      size: {
        width: 200,
        height: 200,
        label: "200×200 سم",
      },
      price: product.price,
      stock: product.stock || 0,
      isAvailable: true,
    };
    setDimensions((prev) => [...prev, newDimension]);
  }, [product.price, product.stock]);

  const updateDimension = useCallback(
    (
      index: number,
      field: Exclude<
        keyof Dimension | `size.${Exclude<keyof Dimension["size"], symbol>}`,
        symbol
      >,
      value: string | number | bigint | boolean | null | undefined
    ) => {
      setDimensions((prev) => {
        const updated = [...prev];
        if ((field as string).startsWith("size.")) {
          const sizeField = (field as string).split(
            "."
          )[1] as keyof Dimension["size"];
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
                      sizeField === "height"
                        ? value
                        : updated[index].size.height
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
      setDimensions((prev) => {
        const updated = [...prev];
        updated.splice(index, 1);
        return updated;
      });
    }
  }, []);

  const handleImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      if (files.length > 0) {
        const validFiles = files.filter(
          (file) =>
            file.type.startsWith("image/") && file.size <= 5 * 1024 * 1024
        );

        if (validFiles.length !== files.length) {
          alert(
            "تم تجاهل بعض الملفات غير الصالحة أو كبيرة الحجم (الحد الأقصى 5MB)"
          );
        }

        setNewImages((prev) => [...prev, ...validFiles]);
        const newPreviews = validFiles.map((file) => ({
          url: URL.createObjectURL(file),
          altText: file.name,
        }));
        setSelectedImages((prev) => [...prev, ...newPreviews]);
      }
    },
    []
  );

  const removeImage = useCallback((index: number) => {
    setSelectedImages((prev) => {
      const imageToRemove = prev[index];
      if (imageToRemove.public_id) {
        setImagesToDelete((current) => [...current, imageToRemove.public_id!]);
      } else {
        URL.revokeObjectURL(imageToRemove.url);
        setNewImages((current) =>
          current.filter(
            (file) => URL.createObjectURL(file) !== imageToRemove.url
          )
        );
      }
      return prev.filter((_, i) => i !== index);
    });
  }, []);

  const onSubmit: SubmitHandler<FormValues> = useCallback(
    async (data) => {
      try {
        // Validate at least one image exists
        if (selectedImages.length === 0) {
          alert("يجب إضافة صورة واحدة على الأقل");
          return;
        }

        // Validate dimensions
        if (dimensions.length > 0) {
          const invalidDimension = dimensions.some(
            (dim) =>
              !dim.size.width ||
              !dim.size.height ||
              dim.price <= 0 ||
              dim.stock < 0
          );

          if (invalidDimension) {
            alert("يجب تعبئة جميع حقول المقاسات بشكل صحيح");
            return;
          }
        }

        const formData = {
          _id: product.id,
          name: data.name,
          description: data.description,
          price: Number(data.price),
          stock: Number(data.stock),
          ...(data.discount > 0 && {
            discount: Number(data.discount),
            discountEndDate: data.discountEndDate,
          }),
          ...(data.categories && {
            categories: data.categories.split(",").map((c) => c.trim()),
          }),
          ...(data.tags && {
            tags: data.tags.split(",").map((t) => t.trim()),
          }),
          images: selectedImages
            .filter((img) => img.public_id)
            .map(({ public_id, url, altText }) => ({
              public_id,
              url,
              altText,
            })),
          ...(newImages.length > 0 && { newImages }),
          ...(imagesToDelete.length > 0 && { imagesToDelete }),
          ...(dimensions.length > 0 && { dimensions }),
        };

        await onSave(formData);
      } catch (error) {
        console.error("Error saving product:", error);
        alert("حدث خطأ أثناء حفظ المنتج");
      }
    },
    [product.id, selectedImages, newImages, imagesToDelete, dimensions, onSave]
  );

  useEffect(() => {
    return () => {
      selectedImages.forEach((image) => {
        if (image.url && !image.public_id) {
          URL.revokeObjectURL(image.url);
        }
      });
    };
  }, [selectedImages]);

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
          تعديل المنتج
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  اسم المنتج*
                </label>
                <input
                  type="text"
                  {...register("name", {
                    required: "هذا الحقل مطلوب",
                    maxLength: {
                      value: 120,
                      message: "الحد الأقصى 120 حرف",
                    },
                  })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Description Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  الوصف*
                </label>
                <textarea
                  {...register("description", {
                    required: "هذا الحقل مطلوب",
                    maxLength: {
                      value: 2000,
                      message: "الحد الأقصى 2000 حرف",
                    },
                  })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Categories Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  الفئات (افصل بينهم بفاصلة)
                </label>
                <input
                  type="text"
                  {...register("categories")}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Tags Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  العلامات (افصل بينهم بفاصلة)
                </label>
                <input
                  type="text"
                  {...register("tags")}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {/* Pricing and Inventory */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    السعر الأساسي*
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0.01"
                    {...register("price", {
                      required: "هذا الحقل مطلوب",
                      min: {
                        value: 0.01,
                        message: "يجب أن يكون السعر أكبر من 0",
                      },
                    })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  />
                  {errors.price && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.price.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    الكمية في المخزن*
                  </label>
                  <input
                    type="number"
                    min="0"
                    {...register("stock", {
                      required: "هذا الحقل مطلوب",
                      min: {
                        value: 0,
                        message: "يجب أن تكون الكمية 0 أو أكثر",
                      },
                    })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  />
                  {errors.stock && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.stock.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Discount Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    الخصم (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    {...register("discount", {
                      min: {
                        value: 0,
                        message: "يجب أن تكون نسبة الخصم 0 أو أكثر",
                      },
                      max: {
                        value: 100,
                        message: "يجب أن تكون نسبة الخصم 100 أو أقل",
                      },
                    })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  />
                  {errors.discount && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.discount.message}
                    </p>
                  )}
                </div>

                {watchDiscount > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      تاريخ انتهاء الخصم
                    </label>
                    <input
                      type="date"
                      min={new Date().toISOString().split("T")[0]}
                      {...register("discountEndDate")}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Dimensions Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                المقاسات والأبعاد
              </h3>
              <button
                type="button"
                onClick={addDimension}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                + إضافة مقاس جديد
              </button>
            </div>

            {dimensions.length === 0 ? (
              <div className="text-center py-4 text-gray-500 dark:text-gray-400 border-2 border-dashed rounded-lg">
                لا توجد مقاسات مضافة
              </div>
            ) : (
              <div className="space-y-4">
                {dimensions.map((dimension, index) => (
                  <div
                    key={index}
                    className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-700 space-y-3"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          العرض (سم)*
                        </label>
                        <input
                          type="number"
                          value={dimension.size.width}
                          onChange={(e) =>
                            updateDimension(
                              index,
                              "size.width",
                              Number(e.target.value)
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                          min="1"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          الطول (سم)*
                        </label>
                        <input
                          type="number"
                          value={dimension.size.height}
                          onChange={(e) =>
                            updateDimension(
                              index,
                              "size.height",
                              Number(e.target.value)
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                          min="1"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          التسمية
                        </label>
                        <input
                          type="text"
                          value={dimension.size.label}
                          onChange={(e) =>
                            updateDimension(index, "size.label", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          السعر*
                        </label>
                        <input
                          type="number"
                          value={dimension.price}
                          onChange={(e) =>
                            updateDimension(
                              index,
                              "price",
                              Number(e.target.value)
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                          min="0.01"
                          step="0.01"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          الكمية*
                        </label>
                        <input
                          type="number"
                          value={dimension.stock}
                          onChange={(e) =>
                            updateDimension(
                              index,
                              "stock",
                              Number(e.target.value)
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                          min="0"
                          required
                        />
                      </div>

                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id={`available-${index}`}
                          checked={dimension.isAvailable ?? true}
                          onChange={(e) =>
                            updateDimension(
                              index,
                              "isAvailable",
                              e.target.checked
                            )
                          }
                          className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor={`available-${index}`}
                          className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                        >
                          متاح للبيع
                        </label>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => removeDimension(index)}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        حذف المقاس
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Images Section */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                صور المنتج*
              </label>
              <div className="flex items-center">
                <label className="cursor-pointer bg-white dark:bg-gray-700 py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                  اختر صور
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="sr-only"
                  />
                </label>
                <span className="ml-3 text-sm text-gray-500 dark:text-gray-400">
                  يمكنك اختيار أكثر من صورة (الحد الأقصى 5MB لكل صورة)
                </span>
              </div>
            </div>

            {selectedImages.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {selectedImages.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image.url}
                      alt={image.altText || `صورة المنتج ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder-image.jpg";
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="حذف الصورة"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 border-2 border-dashed rounded-lg text-gray-500 dark:text-gray-400">
                لا توجد صور مضافة
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline"
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
        </form>
      </div>
    </div>
  );
};

export default EditProductForm;
