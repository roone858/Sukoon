export const MAX_QUANTITY = 10;
export const MIN_QUANTITY = 1;
export const DEFAULT_QUANTITY = 1;

export const RELATED_PRODUCTS_LIMIT = 4;

export const ZOOM_OPTIONS = {
  scale: 2,
  offset: { vertical: 0, horizontal: 10 },
};

export const IMAGE_SIZES = {
  thumbnail: {
    width: 80,
    height: 80,
  },
  main: {
    width: 600,
    height: 600,
  },
};

export const TOAST_MESSAGES = {
  addToCart: {
    success: "تمت إضافة المنتج إلى السلة",
    error: "حدث خطأ أثناء إضافة المنتج إلى السلة",
  },
  addToWishlist: {
    success: "تمت إضافة المنتج إلى قائمة الرغبات",
    error: "حدث خطأ أثناء إضافة المنتج إلى قائمة الرغبات",
  },
} as const; 