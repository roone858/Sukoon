import { memo, useCallback, useEffect } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { FaTimes } from "react-icons/fa";
import { Dimension } from "../../../../pages/AddProduct/components/types";
import { Product } from "../../../../types/product.type";

interface DimensionOverlayProps {
  isOpen: boolean;
  product: Product;
  selectedDimension: Dimension | null;
  dimensionError: string | null;
  onClose: () => void;
  onDimensionChange: (dimensionId: string) => void;
  onConfirm: (e: React.MouseEvent) => void;
}

const DimensionOverlay = memo(
  ({
    isOpen,
    product,
    selectedDimension,
    dimensionError,
    onClose,
    onDimensionChange,
    onConfirm,
  }: DimensionOverlayProps) => {
    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    }, [isOpen]);

    const handleDimensionClick = useCallback(
      (dimensionId: string) => {
        onDimensionChange(dimensionId);
      },
      [onDimensionChange]
    );

    const handleConfirmClick = useCallback(
      (e: React.MouseEvent) => {
        onConfirm(e);
      },
      [onConfirm]
    );

    const hasDimensions =product.dimensions && product.dimensions?.length > 0;
    const isConfirmDisabled = !selectedDimension && hasDimensions;

    if (!isOpen) return null;

    return (
      <Dialog
        open={isOpen}
        onClose={onClose}
        className="fixed inset-0 z-[9999] overflow-y-auto"
      >
        {/* Overlay */}
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" aria-hidden="true" />

        {/* Modal container */}
        <div className="flex items-center justify-center min-h-screen p-2 sm:p-4">
          <div className="relative mx-auto w-full max-w-[95vw] sm:max-w-md">
            <DialogPanel className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-xl overflow-hidden border border-purple-100 dark:border-purple-900/50">
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-900/50 p-3 sm:p-5 border-b border-purple-200 dark:border-purple-800">
                <div className="flex justify-between items-center">
                  <DialogTitle className="text-sm sm:text-base font-bold text-purple-800 dark:text-purple-200 truncate max-w-[70%]">
                    اختر مقاس {product.name}
                  </DialogTitle>
                  <button
                    onClick={onClose}
                    className="p-1 sm:p-2 rounded-full hover:bg-purple-200/50 dark:hover:bg-purple-800/50 text-purple-600 dark:text-purple-300 transition-colors"
                    aria-label="إغلاق"
                  >
                    <FaTimes className="text-base sm:text-lg" />
                  </button>
                </div>
              </div>

              {/* Dimensions Grid */}
              <div className="p-3 sm:p-5 max-h-[50vh] sm:max-h-[60vh] overflow-y-auto">
                {hasDimensions ? (
                  <>
                    <div className="grid grid-cols-2 gap-2 sm:gap-3 sm:grid-cols-3">
                      {product.dimensions?.map((dimension) => {
                        const isSelected = selectedDimension?._id === dimension._id;
                        return (
                          <button
                            key={dimension._id}
                            onClick={() => handleDimensionClick(dimension._id)}
                            className={`p-2 sm:p-3 border-2 rounded-lg sm:rounded-xl transition-colors flex flex-col items-center ${
                              isSelected
                                ? "border-purple-600 bg-purple-100/50 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 shadow-sm sm:shadow-md"
                                : "border-gray-200 dark:border-gray-600 hover:border-purple-400 dark:hover:border-purple-500"
                            }`}
                          >
                            <span className="block font-medium text-sm sm:text-base text-purple-900 dark:text-purple-100">
                              {dimension.size.label}
                            </span>
                            {dimension.price !== 0 && (
                              <span className={`block text-xs mt-0.5 sm:mt-1 ${
                                isSelected
                                  ? "text-purple-700 dark:text-purple-300"
                                  : "text-gray-500 dark:text-gray-400"
                              }`}>
                                {dimension.price.toLocaleString("ar-SA")} ر.س
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {dimensionError && (
                      <p className="mt-3 sm:mt-4 text-red-500 text-xs sm:text-sm text-center">
                        {dimensionError}
                      </p>
                    )}
                  </>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base text-center py-6 sm:py-8">
                    لا تتوفر مقاسات لهذا المنتج
                  </p>
                )}
              </div>

              {/* Footer */}
              <div className="p-3 sm:p-5 border-t border-purple-100 dark:border-purple-900/50 bg-purple-50/50 dark:bg-purple-900/20">
                <button
                  onClick={handleConfirmClick}
                  className={`w-full py-2 sm:py-3 px-4 rounded-lg sm:rounded-xl font-medium text-sm sm:text-base transition-colors ${
                    isConfirmDisabled
                      ? "bg-gray-300 dark:bg-gray-600 cursor-not-allowed text-gray-500"
                      : "bg-purple-600 hover:bg-purple-700 text-white shadow-sm sm:shadow-md"
                  }`}
                  disabled={isConfirmDisabled}
                >
                  تأكيد الإضافة للسلة
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    );
  }
);

DimensionOverlay.displayName = "DimensionOverlay";

export default DimensionOverlay;