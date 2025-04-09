// types.ts
export type DimensionOption = {
     value: string;
     label: string;
     width: number;
     height: number;
   };
   
   export type DimensionDetail = {
     size: {
       width: number;
       height: number;
       label: string;
     };
     price: number;
     stock: number;
     isAvailable: boolean;
   };
   
   export type CategoryOption = {
     value: string;
     label: string;
   };
   
   export type ProductFormValues = {
     name: string;
     description: string;
     price: number;
     discount?: number;
     discountEndDate?: string;
     stock: number;
     dimensions?: DimensionDetail[];
     categories: string[];
     tags?: string[];
     images: File[];
   };
   
   export const DIMENSION_OPTIONS: DimensionOption[] = [
     { value: "200x200", label: "٢٠٠×٢٠٠ سم", width: 200, height: 200 },
     { value: "180x200", label: "١٨٠×٢٠٠ سم", width: 180, height: 200 },
     { value: "180x190", label: "١٨٠×١٩٠ سم", width: 180, height: 190 },
     { value: "160x200", label: "١٦٠×٢٠٠ سم", width: 160, height: 200 },
     { value: "150x200", label: "١٥٠×٢٠٠ سم", width: 150, height: 200 },
   ];
   
   export const CATEGORY_OPTIONS: CategoryOption[] = [
     { value: "1", label: "مراتب" },
     { value: "2", label: "مفروشات" },
     { value: "3", label: "وسائد" },
     { value: "4", label: "أغطية" },
     { value: "5", label: "أسرّة" },
     { value: "6", label: "أرائك" },
   ];