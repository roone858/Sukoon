import { DimensionOption } from "../types";

type DimensionInputsProps = {
  selectedDimensions: DimensionOption[];
  dimensionDetails: Record<string, { price: number; stock: number }>;
  onDetailChange: (
    dimensionValue: string,
    field: "price" | "stock",
    value: number
  ) => void;
};

export const DimensionInputs = ({
  selectedDimensions,
  dimensionDetails,
  onDetailChange,
}: DimensionInputsProps) => {
  if (selectedDimensions.length === 0) return null;

  const getFieldError = (dimension: DimensionOption, field: "price" | "stock") => {
    const value = dimensionDetails[dimension.value]?.[field];
    if (value === undefined || value <= 0) {
      return field === "price" ? "السعر مطلوب لهذا المقاس" : "الكمية مطلوبة لهذا المقاس";
    }
    return undefined;
  };

  return (
    <div className="mt-4 space-y-4">
      {selectedDimensions.map((dimension) => (
        <div
          key={dimension.value}
          className="p-4 border border-gray-200 rounded-lg bg-gray-50"
        >
          <h4 className="font-medium text-gray-800 mb-3">{dimension.label}</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-sm text-gray-600">
                السعر لهذا المقاس <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                required
                value={dimensionDetails[dimension.value]?.price || 0}
                onChange={(e) =>
                  onDetailChange(
                    dimension.value,
                    "price",
                    Number(e.target.value)
                  )
                }
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  getFieldError(dimension, "price")
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                min="0"
              />
              {getFieldError(dimension, "price") && (
                <p className="mt-1 text-sm text-red-600">
                  {getFieldError(dimension, "price")}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <label className="block text-sm text-gray-600">
                الكمية المتاحة <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                required
                value={dimensionDetails[dimension.value]?.stock || 0}
                onChange={(e) =>
                  onDetailChange(
                    dimension.value,
                    "stock",
                    Number(e.target.value)
                  )
                }
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  getFieldError(dimension, "stock")
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                min="0"
              />
              {getFieldError(dimension, "stock") && (
                <p className="mt-1 text-sm text-red-600">
                  {getFieldError(dimension, "stock")}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
