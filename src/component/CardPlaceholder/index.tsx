import React from 'react';

type ProductCardPlaceholderProps = {
  count?: number;
  className?: string;
};

const ProductCardPlaceholder: React.FC<ProductCardPlaceholderProps> = ({
  count = 1,
  className = '',
}) => {
  // Create an array of the specified count
  const placeholders = Array.from({ length: count }, (_, i) => i);

  return (
    <>
      {placeholders.map((_, index) => (
        <div
          key={index}
          className={`bg-white rounded-lg overflow-hidden shadow-sm animate-pulse ${className}`}
        >
          <div className="bg-gray-200 h-38 w-full"></div>
          <div className="p-4">
            <div className="bg-gray-200 h-4 w-3/4 mb-2 rounded"></div>
            <div className="bg-gray-200 h-4 w-1/2 mb-4 rounded"></div>
            <div className="flex justify-between items-center">
              <div className="bg-gray-200 h-6 w-1/3 rounded"></div>
              <div className="bg-gray-200 h-8 w-8 rounded-full"></div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductCardPlaceholder;