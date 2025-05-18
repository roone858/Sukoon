import { Product } from "../../../../types/product.type";

export interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export interface ProductSearchProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClearSearch: () => void;
}
export function cx(...args: (string | undefined | false)[]): string {
     return args.filter(Boolean).join(" ");
   }