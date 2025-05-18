import { useState } from 'react';
import { ProductImagesProps } from '../types';
import { IMAGE_SIZES } from '../constants';
import { motion } from 'framer-motion';

const ProductImages: React.FC<ProductImagesProps> = ({ images, title }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <div className="flex flex-col-reverse xs:flex-row gap-2 xs:gap-3 sm:gap-4">
      {/* Thumbnails - Horizontal scroll on mobile */}
      <div className="flex xs:flex-col gap-1.5 xs:gap-2 sm:gap-3 overflow-x-auto xs:overflow-y-auto py-1 xs:py-0">
        {images.map((image, index) => (
          <motion.button
            key={index}
            onClick={() => setSelectedImage(index)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`bg-white dark:bg-gray-800 relative flex-shrink-0 border-2 rounded-lg overflow-hidden
              ${selectedImage === index ? 'border-purple-500' : 'border-gray-200 dark:border-gray-600'}
              hover:border-purple-300 dark:hover:border-purple-400 transition-colors`}
            style={{ 
              width: IMAGE_SIZES.thumbnail.width / 1.5, // Smaller on mobile
              height: IMAGE_SIZES.thumbnail.height / 1.5,
              minWidth: IMAGE_SIZES.thumbnail.width / 1.5 // Prevent shrinking
            }}
          >
            <img
              src={image}
              alt={`${title} - صورة ${index + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </motion.button>
        ))}
      </div>

      {/* Main Image - Enhanced for mobile */}
      <motion.div 
        className="relative flex-1 bg-white dark:bg-gray-800 aspect-square rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700"
        whileTap={{ scale: isZoomed ? 1 : 0.95 }}
        onClick={() => setIsZoomed(!isZoomed)}
      >
        <div className="w-full h-full relative overflow-hidden">
          <motion.img
            src={images[selectedImage]}
            alt={`${title} - الصورة الرئيسية`}
            className="w-full h-full object-contain"
            loading="eager"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              scale: isZoomed ? 1.5 : 1
            }}
            transition={{ duration: 0.2 }}
          />
          
          {/* Zoom indicator */}
          <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
            {isZoomed ? 'إضغط للتصغير' : 'إضغط للتكبير'}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductImages;