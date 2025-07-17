import {
  DEFAULT_PRICE_RANGE,
  DEFAULT_SORT_OPTION,
} from "../../pages/ProductsPage/constants";
import { FilterState } from "../../pages/ProductsPage/types";
import { Category, CategoryAncestor } from "../../types/category.type";
import { Product } from "../../types/product.type";

export type FilterAction =
  | { type: "SET_CATEGORIES"; payload: Category[] }
  | { type: "SET_PRICE_RANGE"; payload: [number, number] }
  | { type: "SET_SORT_OPTION"; payload: string }
  | { type: "SET_CURRENT_PAGE"; payload: number }
  | { type: "RESET_PRICE" }
  | { type: "RESET_SORT" }
  | { type: "SET_SEARCH_QUERY"; payload: string };

export class CategoryOperations {
  constructor(private categories: Category[]) {}

  private getCategoryHierarchy(
    categoryId: string,
    direction: "parents" | "children"
  ): string[] {
    const result: string[] = [];

    if (direction === "parents") {
      let current = this.categories.find((cat) => cat._id === categoryId);
      while (current?.parentId) {
        result.push(current.parentId);
        current = this.categories.find((cat) => cat._id === current?.parentId);
      }
    } else {
      const children = this.categories.filter(
        (cat) => cat.parentId === categoryId
      );
      children.forEach((child) => {
        result.push(
          child._id,
          ...this.getCategoryHierarchy(child._id, "children")
        );
      });
    }

    return result;
  }

  getCategoryChain(categoryId: string): string[] {
    return [categoryId, ...this.getCategoryHierarchy(categoryId, "children")];
  }

  getRelevantCategories(
    categoryId: string,
    selectedCategories: Category[]
  ): Category[] {
    const childrenIds = this.getCategoryHierarchy(categoryId, "children");
    const parentIds = this.getCategoryHierarchy(categoryId, "parents");

    return selectedCategories.filter(
      (cat) => !childrenIds.includes(cat._id) && !parentIds.includes(cat._id)
    );
  }
}

export function filterReducer(
  state: FilterState,
  action: FilterAction
): FilterState {
  const commonUpdates = { currentPage: 1 }; // Reset page on most filter changes

  switch (action.type) {
    case "SET_CATEGORIES":
      return { ...state, selectedCategories: action.payload, ...commonUpdates };
    case "SET_PRICE_RANGE":
      return { ...state, priceRange: action.payload, ...commonUpdates };
    case "SET_SORT_OPTION":
      return { ...state, sortOption: action.payload, ...commonUpdates };
    case "SET_CURRENT_PAGE":
      return { ...state, currentPage: action.payload };
    case "RESET_PRICE":
      return { ...state, priceRange: DEFAULT_PRICE_RANGE, ...commonUpdates };
    case "RESET_SORT":
      return { ...state, sortOption: DEFAULT_SORT_OPTION, ...commonUpdates };
    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.payload, ...commonUpdates };
    default:
      return state;
  }
}

export const createFilter = {
  byCategory: (
    selectedCategories: Category[],
    categoryOps: CategoryOperations
  ) => {
    if (!selectedCategories.length) return () => true;

    const validCategoryIds = new Set(
      selectedCategories.flatMap((cat) => categoryOps.getCategoryChain(cat._id))
    );

    return (product: Product) =>
      product.categories?.some((id) => validCategoryIds.has(id));
  },
  byPrice: (range: [number, number]) => (product: Product) =>
    product.price >= range[0] && product.price <= range[1],
  bySearch: (query: string) => {
    if (!query?.trim()) return () => true;
    const q = query.toLowerCase();
    return (product: Product) =>
      product.name.toLowerCase().includes(q) ||
      product.description?.toLowerCase().includes(q);
  },
};

export const sortStrategies = {
  latest: (a: Product, b: Product) =>
    new Date(b.createdAt || "").getTime() -
    new Date(a.createdAt || "").getTime(),
  "price-low": (a: Product, b: Product) => a.price - b.price,
  "price-high": (a: Product, b: Product) => b.price - a.price,
};

export const getCategoryPath = (category: Category): string => {
  const ancestorNames =
    category.ancestors?.map((a: CategoryAncestor) => a.name) || [];
  return [...ancestorNames, category.name].join(" / ");
};
