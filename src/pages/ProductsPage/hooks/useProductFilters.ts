import { useState, useEffect, useMemo, useCallback } from "react";
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

export const useProductFilters = (products: Product[]) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const { categories: categoriesDb } = useStoreContext();
  
  // State
  const [state, setState] = useState<FilterState>({
    selectedCategories: [],
    priceRange: DEFAULT_PRICE_RANGE,
    sortOption: DEFAULT_SORT_OPTION,
    currentPage: 1,
  });

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Get all parent categories for a given category
  const getCategoryParents = useCallback((categoryId: string): string[] => {
    const result: string[] = [];
    let currentCategory = categoriesDb.find(cat => cat._id === categoryId);
    
    while (currentCategory?.parentId) {
      result.push(currentCategory.parentId);
      const parentCategory = categoriesDb.find(cat => cat._id === currentCategory?.parentId);
      if (!parentCategory) break;
      currentCategory = parentCategory;
    }
    
    return result;
  }, [categoriesDb]);

  // Get all child categories for a given category
  const getCategoryChildren = useCallback((categoryId: string): string[] => {
    const result: string[] = [];
    const children = categoriesDb.filter(cat => cat.parentId === categoryId);
    
    children.forEach(child => {
      result.push(child._id);
      // Recursively get children of children
      const grandChildren = getCategoryChildren(child._id);
      result.push(...grandChildren);
    });
    
    return result;
  }, [categoriesDb]);

  // Get category chain (self + children) for filtering
  const getCategoryChain = useCallback((categoryId: string): string[] => {
    // Include the category itself and all its children
    return [
      categoryId,
      ...getCategoryChildren(categoryId)
    ];
  }, [getCategoryChildren]);

  // Memoized derived values
  const minPrice = useMemo(() => {
    const prices = products.map((p) => p.price);
    return prices.length > 0 ? Math.floor(Math.min(...prices)) : 0;
  }, [products]);

  const maxPrice = useMemo(() => {
    const prices = products.map((p) => p.price);
    return prices.length > 0 ? Math.ceil(Math.max(...prices)) : 1000;
  }, [products]);

  // Filter application
  const applyFilters = useCallback(() => {
    let result = [...products];

    // Filter by categories (including child categories)
    if (state.selectedCategories.length > 0) {
      const validCategoryIds = new Set<string>();
      
      // Collect all valid category IDs (selected categories + their children)
      state.selectedCategories.forEach(category => {
        // Add the category itself and all its children
        getCategoryChain(category._id).forEach(id => validCategoryIds.add(id));
      });

      // Log for debugging
  

      result = result.filter((product) =>
        product.categories?.some((categoryId) => validCategoryIds.has(categoryId))
      );
    }

    // Filter by price range
    result = result.filter(
      (product) =>
        product.price >= state.priceRange[0] &&
        product.price <= state.priceRange[1]
    );

    // Sort products
    switch (state.sortOption) {
      case "latest":
        result = result.sort(
          (a, b) =>
            new Date(b.createdAt || "").getTime() -
            new Date(a.createdAt || "").getTime()
        );
        break;
      case "price-low":
        result = result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result = result.sort((a, b) => b.price - a.price);
        break;
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          (product.description &&
            product.description.toLowerCase().includes(query))
      );
    }

    setFilteredProducts(result);
  }, [products, searchQuery, state, getCategoryChain]);

  const debouncedApplyFilters = useMemo(
    () => debounce(applyFilters, DEBOUNCE_DELAY),
    [applyFilters]
  );

  // URL params sync
  useEffect(() => {
    const initialCategoryIds = searchParams.get("categories")?.split(",").filter(Boolean) || [];
    const initialMinPrice = Number(searchParams.get("minPrice")) || minPrice;
    const initialMaxPrice = Number(searchParams.get("maxPrice")) || maxPrice;
    const initialSort = searchParams.get("sort") || DEFAULT_SORT_OPTION;
    const initialPage = Number(searchParams.get("page")) || 1;

    // Find categories by their IDs
    const initialCategories = categoriesDb.filter((cat) =>
      initialCategoryIds.includes(cat._id)
    );

    setState({
      selectedCategories: initialCategories,
      priceRange: [initialMinPrice, initialMaxPrice],
      sortOption: initialSort,
      currentPage: initialPage,
    });
  }, [searchParams, minPrice, maxPrice, categoriesDb]);

  useEffect(() => {
    debouncedApplyFilters();
    return () => debouncedApplyFilters.cancel();
  }, [debouncedApplyFilters]);

  useEffect(() => {
    const params = new URLSearchParams();

    if (state.selectedCategories.length > 0) {
      params.set(
        "categories",
        state.selectedCategories.map((cat) => cat._id).join(",")
      );
    }
    if (state.priceRange[0] !== minPrice) {
      params.set("minPrice", state.priceRange[0].toString());
    }
    if (state.priceRange[1] !== maxPrice) {
      params.set("maxPrice", state.priceRange[1].toString());
    }
    if (state.sortOption !== DEFAULT_SORT_OPTION) {
      params.set("sort", state.sortOption);
    }
    if (state.currentPage > 1) {
      params.set("page", state.currentPage.toString());
    }

    setSearchParams(params);
  }, [state, minPrice, maxPrice, setSearchParams]);

  // Actions
  const actions: FilterActions = {
    onCategoryToggle: useCallback((category: Category) => {
      setState((prev) => {
        const isSelected = prev.selectedCategories.some(
          (cat) => cat._id === category._id
        );

        let newSelectedCategories: Category[];
        if (isSelected) {
          // When deselecting a category, remove it and its children
          const childrenIds = getCategoryChildren(category._id);
          newSelectedCategories = prev.selectedCategories.filter(
            (cat) => cat._id !== category._id && !childrenIds.includes(cat._id)
          );
        } else {
          // When selecting a category:
          // 1. If it's a parent category, remove its children from selection
          // 2. If it's a child category, remove its parent from selection
          const childrenIds = getCategoryChildren(category._id);
          const parentIds = getCategoryParents(category._id);
          
          newSelectedCategories = prev.selectedCategories
            .filter((cat) => 
              !childrenIds.includes(cat._id) && // Remove children
              !parentIds.includes(cat._id)      // Remove parents
            )
            .concat(category);
        }

        return {
          ...prev,
          selectedCategories: newSelectedCategories,
          currentPage: 1,
        };
      });
    }, [getCategoryChildren, getCategoryParents]),

    onPriceChange: useCallback((range: [number, number]) => {
      setState((prev) => ({ ...prev, priceRange: range, currentPage: 1 }));
    }, []),

    onSortChange: useCallback((sort: string) => {
      setState((prev) => ({ ...prev, sortOption: sort, currentPage: 1 }));
    }, []),

    onPriceReset: useCallback(() => {
      setState((prev) => ({
        ...prev,
        priceRange: [minPrice, maxPrice],
        currentPage: 1,
      }));
    }, [minPrice, maxPrice]),

    onSortReset: useCallback(() => {
      setState((prev) => ({
        ...prev,
        sortOption: DEFAULT_SORT_OPTION,
        currentPage: 1,
      }));
    }, []),

    onPageChange: useCallback((page: number) => {
      setState((prev) => ({ ...prev, currentPage: page }));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, []),
  };

  return {
    state,
    actions,
    filteredProducts,
    setSearchQuery,
    derivedData: {
      categories: categoriesDb,
      minPrice,
      maxPrice,
    },
    mobileFiltersOpen,
    setMobileFiltersOpen,
  };
};
