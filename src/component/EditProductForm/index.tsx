import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Product } from "../../util/types";

interface EditProductFormProps {
  product: Product;
  onSave: (data: {
    _id: string;
    name: string;
    description: string;
    category: string;
    price: number;
    images: string[];
    newImages: File[];
  }) => void;
  onCancel: () => void;
}

interface FormInputs {
  name: string;
  description: string;
  category: string;
  price: number;
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
  } = useForm<FormInputs>({
    defaultValues: {
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price,
    },
  });

  const [selectedImages, setSelectedImages] = useState<string[]>(
    product.images || []
  );
  const [newImages, setNewImages] = useState<File[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setNewImages(files);
      const imagesArray = files.map((file) => URL.createObjectURL(file));
      setSelectedImages((prevImages) => [...prevImages, ...imagesArray]);
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    onSave({
      _id: product._id,
      ...data,
      images: selectedImages.filter((selectedImage) =>
        product.images.includes(selectedImage)
      ),
      newImages: newImages,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
          تعديل المنتج
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              اسم المنتج
            </label>
            <input
              type="text"
              {...register("name", { required: "هذا الحقل مطلوب" })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              الوصف
            </label>
            <input
              type="text"
              {...register("description", { required: "هذا الحقل مطلوب" })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              الفئة
            </label>
            <input
              type="text"
              {...register("category", { required: "هذا الحقل مطلوب" })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
            />
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              السعر
            </label>
            <input
              type="number"
              {...register("price", { required: "هذا الحقل مطلوب" })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">
                {errors.price.message}
              </p>
            )}
          </div>
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
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt={`معاينة الصورة ${index + 1}`}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-gray-600"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
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
