export const ITEMS_PER_PAGE = 12;
export const DEBOUNCE_DELAY = 300;

export const SORT_OPTIONS = {
  latest: "الأحدث",
  "price-low": "الأقل سعرًا",
  "price-high": "الأعلى سعرًا",
} as const;

export const DEFAULT_SORT_OPTION = "latest";
export const DEFAULT_PRICE_RANGE: [number, number] = [0, 1000]; 