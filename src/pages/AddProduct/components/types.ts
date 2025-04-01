export interface FormDataState {
  name: string;
  description: string;
  price: number | string;
  stock: number | string;
  discount: number | string;
  discountEndDate: string;
  sizes: string[];
  categories: string[];
  tags: string[];
  dimensions: Dimension[];
}

export type Dimension = {
  _id: string;
  size: {
    width: number;
    height: number;
    label: string;
  };
  price: number;
  stock: number;
  isAvailable: boolean;
};
export interface ImagePreview {
  url: string;
  name: string;
}

// Type for available dimension option
export type AvailableDimension = {
  value: string;
  label: string;
  width: number;
  height: number;
};

export interface TagInputSectionProps {
  label: string;
  items: string[];
  currentInput: string;
  onInputChange: (value: string) => void;
  onAddItem: () => void;
  onRemoveItem: (item: string) => void;
  placeholder: string;
  maxLength: number;
}

export interface DiscountInfoProps {
  originalPrice: number;
  discount: number;
  discountedPrice: number;
  discountEndDate: string;
}

export interface ImagePreviewsSectionProps {
  previews: ImagePreview[];
}

export interface SubmitButtonProps {
  isLoading: boolean;
}

export interface ProductFormFieldsProps {
  formData: FormDataState;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSizeSelection: (size: string) => void;
  handleRemoveItem: (
    type: "categories" | "tags" | "sizes"
  ) => (itemToRemove: string) => void;
  currentCategoryInput: string;
  setCurrentCategoryInput: (value: string) => void;
  currentTagInput: string;
  setCurrentTagInput: (value: string) => void;
  handleAddItem: (
    type: "categories" | "tags" | "sizes",
    value?: string
  ) => void;

  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // Dimension handlers
  handleDimensionSelection: (dimension: AvailableDimension) => void;
  handleDimensionPriceChange: (index: number, value: string) => void;
  handleDimensionStockChange: (index: number, value: string) => void;
  handleRemoveDimension: (index: number) => void;
  discountedPrice: number | null;
  imagePreviews: ImagePreview[];
  isLoading: boolean;
}
