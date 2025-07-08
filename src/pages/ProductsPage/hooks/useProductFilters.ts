import { useState, useEffect, useMemo, useCallback, useReducer } from "react";
import { useSearchParams } from "react-router-dom";
import { debounce } from "lodash";
import { FilterState, FilterActions } from "../types";
import {
  DEBOUNCE_DELAY,
  DEFAULT_SORT_OPTION,
  DEFAULT_PRICE_RANGE,
} from "../constants";
import { useStoreContext } from "../../../context/hooks/useStoreContext";
import { Product } from "../../../types/product.type";
import { Category } from "../../../types/category.type";

type FilterAction =
  | { type: 'SET_CATEGORIES'; payload: Category[] }
  | { type: 'SET_PRICE_RANGE'; payload: [number, number] }
  | { type: 'SET_SORT_OPTION'; payload: string }
  | { type: 'SET_CURRENT_PAGE'; payload: number }
  | { type: 'RESET_PRICE' }
  | { type: 'RESET_SORT' }
  | { type: 'SET_SEARCH_QUERY'; payload: string };

const sortStrategies = {
  'latest': (a: Product, b: Product) => 
    new Date(b.createdAt || "").getTime() - new Date(a.createdAt || "").getTime(),
  'price-low': (a: Product, b: Product) => a.price - b.price,
  'price-high': (a: Product, b: Product) => b.price - a.price,
};

class CategoryOperations {
  constructor(private categories: Category[]) {}

  private getCategoryHierarchy(categoryId: string, direction: 'parents' | 'children'): string[] {
    const result: string[] = [];
    
    if (direction === 'parents') {
      let current = this.categories.find(cat => cat._id === categoryId);
      while (current?.parentId) {
        result.push(current.parentId);
        current = this.categories.find(cat => cat._id === current?.parentId);
      }
    } else {
      const children = this.categories.filter(cat => cat.parentId === categoryId);
      children.forEach(child => {
        result.push(child._id, ...this.getCategoryHierarchy(child._id, 'children'));
      });
    }
    
    return result;
  }

  getCategoryChain(categoryId: string): string[] {
    return [categoryId, ...this.getCategoryHierarchy(categoryId, 'children')];
  }

  getRelevantCategories(categoryId: string, selectedCategories: Category[]): Category[] {
    const childrenIds = this.getCategoryHierarchy(categoryId, 'children');
    const parentIds = this.getCategoryHierarchy(categoryId, 'parents');
    
    return selectedCategories.filter(cat => 
      !childrenIds.includes(cat._id) && 
      !parentIds.includes(cat._id)
    );
  }
}

function filterReducer(state: FilterState, action: FilterAction): FilterState {
  const commonUpdates = { currentPage: 1 }; // Reset page on most filter changes
  
  switch (action.type) {
    case 'SET_CATEGORIES':
      return { ...state, selectedCategories: action.payload, ...commonUpdates };
    case 'SET_PRICE_RANGE':
      return { ...state, priceRange: action.payload, ...commonUpdates };
    case 'SET_SORT_OPTION':
      return { ...state, sortOption: action.payload, ...commonUpdates };
    case 'SET_CURRENT_PAGE':
      return { ...state, currentPage: action.payload };
    case 'RESET_PRICE':
      return { ...state, priceRange: DEFAULT_PRICE_RANGE, ...commonUpdates };
    case 'RESET_SORT':
      return { ...state, sortOption: DEFAULT_SORT_OPTION, ...commonUpdates };
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload, ...commonUpdates };
    default:
      return state;
  }
}

const createFilter = {
  byCategory: (selectedCategories: Category[], categoryOps: CategoryOperations) => {
    if (!selectedCategories.length) return () => true;
    
    const validCategoryIds = new Set(
      selectedCategories.flatMap(cat => categoryOps.getCategoryChain(cat._id))
    );

    return (product: Product) => 
      product.categories?.some(id => validCategoryIds.has(id));
  },
  byPrice: (range: [number, number]) => 
    (product: Product) => product.price >= range[0] && product.price <= range[1],
  bySearch: (query: string) => {
    if (!query?.trim()) return () => true;
    const q = query.toLowerCase();
    return (product: Product) =>
      product.name.toLowerCase().includes(q) ||
      product.description?.toLowerCase().includes(q);
  },
};

