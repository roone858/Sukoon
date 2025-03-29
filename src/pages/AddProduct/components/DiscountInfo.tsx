import React from "react";
import { DiscountInfoProps } from "./types";

const DiscountInfo: React.FC<DiscountInfoProps> = ({
  originalPrice,
  discount,
  discountedPrice,
  discountEndDate,
}) => (
  <div className="mt-3 p-3 bg-blue-50 rounded-lg">
    <p className="text-blue-800 font-medium">
      السعر بعد الخصم:{" "}
      <span className="font-bold">{discountedPrice.toFixed(2)} ر.س</span>
    </p>
    <p className="text-sm text-blue-600 mt-1">
      (السعر الأصلي: {originalPrice.toFixed(2)} ر.س - خصم: {discount}%)
    </p>
    {discountEndDate && (
      <p className="text-sm text-blue-600 mt-1">
        صالح حتى: {new Date(discountEndDate).toLocaleDateString("ar-EG")}
      </p>
    )}
  </div>
);

export default DiscountInfo;