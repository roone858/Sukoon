import axios from "../util/axios";
import { apiUrl } from "../util/urls";
import { Category } from "../types/category.type";
import { Product } from "../types/product.type";

interface CategoryTree extends Category {
  children?: CategoryTree[];
}

const categoryService = {
  // إنشاء فئة جديدة
  createCategory: async (
    data: FormData | Omit<Category, "_id">
  ): Promise<Category | null> => {
    try {
      const config =
        data instanceof FormData
          ? { headers: { "Content-Type": "multipart/form-data" } }
          : {};

      const response = await axios.post(apiUrl + "/categories", data, config);
      return response.data;
    } catch (error) {
      console.error("Error creating category:", error);
      return null;
    }
  },

  // الحصول على جميع الفئات
  getAllCategories: async (): Promise<Category[] | undefined> => {
    try {
      const response = await axios.get(apiUrl + "/categories");
      return response.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw new Error(error as string);
    }
  },

  // الحصول على شجرة الفئات
  getCategoryTree: async (): Promise<CategoryTree[] | undefined> => {
    try {
      const response = await axios.get(apiUrl + "/categories/tree");
      return response.data;
    } catch (error) {
      console.error("Error fetching category tree:", error);
      throw new Error(error as string);
    }
  },

  getProductsOfCategory: async (categoryId: string): Promise<Product[] | undefined> => {
    try {
      const response = await axios.get(apiUrl + "/categories/" + categoryId + "/products");
      return response.data;
    } catch (error) {
      console.error("Error fetching products of category:", error);
      throw new Error(error as string);
    }
  },

  // الحصول على فئة بواسطة ID
  getCategoryById: async (id: string): Promise<Category | undefined> => {
    try {
      const response = await axios.get(apiUrl + "/categories/" + id);
      return response.data;
    } catch (error) {
      console.error("Error fetching category:", error);
      throw new Error(error as string);
    }
  },

  // الحصول على فئة بواسطة Slug
  getCategoryBySlug: async (slug: string): Promise<Category | undefined> => {
    try {
      const response = await axios.get(apiUrl + "/categories/slug/" + slug);
      return response.data;
    } catch (error) {
      console.error("Error fetching category by slug:", error);
      throw new Error(error as string);
    }
  },

  // تحديث فئة
  updateCategory: async (
    id: string,
    data: FormData | Partial<Category>
  ): Promise<Category | null> => {
    try {
      const config =
        data instanceof FormData
          ? { headers: { "Content-Type": "multipart/form-data" } }
          : {};

      const response = await axios.patch(
        apiUrl + "/categories/" + id,
        data,
        config
      );
      return response.data;
    } catch (error) {
      console.error("Error updating category:", error);
      throw new Error(error as string);
      return null;
    }
  },

  // حذف فئة
  deleteCategory: async (id: string): Promise<boolean> => {
    try {
      await axios.delete(apiUrl + "/categories/" + id);
      return true;
    } catch (error) {
      console.error("Error deleting category:", error);
      return false;
    }
  },

  // الحصول على الفئات الفرعية
  getSubcategories: async (
    parentId: string
  ): Promise<Category[] | undefined> => {
    try {
      const response = await axios.get(
        apiUrl + "/categories/" + parentId + "/subcategories"
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  },
};

export default categoryService;