export const useProductFilters = (products: Product[]) => {
  const [searchParams] = useSearchParams();
  const { categories: categoriesDb } = useStoreContext();
  
  const [state, dispatch] = useReducer(filterReducer, {
    selectedCategories: [],
    priceRange: DEFAULT_PRICE_RANGE,
    sortOption: DEFAULT_SORT_OPTION,
    currentPage: 1,
    searchQuery: searchParams.get("search") || "",
  });

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const categoryOps = useMemo(() => new CategoryOperations(categoriesDb), [categoriesDb]);

  const { minPrice, maxPrice } = useMemo(() => ({
    minPrice: Math.floor(Math.min(...products.map(p => p.price), 0)),
    maxPrice: Math.ceil(Math.max(...products.map(p => p.price), 1000)),
  }), [products]);

  const applyFilters = useCallback(() => {
    const filters = [
      createFilter.byCategory(state.selectedCategories, categoryOps),
      createFilter.byPrice(state.priceRange),
      createFilter.bySearch(state.searchQuery),
    ];

    const result = products
      .filter(product => filters.every(fn => fn(product)))
      .sort(sortStrategies[state.sortOption as keyof typeof sortStrategies] || sortStrategies.latest);

    setFilteredProducts(result);
  }, [products, state, categoryOps]);

  const debouncedApplyFilters = useMemo(
    () => debounce(applyFilters, DEBOUNCE_DELAY),
    [applyFilters]
  );

  useEffect(() => {
    const params = {
      categories: searchParams.get("categories")?.split(",").filter(Boolean) || [],
      minPrice: Number(searchParams.get("minPrice")) || minPrice,
      maxPrice: Number(searchParams.get("maxPrice")) || maxPrice,
      sort: searchParams.get("sort") || DEFAULT_SORT_OPTION,
      page: Number(searchParams.get("page")) || 1,
      search: searchParams.get("search") || "",
    };

    dispatch({ 
      type: 'SET_CATEGORIES', 
      payload: categoriesDb.filter(cat => params.categories.includes(cat._id)) 
    });
    dispatch({ type: 'SET_PRICE_RANGE', payload: [params.minPrice, params.maxPrice] });
    dispatch({ type: 'SET_SORT_OPTION', payload: params.sort });
    dispatch({ type: 'SET_CURRENT_PAGE', payload: params.page });
    dispatch({ type: 'SET_SEARCH_QUERY', payload: params.search });
  }, [categoriesDb, minPrice, maxPrice, searchParams]);

  useEffect(() => {
    debouncedApplyFilters();
    return () => debouncedApplyFilters.cancel();
  }, [debouncedApplyFilters]);

  const actions = useMemo<FilterActions>(() => ({
    onCategoryToggle: (category: Category) => {
      const isSelected = state.selectedCategories.some(cat => cat._id === category._id);
      const newCategories = isSelected
        ? state.selectedCategories.filter(cat => cat._id !== category._id)
        : [...categoryOps.getRelevantCategories(category._id, state.selectedCategories), category];
      
      dispatch({ type: 'SET_CATEGORIES', payload: newCategories });
    },
    onPriceChange: (range: [number, number]) => 
      dispatch({ type: 'SET_PRICE_RANGE', payload: range }),
    onSortChange: (sort: string) => 
      dispatch({ type: 'SET_SORT_OPTION', payload: sort }),
    onPriceReset: () => 
      dispatch({ type: 'RESET_PRICE' }),
    onSortReset: () => 
      dispatch({ type: 'RESET_SORT' }),
    onPageChange: (page: number) => {
      dispatch({ type: 'SET_CURRENT_PAGE', payload: page });
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    onSearchChange: (query: string) => 
      dispatch({ type: 'SET_SEARCH_QUERY', payload: query }),
  }), [state.selectedCategories, categoryOps]);

  return {
    state,
    actions,
    filteredProducts,
    mobileFiltersOpen,
    setMobileFiltersOpen,
    derivedData: { categories: categoriesDb, minPrice, maxPrice },
  };
};