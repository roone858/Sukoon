import { Dimension } from "../pages/AddProduct/components/types";

export interface ProductImage {
     public_id?: string;
     url: string;
     altText?: string;
   }
   
   export interface Product {
     id: string;
     name: string;
     description: string;
     price: number;
     stock?: number;
     discount?: number;
     discountEndDate?: Date | string;
     categories: string[];
     tags?: string[];
     images: ProductImage[];
     createdAt: Date | string;
     updatedAt?: Date | string;
     dimensions?: Dimension[];
   
     // Virtual field (calculated on backend)
     finalPrice?: number;
   }
   