export interface CategoryAncestor {
  _id: string;
  name: string;
  slug: string;
}

export interface CategoryAttribute {
  name: string;
  value: string | number | boolean;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
  imageUrl?: string;
  isActive: boolean;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  
  createdAt?: string;
  ancestors?: CategoryAncestor[];
  level?: number;
  displayOrder: number;
  metaTitle?: string;
  metaDescription?: string;
  attributes?: string[];
  updatedAt: string;
} 