import React, { useState, useEffect, useCallback } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Product } from "../../util/types";
import { Dimension } from "../../pages/AddProduct/components/types";
import TagInputSection from "../../pages/AddProduct/components/TagInputSection";
import {
  MAX_CATEGORIES,
  MAX_TAGS,
} from "../../pages/AddProduct/components/constants";

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
  const [categories, setCategories] = useState<string[]>(
    product.categories || []
  );
  const [tags, setTags] = useState<string[]>(product.tags || []);
  const [currentCategoryInput, setCurrentCategoryInput] = useState<string>("");
  const [currentTagInput, setCurrentTagInput] = useState<string>("");
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
    setCategories(product.categories || []);
    setTags(product.tags || []);
  }, [product, reset]);

  const addDimension = useCallback(() => {
    const newDimension: Dimension = {
      _id: "",
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

  const handleRemoveItem = useCallback(
    (type: "categories" | "tags") => (itemToRemove: string) => {
      if (type === "categories") {
        setCategories((prev) => prev.filter((item) => item !== itemToRemove));
      } else {
        setTags((prev) => prev.filter((item) => item !== itemToRemove));
      }
    },
    []
  );

  const handleAddItem = useCallback(
    (type: "categories" | "tags") => {
      const currentInput =
        type === "categories" ? currentCategoryInput : currentTagInput;
      const currentItems = type === "categories" ? categories : tags;
      const maxItems = type === "categories" ? MAX_CATEGORIES : MAX_TAGS;

      if (!currentInput || currentItems.includes(currentInput)) return;

      if (currentItems.length >= maxItems) {
        alert(
          `يمكنك إضافة ${maxItems} ${
            type === "categories" ? "فئات" : "علامات"
          } كحد أقصى`
        );
        return;
      }

      if (type === "categories") {
        setCategories((prev) => [...prev, currentInput]);
        setCurrentCategoryInput("");
      } else {
        setTags((prev) => [...prev, currentInput]);
        setCurrentTagInput("");
      }
    },
    [currentCategoryInput, currentTagInput, categories, tags]
  );

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
          categories,
          tags,
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
    [
      product.id,
      selectedImages,
      newImages,
      imagesToDelete,
      dimensions,
      categories,
      tags,
      onSave,
    ]
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
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 md:p-8 rounded-xl shadow-2xl w-full max-w-5xl max-h-[95vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            تعديل المنتج
          </h2>
          <button
            type="button"
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
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

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 sm:space-y-6 md:space-y-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {/* Left Column */}
            <div className="space-y-4 sm:space-y-6">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                  اسم المنتج <span className="text-red-500">*</span>
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
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white transition-colors text-sm sm:text-base"
                  placeholder="مثال: قميص رجالي قطني"
                />
                {errors.name && (
                  <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Description Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                  الوصف <span className="text-red-500">*</span>
                </label>
                <textarea
                  {...register("description", {
                    required: "هذا الحقل مطلوب",
                    maxLength: {
                      value: 2000,
                      message: "الحد الأقصى 2000 حرف",
                    },
                  })}
                  rows={3}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white transition-colors resize-none text-sm sm:text-base"
                  placeholder="وصف تفصيلي للمنتج..."
                />
                {errors.description && (
                  <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Categories Field */}
              <div className="bg-gray-50 dark:bg-gray-700/50 p-3 sm:p-4 rounded-lg">
                <TagInputSection
                  label="الفئات (مطلوب)"
                  items={categories}
                  currentInput={currentCategoryInput}
                  onInputChange={setCurrentCategoryInput}
                  onAddItem={() => handleAddItem("categories")}
                  onRemoveItem={handleRemoveItem("categories")}
                  placeholder="مثال: ملابس رجالية"
                  maxLength={30}
                />
              </div>

              {/* Tags Field */}
              <div className="bg-gray-50 dark:bg-gray-700/50 p-3 sm:p-4 rounded-lg">
                <TagInputSection
                  label="العلامات (اختياري)"
                  items={tags}
                  currentInput={currentTagInput}
                  onInputChange={setCurrentTagInput}
                  onAddItem={() => handleAddItem("tags")}
                  onRemoveItem={handleRemoveItem("tags")}
                  placeholder="مثال: صيفي, جديد"
                  maxLength={20}
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4 sm:space-y-6">
              {/* Pricing and Inventory */}
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
                        {...register("price", {
                          required: "هذا الحقل مطلوب",
                          min: {
                            value: 0.01,
                            message: "يجب أن يكون السعر أكبر من 0",
                          },
                        })}
                        className="w-full pl-6 sm:pl-8 pr-3 sm:pr-4 py-2 sm:py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white text-sm sm:text-base"
                      />
                    </div>
                    {errors.price && (
                      <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600">
                        {errors.price.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                      الكمية في المخزن <span className="text-red-500">*</span>
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
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white text-sm sm:text-base"
                    />
                    {errors.stock && (
                      <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600">
                        {errors.stock.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Discount Fields */}
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
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white text-sm sm:text-base"
                    />
                    {errors.discount && (
                      <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600">
                        {errors.discount.message}
                      </p>
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
                        {...register("discountEndDate")}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white text-sm sm:text-base"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Dimensions Section */}
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
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
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
                {dimensions.map((dimension, index) => (
                  <div
                    key={index}
                    className="p-4 sm:p-6 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 space-y-3 sm:space-y-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                          العرض (سم) <span className="text-red-500">*</span>
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
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white text-sm sm:text-base"
                          min="1"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                          الطول (سم) <span className="text-red-500">*</span>
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
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white text-sm sm:text-base"
                          min="1"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                          التسمية
                        </label>
                        <input
                          type="text"
                          value={dimension.size.label}
                          onChange={(e) =>
                            updateDimension(index, "size.label", e.target.value)
                          }
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white text-sm sm:text-base"
                          required
                        />
                      </div>
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
                            onChange={(e) =>
                              updateDimension(
                                index,
                                "price",
                                Number(e.target.value)
                              )
                            }
                            className="w-full pl-6 sm:pl-8 pr-3 sm:pr-4 py-2 sm:py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white text-sm sm:text-base"
                            min="0.01"
                            step="0.01"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                          الكمية <span className="text-red-500">*</span>
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
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white text-sm sm:text-base"
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

          {/* Images Section */}
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
                {selectedImages.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image.url}
                      alt={image.altText || `صورة المنتج ${index + 1}`}
                      className="w-full h-32 sm:h-40 object-cover rounded-lg shadow-sm"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder-image.jpg";
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
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
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

          {/* Form Actions */}
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
        </form>
      </div>
    </div>
  );
};

export default EditProductForm;
