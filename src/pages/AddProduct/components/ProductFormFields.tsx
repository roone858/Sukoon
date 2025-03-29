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
    <>
      {/* Name Input */}
      <input
        name="name"
        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
        type="text"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="اسم المنتج"
        required
        maxLength={120}
      />

      {/* Description Input */}
      <textarea
        name="description"
        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
        value={formData.description}
        onChange={handleInputChange}
        placeholder="وصف المنتج"
        required
        maxLength={2000}
        rows={4}
      />

      {/* Price Input */}
      <input
        name="price"
        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
        type="number"
        min="0.01"
        step="0.01"
        value={formData.price}
        onChange={handleInputChange}
        placeholder="سعر المنتج"
        required
      />

      {/* Discount Input */}
      <div className="mt-5">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          الخصم (%) (اختياري)
        </label>
        <input
          name="discount"
          className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
          type="number"
          min="0"
          max="100"
          value={formData.discount}
          onChange={handleInputChange}
          placeholder="نسبة الخصم"
        />
      </div>

      {/* Discount End Date Input */}
      {Number(formData.discount) > 0 && (
        <div className="mt-3">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            تاريخ انتهاء الخصم
          </label>
          <input
            name="discountEndDate"
            type="date"
            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
            value={formData.discountEndDate}
            onChange={handleInputChange}
            min={new Date().toISOString().split("T")[0]}
          />
        </div>
      )}

      {/* Stock Input */}
      <input
        name="stock"
        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
        type="number"
        min="0"
        value={formData.stock}
        onChange={handleInputChange}
        placeholder="الكمية في المخزن"
        required
      />

      {/* Dimensions Input */}
      <div className="mt-5">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          الأبعاد المتاحة
        </label>

        {/* Available dimensions selector */}
        <div className="flex flex-wrap gap-2 mb-4">
          {AVAILABLE_DIMENSIONS.map((dimension) => (
            <button
              key={dimension.value}
              type="button"
              onClick={() => handleDimensionSelection(dimension)}
              className={`px-3 py-1 rounded-full border ${
                formData.dimensions.some(
                  (d) => d.size.label === dimension.label
                )
                  ? "bg-purple-600 text-white border-purple-600"
                  : "bg-gray-100 text-gray-800 border-gray-300"
              }`}
            >
              {dimension.label}
            </button>
          ))}
        </div>

        {/* Selected dimensions with price inputs */}
        {formData.dimensions.length > 0 && (
          <div className="mt-3 space-y-3">
            <p className="text-sm text-gray-600">الأبعاد المحددة:</p>

            {formData.dimensions.map((dimension, index) => (
              <div
                key={dimension.size.label}
                className="flex items-center gap-3 p-2 bg-gray-50 rounded"
              >
                <span className="font-medium min-w-[100px]">
                  {dimension.size.label}
                </span>

                <div className="flex-1">
                  <label className="block text-xs text-gray-500 mb-1">
                    السعر
                  </label>
                  <input
                    type="number"
                    value={dimension.price}
                    onChange={(e) =>
                      handleDimensionPriceChange(index, e.target.value)
                    }
                    className="w-full px-3 py-1 border rounded"
                    min="0"
                    step="0.01"
                  />
                </div>

                <div className="flex-1">
                  <label className="block text-xs text-gray-500 mb-1">
                    الكمية
                  </label>
                  <input
                    type="number"
                    value={dimension.stock || ""}
                    onChange={(e) =>
                      handleDimensionStockChange(index, e.target.value)
                    }
                    className="w-full px-3 py-1 border rounded"
                    min="0"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveDimension(index)}
                  className="text-red-500 hover:text-red-700 p-1"
                  aria-label="إزالة"
                >
                  ×
                </button>
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
        placeholder="أضف فئة جديدة"
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
        placeholder="أضف علامة جديدة"
        maxLength={20}
      />

      {/* Images Input */}
      <div className="mt-5">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          صور المنتج (مطلوب)
        </label>
        <input
          className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
          type="file"
          onChange={handleImageChange}
          accept="image/jpeg, image/png, image/webp"
          multiple
          required
        />
      </div>

      {/* Discount Info */}
      {discountedPrice && (
        <DiscountInfo
          originalPrice={Number(formData.price)}
          discount={Number(formData.discount)}
          discountedPrice={discountedPrice}
          discountEndDate={formData.discountEndDate}
        />
      )}

      {/* Image Previews */}
      {imagePreviews.length > 0 && (
        <ImagePreviewsSection previews={imagePreviews} />
      )}

      {/* Submit Button */}
      <SubmitButton isLoading={isLoading} />
    </>
  );
};

export default ProductFormFields;
