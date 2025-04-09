import { useForm } from "react-hook-form";
import { useState } from "react";

import {
  ProductFormValues,
  DIMENSION_OPTIONS,
  DimensionOption,
  CategoryOption,
} from "./types";
import { FormInput } from "./components/FormInput";
import { FormTextarea } from "./components/FormTextarea";
import { FormSelect } from "./components/FormSelect";
import type { Option } from "./components/FormSelect";
import { DimensionInputs } from "./components/DimensionInputs";
import { FormTagsInput } from "./components/FormTagsInput";
import { FormImageUpload } from "./components/FormImageUpload";
import { useStoreContext } from "../../context/hooks/useStoreContext";

type ProductFormProps = {
  onSubmit: (data: ProductFormValues) => void;
  isSubmitting?: boolean;
};

export const ProductForm = ({
  onSubmit,
  isSubmitting = false,
}: ProductFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    trigger,
    formState: { errors },
  } = useForm<ProductFormValues>({
    defaultValues: {
      name: "",
      description: "",
      images: [],
    },
    mode: "onChange",
  });

  const [dimensionDetails, setDimensionDetails] = useState<
    Record<string, { price: number; stock: number }>
  >({});
  const [tagInput, setTagInput] = useState("");
  const { categories } = useStoreContext();
  const [selectedCategories, setSelectedCategories] = useState<CategoryOption[]>([]);
  const [selectedDimensions, setSelectedDimensions] = useState<DimensionOption[]>([]);

  const CATEGORY_OPTIONS = categories.map((cat) => ({
    value: cat._id,
    label: cat.name,
  }));

  const handleDimensionChange = async (
    value: Option | readonly Option[] | null
  ) => {
    if (!value || !Array.isArray(value)) return;

    const dimensionOptions = value.filter(
      (opt): opt is DimensionOption => "width" in opt && "height" in opt
    );

    setSelectedDimensions([...dimensionOptions]);

    const details = dimensionOptions.map((option) => ({
      size: {
        width: option.width,
        height: option.height,
        label: option.label,
      },
      price: dimensionDetails[option.value]?.price || 0,
      stock: dimensionDetails[option.value]?.stock || 0,
      isAvailable: true,
    }));

    setValue("dimensions", details);
    await trigger("dimensions");
  };

  const handleCategoryChange = async (
    value: Option | readonly Option[] | null
  ) => {
    if (!value || !Array.isArray(value)) return;

    const categoryOptions = value.filter(
      (opt): opt is CategoryOption => !("width" in opt) && !("height" in opt)
    );

    setSelectedCategories([...categoryOptions]);
    setValue(
      "categories",
      categoryOptions.map((opt) => opt.value),
      {
        shouldValidate: true,
        shouldDirty: true,
      }
    );
    if (categoryOptions.length === 0) {
      setValue("categories", [], {
        shouldValidate: true,
      });
    }
  };

  const handleDimensionDetailChange = async (
    dimensionValue: string,
    field: "price" | "stock",
    value: number
  ) => {
    const newDetails = {
      ...dimensionDetails,
      [dimensionValue]: {
        ...(dimensionDetails[dimensionValue] || { price: 0, stock: 0 }),
        [field]: value,
      },
    };

    setDimensionDetails(newDetails);

    const updatedDimensions = selectedDimensions.map((option) => ({
      size: {
        width: option.width,
        height: option.height,
        label: option.label,
      },
      price: newDetails[option.value]?.price || 0,
      stock: newDetails[option.value]?.stock || 0,
      isAvailable: true,
    }));

    setValue("dimensions", updatedDimensions);
    await trigger("dimensions");
  };

  const validateForm = async (data: ProductFormValues) => {
    // Validate dimensions if any are selected
    if (selectedDimensions.length > 0) {
      const hasInvalidDimensions = selectedDimensions.some(
        (dim) =>
          !dimensionDetails[dim.value]?.price ||
          !dimensionDetails[dim.value]?.stock
      );
      if (hasInvalidDimensions) {
        return false;
      }
    }

    // Validate categories
    if (selectedCategories.length === 0) {
      return false;
    }

    // Validate discount and discount end date
    if (data.discount && data.discount > 0 && !data.discountEndDate) {
      return false;
    }

    return true;
  };

  const onSubmitForm = async (data: ProductFormValues) => {
    const isValid = await validateForm(data);
    if (!isValid) {
      return;
    }
    onSubmit(data);
    reset();
  };

  const currentDiscount = watch("discount") || 0;

  return (
    <form
      onSubmit={handleSubmit(onSubmitForm)}
      className="space-y-6 max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl"
    >
      {/* Basic Information */}
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900">المعلومات الأساسية</h3>

        <FormInput
          label="اسم المنتج"
          register={register("name", {
            required: "اسم المنتج مطلوب",
            minLength: {
              value: 3,
              message: "يجب أن يكون اسم المنتج 3 أحرف على الأقل",
            },
          })}
          error={errors.name}
          required
        />

        <FormTextarea
          label="الوصف"
          register={register("description", {
            required: "وصف المنتج مطلوب",
            minLength: {
              value: 10,
              message: "يجب أن يكون الوصف 10 أحرف على الأقل",
            },
          })}
          error={errors.description}
          required
        />
      </div>

      {/* Pricing */}
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900">التسعير والمخزون</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            label="السعر الأساسي (ر.س)"
            type="number"
            register={register("price", {
              required: "السعر مطلوب",
              min: {
                value: 0,
                message: "يجب أن يكون السعر أكبر من 0",
              },
            })}
            error={errors.price}
            required
          />

          <FormInput
            label="الخصم (%)"
            type="number"
            register={register("discount", {
              min: {
                value: 0,
                message: "يجب أن يكون الخصم أكبر من أو يساوي 0",
              },
              max: {
                value: 100,
                message: "يجب أن يكون الخصم أقل من أو يساوي 100",
              },
            })}
            error={errors.discount}
          />
        </div>

        {currentDiscount > 0 && (
          <FormInput
            label="تاريخ انتهاء الخصم"
            type="date"
            register={register("discountEndDate", {
              required: "تاريخ انتهاء الخصم مطلوب",
              validate: (value: string | undefined) => {
                if (!value) return "تاريخ انتهاء الخصم مطلوب";
                const selectedDate = new Date(value);
                const today = new Date();
                return (
                  selectedDate > today ||
                  "يجب أن يكون تاريخ انتهاء الخصم في المستقبل"
                );
              },
            })}
            error={errors.discountEndDate}
            required={currentDiscount > 0}
          />
        )}

        <FormInput
          label="المخزون الأساسي"
          type="number"
          register={register("stock", {
            required: "المخزون مطلوب",
            min: {
              value: 0,
              message: "يجب أن يكون المخزون أكبر من أو يساوي 0",
            },
          })}
          error={errors.stock}
          required
        />
      </div>

      {/* Dimensions */}
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900">المقاسات</h3>

        <FormSelect
          label="المقاسات المتاحة"
          value={selectedDimensions}
          onChange={handleDimensionChange}
          options={DIMENSION_OPTIONS}
          isMulti
          isSearchable={false}
        />

        <DimensionInputs
          selectedDimensions={selectedDimensions}
          dimensionDetails={dimensionDetails}
          onDetailChange={handleDimensionDetailChange}
        />
      </div>

      {/* Categories */}
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900">التصنيفات</h3>

        <FormSelect
          label="التصنيفات"
          value={selectedCategories}
          onChange={handleCategoryChange}
          options={CATEGORY_OPTIONS}
          isMulti
          error={
            selectedCategories.length === 0 && selectedCategories != undefined
              ? "التصنيفات مطلوبة"
              : undefined
          }
          required
        />
      </div>

      {/* Tags */}
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900">الكلمات المفتاحية</h3>

        <FormTagsInput
          tags={watch("tags") || []}
          setTags={(tags) => setValue("tags", tags)}
          tagInput={tagInput}
          setTagInput={setTagInput}
          error={errors.tags?.message}
        />
      </div>

      {/* Images */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">صور المنتج</h3>
        <FormImageUpload
          register={register}
          watch={watch}
          setValue={setValue}
          error={errors.images?.message}
        />
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
              جاري الإرسال...
            </>
          ) : (
            "إضافة المنتج"
          )}
        </button>
      </div>
    </form>
  );
};
