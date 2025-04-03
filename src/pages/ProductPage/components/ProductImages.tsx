import { useState } from 'react';
import { ProductImagesProps } from '../types';
import { IMAGE_SIZES } from '../constants';

const ProductImages: React.FC<ProductImagesProps> = ({ images, title }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnails */}
      <div className="flex  md:flex-col gap-2 overflow-x-auto md:overflow-y-auto">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`bg-white  relative flex-shrink-0 border-2 rounded-lg overflow-hidden
              ${selectedImage === index ? 'border-purple-500' : 'border-gray-200'}
              hover:border-purple-300 transition-colors`}
            style={{ width: IMAGE_SIZES.thumbnail.width, height: IMAGE_SIZES.thumbnail.height }}
          >
            <img
              src={image}
              alt={`${title} - صورة ${index + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="relative flex-1 bg-white  aspect-square rounded-lg overflow-hidden">
        <div
          className="w-full h-full"
          style={{
            position: 'relative',
            overflow: 'hidden',
            cursor: 'zoom-in'
          }}
        >
          <img
            src={images[selectedImage]}
            alt={`${title} - الصورة الرئيسية`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductImages; 