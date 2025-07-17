import { useState, useEffect, useMemo, useCallback, useReducer } from "react";
import { useSearchParams } from "react-router-dom";
import { debounce } from "lodash";
import { FilterActions } from "../types";
import {
  DEBOUNCE_DELAY,
  DEFAULT_SORT_OPTION,
  DEFAULT_PRICE_RANGE,
} from "../constants";
import { useStoreContext } from "../../../context/hooks/useStoreContext";
import { Product } from "../../../types/product.type";
import { Category } from "../../../types/category.type";
import {
  CategoryOperations,
  createFilter,
  filterReducer,
  sortStrategies,
} from "../../../util/categoryOperations";

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

  const categoryOps = useMemo(
    () => new CategoryOperations(categoriesDb),
    [categoriesDb]
  );

  const { minPrice, maxPrice } = useMemo(
    () => ({
      minPrice: Math.floor(Math.min(...products.map((p) => p.price), 0)),
      maxPrice: Math.ceil(Math.max(...products.map((p) => p.price), 1000)),
    }),
    [products]
  );

  const applyFilters = useCallback(() => {
    const filters = [
      createFilter.byCategory(state.selectedCategories, categoryOps),
      createFilter.byPrice(state.priceRange),
      createFilter.bySearch(state.searchQuery),
    ];

    const result = products
      .filter((product) => filters.every((fn) => fn(product)))
      .sort(
        sortStrategies[state.sortOption as keyof typeof sortStrategies] ||
          sortStrategies.latest
      );

    setFilteredProducts(result);
  }, [products, state, categoryOps]);

  const debouncedApplyFilters = useMemo(
    () => debounce(applyFilters, DEBOUNCE_DELAY),
    [applyFilters]
  );

  useEffect(() => {
    const params = {
      categories:
        searchParams.get("categories")?.split(",").filter(Boolean) || [],
      minPrice: Number(searchParams.get("minPrice")) || minPrice,
      maxPrice: Number(searchParams.get("maxPrice")) || maxPrice,
      sort: searchParams.get("sort") || DEFAULT_SORT_OPTION,
      page: Number(searchParams.get("page")) || 1,
      search: searchParams.get("search") || "",
    };

    dispatch({
      type: "SET_CATEGORIES",
      payload: categoriesDb.filter((cat) =>
        params.categories.includes(cat._id)
      ),
    });
    dispatch({
      type: "SET_PRICE_RANGE",
      payload: [params.minPrice, params.maxPrice],
    });
    dispatch({ type: "SET_SORT_OPTION", payload: params.sort });
    dispatch({ type: "SET_CURRENT_PAGE", payload: params.page });
    dispatch({ type: "SET_SEARCH_QUERY", payload: params.search });
  }, [categoriesDb, minPrice, maxPrice, searchParams]);

  useEffect(() => {
    debouncedApplyFilters();
    return () => debouncedApplyFilters.cancel();
  }, [debouncedApplyFilters]);

  const actions = useMemo<FilterActions>(
    () => ({
      onCategoryToggle: (category: Category) => {
        const isSelected = state.selectedCategories.some(
          (cat) => cat._id === category._id
        );
        const newCategories = isSelected
          ? state.selectedCategories.filter((cat) => cat._id !== category._id)
          : [
              ...categoryOps.getRelevantCategories(
                category._id,
                state.selectedCategories
              ),
              category,
            ];

        dispatch({ type: "SET_CATEGORIES", payload: newCategories });
      },
      onPriceChange: (range: [number, number]) =>
        dispatch({ type: "SET_PRICE_RANGE", payload: range }),
      onSortChange: (sort: string) =>
        dispatch({ type: "SET_SORT_OPTION", payload: sort }),
      onPriceReset: () => dispatch({ type: "RESET_PRICE" }),
      onSortReset: () => dispatch({ type: "RESET_SORT" }),
      onPageChange: (page: number) => {
        dispatch({ type: "SET_CURRENT_PAGE", payload: page });
        window.scrollTo({ top: 0, behavior: "smooth" });
      },
      onSearchChange: (query: string) =>
        dispatch({ type: "SET_SEARCH_QUERY", payload: query }),
    }),
    [state.selectedCategories, categoryOps]
  );

  return {
    state,
    actions,
    filteredProducts,
    mobileFiltersOpen,
    setMobileFiltersOpen,
    derivedData: { categories: categoriesDb, minPrice, maxPrice },
  };
};
