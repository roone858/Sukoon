import { Category } from "../../services/categories.service";
import { Product } from "../../util/types";

export interface FilterState {
  selectedCategories: Category[];
  priceRange: [number, number];
  sortOption: string;
  currentPage: number;
}

export interface FilterActions {
  onCategoryToggle: (category: Category) => void;
  onPriceChange: (range: [number, number]) => void;
  onSortChange: (sort: string) => void;
  onPriceReset: () => void;
  onSortReset: () => void;
  onPageChange: (page: number) => void;
}

export interface ProductsPageProps {
  products: Product[];
  isLoading: boolean;
}

export interface FilterSidebarProps
  extends Pick<
    FilterState,
    "selectedCategories" | "priceRange" | "sortOption"
  > {
  categories: string[];
  minPrice: number;
  maxPrice: number;
  mobileFiltersOpen: boolean;
  setMobileFiltersOpen: (open: boolean) => void;
  toggleCategory: (category: string) => void;
  setPriceRange: (range: [number, number]) => void;
  setSortOption: (sort: string) => void;
}

export interface ActiveFiltersProps
  extends Pick<
    FilterState,
    "selectedCategories" | "priceRange" | "sortOption"
  > {
  onRemoveCategory: (category: string) => void;
  onResetPrice: () => void;
  onResetSort: () => void;
}

export interface ProductGridProps {
  products: Product[];
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
