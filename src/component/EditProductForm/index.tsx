import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Product } from "../../util/types";

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
  }) => void;
  onCancel: () => void;
}

const EditProductForm: React.FC<EditProductFormProps> = ({
  product,
  onSave,
  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      discount: product.discount || 0,
      discountEndDate: product.discountEndDate || "",
      categories: product.categories?.join(", ") || "",
      tags: product.tags?.join(", ") || "",
    },
  });

  const [selectedImages, setSelectedImages] = useState<
    { public_id?: string; url: string; altText?: string }[]
  >(product.images || []);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);
  const watchDiscount = watch("discount", product.discount || 0);

  useEffect(() => {
    reset({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      discount: product.discount || 0,
      discountEndDate: product.discountEndDate || "",
      categories: product.categories?.join(", ") || "",
      tags: product.tags?.join(", ") || "",
    });
    setSelectedImages(product.images || []);
    setNewImages([]);
    setImagesToDelete([]);
  }, [product, reset]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setNewImages((prev) => [...prev, ...files]);
      const newPreviews = files.map((file) => ({
        url: URL.createObjectURL(file),
        altText: file.name,
      }));
      setSelectedImages((prev) => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    const imageToRemove = selectedImages[index];
    if (imageToRemove.public_id) {
      setImagesToDelete((prev) => [...prev, imageToRemove.public_id!]);
    } else {
      const urlToRemove = imageToRemove.url;
      setNewImages((prev) =>
        prev.filter((file) => URL.createObjectURL(file) !== urlToRemove)
      );
      URL.revokeObjectURL(urlToRemove);
    }
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit: SubmitHandler<any> = (data) => {
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
        categories: data.categories.split(",").map((c: string) => c.trim()),
      }),
      ...(data.tags && {
        tags: data.tags.split(",").map((t: string) => t.trim()),
      }),
      images: selectedImages
        .filter((img) => img.public_id)
        .map(({ public_id, url, altText }) => ({ public_id, url, altText })),
      ...(newImages.length > 0 && { newImages }),
      ...(imagesToDelete.length > 0 && { imagesToDelete }),
    };

    onSave(formData);
  };

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
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
          تعديل المنتج
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              اسم المنتج
            </label>
            <input
              type="text"
              {...register("name", { 
                required: "هذا الحقل مطلوب",
                maxLength: {
                  value: 120,
                  message: "الحد الأقصى 120 حرف"
                }
              })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Description Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              الوصف
            </label>
            <textarea
              {...register("description", { 
                required: "هذا الحقل مطلوب",
                maxLength: {
                  value: 2000,
                  message: "الحد الأقصى 2000 حرف"
                }
              })}
              rows={4}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Price Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              السعر
            </label>
            <input
              type="number"
              step="0.01"
              min="0.01"
              {...register("price", { 
                required: "هذا الحقل مطلوب",
                min: {
                  value: 0.01,
                  message: "يجب أن يكون السعر أكبر من 0"
                }
              })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">
                {errors.price.message}
              </p>
            )}
          </div>

          {/* Stock Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              الكمية في المخزن
            </label>
            <input
              type="number"
              min="0"
              {...register("stock", { 
                required: "هذا الحقل مطلوب",
                min: {
                  value: 0,
                  message: "يجب أن تكون الكمية 0 أو أكثر"
                }
              })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
            />
            {errors.stock && (
              <p className="text-red-500 text-sm mt-1">
                {errors.stock.message}
              </p>
            )}
          </div>

          {/* Discount Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              الخصم (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              {...register("discount", { 
                min: {
                  value: 0,
                  message: "يجب أن تكون نسبة الخصم 0 أو أكثر"
                },
                max: {
                  value: 100,
                  message: "يجب أن تكون نسبة الخصم 100 أو أقل"
                }
              })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
            />
            {errors.discount && (
              <p className="text-red-500 text-sm mt-1">
                {errors.discount.message}
              </p>
            )}
          </div>

          {/* Discount End Date Field */}
          {watchDiscount > 0 && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                تاريخ انتهاء الخصم
              </label>
              <input
                type="date"
                min={new Date().toISOString().split('T')[0]}
                {...register("discountEndDate")}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          )}

          {/* Categories Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              الفئات (افصل بينهم بفاصلة)
            </label>
            <input
              type="text"
              {...register("categories")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Tags Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              العلامات (افصل بينهم بفاصلة)
            </label>
            <input
              type="text"
              {...register("tags")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Images Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              صور المنتج
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
            />
            <div className="mt-4 flex flex-wrap gap-2">
              {selectedImages.map((image, index) => (
                <div
                  key={index}
                  className="relative shadow border p-2 border-gray-50"
                >
                  <img
                    src={image.url}
                    alt={image.altText || `معاينة الصورة ${index + 1}`}
                    className="w-24 h-24 object-cover rounded-lg"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder-image.jpg';
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 cursor-pointer bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-l"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-500 cursor-pointer text-white px-4 py-2 rounded-md mr-2 hover:bg-gray-600"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="cursor-pointer text-sm font-semibold bg-purple-800 text-gray-100 px-4 py-2 rounded-lg hover:bg-purple-900 active:bg-purple-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
            >
              حفظ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductForm;