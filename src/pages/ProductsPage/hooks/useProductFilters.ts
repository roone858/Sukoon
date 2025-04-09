import { useState, useEffect, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { debounce } from "lodash";
import { Product } from "../../../util/types";
import { FilterState, FilterActions } from "../types";
import {
  DEBOUNCE_DELAY,
  DEFAULT_SORT_OPTION,
  DEFAULT_PRICE_RANGE,
} from "../constants";
import { useStoreContext } from "../../../context/hooks/useStoreContext";
import { Category } from "../../../services/categories.service";

export const useProductFilters = (products: Product[]) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const { categories: categoriesDb } = useStoreContext();
  // State
  const [state, setState] = useState<FilterState>({
    selectedCategoriesId: [],
    priceRange: DEFAULT_PRICE_RANGE,
    sortOption: DEFAULT_SORT_OPTION,
    currentPage: 1,
  });

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Memoized derived values
  const minPrice = useMemo(() => {
    const prices = products.map((p) => p.price);
    return prices.length > 0 ? Math.floor(Math.min(...prices)) : 0;
  }, [products]);

  const maxPrice = useMemo(() => {
    const prices = products.map((p) => p.price);
    return prices.length > 0 ? Math.ceil(Math.max(...prices)) : 1000;
  }, [products]);

  const categories = useMemo(() => {
    return [...new Set(categoriesDb.map((cat) => cat))];
  }, [categoriesDb]);

  // Filter application
  const applyFilters = useCallback(() => {
    let result = [...products];

    if (state.selectedCategoriesId.length > 0) {
      result = result.filter((product) =>
        product.categories?.some((categoryId) =>
          state.selectedCategoriesId.includes(categoryId)
        )
      );
    }

    result = result.filter(
      (product) =>
        product.price >= state.priceRange[0] &&
        product.price <= state.priceRange[1]
    );

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
  }, [products, searchQuery, state]);

  const debouncedApplyFilters = useMemo(
    () => debounce(applyFilters, DEBOUNCE_DELAY),
    [applyFilters]
  );

  // URL params sync
  useEffect(() => {
    const initialCategories =
      searchParams.get("categories")?.split(",").filter(Boolean) || [];
    const initialMinPrice = Number(searchParams.get("minPrice")) || minPrice;
    const initialMaxPrice = Number(searchParams.get("maxPrice")) || maxPrice;
    const initialSort = searchParams.get("sort") || DEFAULT_SORT_OPTION;
    const initialPage = Number(searchParams.get("page")) || 1;

    setState({
      selectedCategoriesId: initialCategories,
      priceRange: [initialMinPrice, initialMaxPrice],
      sortOption: initialSort,
      currentPage: initialPage,
    });
  }, [searchParams, minPrice, maxPrice]);

  useEffect(() => {
    debouncedApplyFilters();
    return () => debouncedApplyFilters.cancel();
  }, [debouncedApplyFilters]);

  useEffect(() => {
    const params = new URLSearchParams();

    if (state.selectedCategoriesId.length > 0) {
      params.set("categories", state.selectedCategoriesId.join(","));
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
      setState((prev) => ({
        ...prev,
        selectedCategoriesId: prev.selectedCategoriesId.includes(category._id)
          ? prev.selectedCategoriesId.filter((id) => id !== category._id)
          : [...prev.selectedCategoriesId, category._id],
        currentPage: 1,
      }));
    }, []),

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
      categories,
      minPrice,
      maxPrice,
    },
    mobileFiltersOpen,
    setMobileFiltersOpen,
  };
};
