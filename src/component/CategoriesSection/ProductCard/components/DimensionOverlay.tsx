import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { createPortal } from "react-dom";
import { useEffect } from "react";
import { Dimension } from "../../../../pages/AddProduct/components/types";
import { Product } from "../../../../util/types";

interface DimensionOverlayProps {
  product: Product;
  selectedDimension: Dimension | null;
  dimensionError: string | null;
  onClose: () => void;
  onDimensionChange: (dimensionId: string) => void;
  onConfirm: (e: React.MouseEvent) => void;
}

const DimensionOverlay = ({
  product,
  selectedDimension,
  dimensionError,
  onClose,
  onDimensionChange,
  onConfirm,
}: DimensionOverlayProps) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
        {/* Overlay click to close */}
        <motion.div
          className="absolute inset-0"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          aria-hidden="true"
        />

        {/* Main modal */}
        <motion.div
          className="relative mx-auto w-full max-w-md"
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.98 }}
          transition={{ 
            type: "spring",
            damping: 25,
            stiffness: 300
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal content */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-purple-100 dark:border-purple-900/50">
            {/* Header with purple accent */}
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-900/50 p-5 border-b border-purple-200 dark:border-purple-800">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-purple-800 dark:text-purple-200">
                  اختر مقاس {product.name}
                </h3>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-purple-200/50 dark:hover:bg-purple-800/50 text-purple-600 dark:text-purple-300 transition-all"
                  aria-label="إغلاق"
                >
                  <FaTimes className="text-lg" />
                </button>
              </div>
            </div>

            {/* Dimensions Grid */}
            <div className="p-5 max-h-[60vh] overflow-y-auto">
              {product.dimensions?.length ? (
                <>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {product.dimensions.map((dimension) => (
                      <button
                        key={dimension._id}
                        onClick={() => onDimensionChange(dimension._id)}
                        className={`p-3 border-2 rounded-xl transition-all flex flex-col items-center ${
                          selectedDimension?._id === dimension._id
                            ? "border-purple-600 bg-purple-100/50 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 shadow-md"
                            : "border-gray-200 dark:border-gray-600 hover:border-purple-400 dark:hover:border-purple-500 hover:shadow-sm"
                        }`}
                      >
                        <span className="block font-medium text-purple-900 dark:text-purple-100">
                          {dimension.size.label}
                        </span>
                        {dimension.price !== 0 && (
                          <span className={`block text-xs mt-1 ${
                            selectedDimension?._id === dimension._id 
                              ? "text-purple-700 dark:text-purple-300" 
                              : "text-gray-500 dark:text-gray-400"
                          }`}>
                            {dimension.price > 0 ? '+' : ''}
                            {dimension.price.toLocaleString("ar-SA")} ر.س
                          </span>
                        )}
                      </button>
                    ))}
                  </div>

                  {dimensionError && (
                    <motion.p 
                      className="mt-4 text-red-500 text-sm text-center"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {dimensionError}
                    </motion.p>
                  )}
                </>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                  لا تتوفر مقاسات لهذا المنتج
                </p>
              )}
            </div>

            {/* Footer with purple button */}
            <div className="p-5 border-t border-purple-100 dark:border-purple-900/50 bg-purple-50/50 dark:bg-purple-900/20">
              <button
                onClick={onConfirm}
                className={`w-full py-3 px-4 rounded-xl font-medium transition-all ${
                  !selectedDimension && !!product.dimensions?.length
                    ? "bg-gray-300 dark:bg-gray-600 cursor-not-allowed text-gray-500"
                    : "bg-purple-600 hover:bg-purple-700 text-white shadow-md hover:shadow-lg"
                }`}
                disabled={!selectedDimension && !!product.dimensions?.length}
              >
                تأكيد الإضافة للسلة
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
};

export default DimensionOverlay;