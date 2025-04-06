import React from "react";
import { ProductFormFieldsProps } from "./types";
import { AVAILABLE_DIMENSIONS } from "./constants";
import SubmitButton from "./SubmitButton";
import ImagePreviewsSection from "./ImagePreviewsSection";
import DiscountInfo from "./DiscountInfo";
import TagInputSection from "./TagInputSection";

const ProductFormFields: React.FC<ProductFormFieldsProps> = ({
  formData,
  handleInputChange,
  handleDimensionSelection,
  handleDimensionPriceChange,
  handleDimensionStockChange,
  handleRemoveDimension,
  handleRemoveItem,
  currentCategoryInput,
  setCurrentCategoryInput,
  currentTagInput,
  setCurrentTagInput,
  handleAddItem,
  handleImageChange,
  discountedPrice,
  imagePreviews,
  isLoading,
}) => {
  return (
    <div className="space-y-6">
      {/* Name Input */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          اسم المنتج <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          name="name"
          className="w-full px-4 py-3 rounded-lg font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          type="text"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="مثال: قميص رجالي قطني"
          required
          maxLength={120}
        />
        <div className="text-xs text-gray-500 mt-1 text-left">
          {formData.name.length}/120
        </div>
      </div>

      {/* Description Input */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          وصف المنتج <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          className="w-full px-4 py-3 rounded-lg font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="وصف مفصل للمنتج وخصائصه..."
          required
          maxLength={2000}
          rows={4}
        />
        <div className="text-xs text-gray-500 mt-1 text-left">
          {formData.description.length}/2000
        </div>
      </div>

      {/* Price Input */}
      <div>
        <label
          htmlFor="price"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          السعر الأساسي <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            $
          </span>
          <input
            id="price"
            name="price"
            className="w-full pl-8 pr-4 py-3 rounded-lg font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            type="number"
            min="0.01"
            step="0.01"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="0.00"
            required
          />
        </div>
      </div>

      {/* Discount Section */}
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="relative">
              {" "}
              <label
                htmlFor="discount"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                الخصم
              </label>
              <input
                id="discount"
                name="discount"
                className="w-full pl-8 pr-4 py-3 rounded-lg font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                type="number"
                min="0"
                max="100"
                value={formData.discount}
                onChange={handleInputChange}
                placeholder="0"
              />
              <span className="absolute left-3 top-1/2 transform  text-gray-500">
                %
              </span>
            </div>
          </div>
          {Number(formData.discount) > 0 && (
            <div>
              <label
                htmlFor="discountEndDate"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                تاريخ الانتهاء
              </label>
              <input
                id="discountEndDate"
                name="discountEndDate"
                type="date"
                className="w-full px-4 py-3 rounded-lg font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                value={formData.discountEndDate}
                onChange={handleInputChange}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
          )}
        </div>

        {discountedPrice && formData.discountEndDate  && (
          <div className="mt-3">
            <DiscountInfo
              originalPrice={Number(formData.price)}
              discount={Number(formData.discount)}
              discountedPrice={discountedPrice}
              discountEndDate={formData.discountEndDate}
            />
          </div>
        )}
      </div>

      {/* Stock Input */}
      <div>
        <label
          htmlFor="stock"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          الكمية في المخزن <span className="text-red-500">*</span>
        </label>
        <input
          id="stock"
          name="stock"
          className="w-full px-4 py-3 rounded-lg font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          type="number"
          min="0"
          value={formData.stock}
          onChange={handleInputChange}
          placeholder="عدد القطع المتاحة"
          required
        />
      </div>

      {/* Dimensions Section */}
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          الأبعاد المتاحة
        </label>

        {/* Available dimensions selector */}
        <div className="flex flex-wrap gap-2 mb-4">
          {AVAILABLE_DIMENSIONS.map((dimension) => (
            <button
              key={dimension.value}
              type="button"
              onClick={() => handleDimensionSelection(dimension)}
              className={`px-3 py-1 rounded-full border transition-colors ${
                formData.dimensions &&
                formData.dimensions.some(
                  (d) => d.size.label === dimension.label
                )
                  ? "bg-purple-600 text-white border-purple-600 hover:bg-purple-700"
                  : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {dimension.label}
            </button>
          ))}
        </div>

        {/* Selected dimensions with price inputs */}
        {formData.dimensions && formData.dimensions.length > 0 && (
          <div className="mt-4 space-y-3">
            <h4 className="text-sm font-medium text-gray-700">
              الأبعاد المحددة:
            </h4>

            {formData.dimensions.map((dimension, index) => (
              <div
                key={`${dimension.size.label}-${index}`}
                className="grid grid-cols-12 gap-3 items-center p-3 bg-white rounded border border-gray-200"
              >
                <span className="col-span-2 font-medium text-sm">
                  {dimension.size.label}
                </span>

                <div className="col-span-4">
                  <label className="block text-xs text-gray-500 mb-1">
                    السعر
                  </label>
                  <div className="relative">
                    <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 text-xs">
                      $
                    </span>
                    <input
                      type="number"
                      value={dimension.price}
                      onChange={(e) =>
                        handleDimensionPriceChange(index, e.target.value)
                      }
                      className="w-full pl-6 pr-2 py-1 border rounded text-sm"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>

                <div className="col-span-4">
                  <label className="block text-xs text-gray-500 mb-1">
                    الكمية
                  </label>
                  <input
                    type="number"
                    value={dimension.stock || ""}
                    onChange={(e) =>
                      handleDimensionStockChange(index, e.target.value)
                    }
                    className="w-full px-2 py-1 border rounded text-sm"
                    min="0"
                  />
                </div>

                <div className="col-span-2 flex justify-center">
                  <button
                    type="button"
                    onClick={() => handleRemoveDimension(index)}
                    className="text-red-500 hover:text-red-700 p-1 transition-colors"
                    aria-label="إزالة"
                    title="إزالة"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Categories Input */}
      <TagInputSection
        label="الفئات (مطلوب)"
        items={formData.categories}
        currentInput={currentCategoryInput}
        onInputChange={setCurrentCategoryInput}
        onAddItem={() => handleAddItem("categories")}
        onRemoveItem={handleRemoveItem("categories")}
        placeholder="مثال: ملابس رجالية"
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
        placeholder="مثال: صيفي, جديد"
        maxLength={20}
      />

      {/* Images Input */}
      <div>
        <label
          htmlFor="images"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          صور المنتج <span className="text-red-500">*</span>
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center transition-colors hover:border-purple-500">
          <input
            id="images"
            className="hidden"
            type="file"
            onChange={handleImageChange}
            accept="image/jpeg, image/png, image/webp"
            multiple
            required
          />
          <label
            htmlFor="images"
            className="cursor-pointer flex flex-col items-center justify-center space-y-2"
          >
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-sm text-gray-600">
              <span className="font-medium text-purple-600 hover:text-purple-500">
                انقر لرفع الصور
              </span>{" "}
              أو اسحبها وأفلتها هنا
            </p>
            <p className="text-xs text-gray-500">
              JPEG, PNG, أو WEBP (الحد الأقصى 5MB لكل صورة)
            </p>
          </label>
        </div>
      </div>

      {/* Image Previews */}
      {imagePreviews.length > 0 && (
        <ImagePreviewsSection previews={imagePreviews} />
      )}

      {/* Submit Button */}
      <div className="pt-4">
        <SubmitButton isLoading={isLoading} />
      </div>
    </div>
  );
};

export default ProductFormFields;
