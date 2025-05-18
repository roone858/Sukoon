import { useMemo } from "react";
import { UseFormRegister, UseFormWatch, UseFormSetValue } from "react-hook-form";
import { ProductFormValues } from "../types";

type FormImageUploadProps = {
  register: UseFormRegister<ProductFormValues>;
  watch: UseFormWatch<ProductFormValues>;
  setValue: UseFormSetValue<ProductFormValues>;
  error?: string;
};

export const FormImageUpload = ({
  register,
  watch,
  setValue,
  error,
}: FormImageUploadProps) => {
  const watchedImages = watch("images") as File[];

  const imagePreviews = useMemo(() => {
    if (watchedImages && watchedImages.length > 0) {
      return watchedImages.map(file => URL.createObjectURL(file));
    }
    return [];
  }, [watchedImages]);

  const removeImage = (index: number) => {
    if (watchedImages) {
      const newImages = [...watchedImages];
      newImages.splice(index, 1);
      setValue("images", newImages);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        صور المنتج <span className="text-red-500">*</span>
      </label>
      <div
        className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      >
        {imagePreviews.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {imagePreviews.map((preview, index) => (
              <div key={`new-${index}`} className="relative group">
                <img
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="h-32 w-full object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Remove image"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
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
            ))}
          </div>
        ) : (
          <div className="space-y-1 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex text-sm text-gray-600 justify-center">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus-within:outline-none"
              >
                <span>رفع ملف</span>
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  accept="image/*"
                  {...register("images", {
                    required: "صور المنتج مطلوبة",
                    validate: {
                      maxFiles: (files: File[]) =>
                        !files || files.length <= 10 || "الحد الأقصى 10 صور",
                      maxSize: (files: File[]) => {
                        if (files) {
                          for (let i = 0; i < files.length; i++) {
                            if (files[i].size > 10 * 1024 * 1024) {
                              return "الحد الأقصى لحجم الصورة 10MB";
                            }
                          }
                        }
                        return true;
                      },
                    },
                  })}
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    setValue("images", files);
                  }}
                  className="sr-only"
                />
              </label>
              <p className="pl-1">أو اسحب الملفات هنا</p>
            </div>
            <p className="text-xs text-gray-500">
              PNG, JPG, GIF بحد أقصى 10MB (10 صور كحد أقصى)
            </p>
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};
