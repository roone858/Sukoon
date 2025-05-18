import React from "react";
import { ImagePreviewsSectionProps } from "./types";

const ImagePreviewsSection: React.FC<ImagePreviewsSectionProps> = ({
  previews,
}) => (
  <div className="mt-5">
    <h3 className="text-sm font-medium text-gray-700 mb-2">معاينة الصور:</h3>
    <div className="flex flex-wrap gap-2">
      {previews.map((preview, index) => (
        <div key={index} className="relative">
          <img
            src={preview.url}
            alt={`معاينة الصورة ${index + 1}`}
            className="w-24 h-24 object-cover rounded-lg border"
          />
          <span className="absolute top-0 right-0 bg-black bg-opacity-50 text-white text-xs px-1 rounded">
            {preview.name}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default ImagePreviewsSection;