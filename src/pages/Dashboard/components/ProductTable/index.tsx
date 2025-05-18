import React, { useState, useMemo } from "react";
import { toast } from "react-toastify";
import { useStoreContext } from "../../../../context/hooks/useStoreContext";
import productService from "../../../../services/products.service";
import { Dimension } from "../../../AddProduct/components/types";
import ProductSearch from "./components/ProductSearch";
import ProductTableMobile from "./components/ProductTableMobile";
import ProductTableDesktop from "./components/ProductTableDesktop";
import EditProductForm from "../../../../component/EditProductForm";
import ConfirmDialog from "./components/ConfirmDialog";
import ProductsPagination from "../../../MegaProductsPage/components/products/ProductsPagination";
import { Product } from "../../../../types/product.type";

const ITEMS_PER_PAGE = 10;

const ProductTable: React.FC = () => {
  const { products, updateProducts } = useStoreContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.categories?.some((cat) =>
          cat.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
  }, [products, searchTerm]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handleDelete = async () => {
    if (!productToDelete) return;

    try {
      setIsLoading(true);
      await productService.delete(productToDelete);
      updateProducts(products.filter((p) => p.id !== productToDelete));
      toast.success("تم حذف المنتج بنجاح!");
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("حدث خطأ أثناء حذف المنتج");
    } finally {
      setIsLoading(false);
      setProductToDelete(null);
    }
  };

  const handleSave = async (data: {
    _id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    discount: number;
    discountEndDate?: string;
    categories?: string[];
    tags?: string[];
    images: { public_id?: string; url: string; altText?: string }[];
    newImages?: File[];
    dimensions?: Dimension[];
    imagesToDelete?: string[];
  }) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      // Append basic fields
      formData.append("_id", data._id);
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price.toString());
      formData.append("stock", data.stock.toString());

      // Append optional fields
      formData.append("discount", data.discount.toString() || "");
      if (data.discountEndDate)
        formData.append("discountEndDate", data.discountEndDate);

      if (data.categories) {
        data.categories.forEach((cat) => formData.append("categories[]", cat));
      }

      if (data.tags) {
        data.tags.forEach((tag) => formData.append("tags[]", tag));
      }

      if (data.dimensions?.length) {
        data.dimensions.forEach((dimension, index) => {
          formData.append(
            `dimensions[${index}][size][width]`,
            dimension.size.width.toString()
          );
          formData.append(
            `dimensions[${index}][size][height]`,
            dimension.size.height.toString()
          );
          formData.append(
            `dimensions[${index}][size][label]`,
            dimension.size.label
          );
          formData.append(
            `dimensions[${index}][price]`,
            dimension.price.toString()
          );
          formData.append(
            `dimensions[${index}][stock]`,
            dimension.stock.toString()
          );
          formData.append(
            `dimensions[${index}][isAvailable]`,
            dimension.isAvailable.toString()
          );
        });
      }

      // Handle images
      if (data.newImages) {
        data.newImages.forEach((image) => formData.append("newImages", image));
      }
      if (data.imagesToDelete) {
        data.imagesToDelete.forEach((id) =>
          formData.append("imagesToDelete[]", id)
        );
      }
      const updatedProduct = await productService.update(data._id, formData);
      updateProducts(
        products.map((p) => (p.id === data._id ? updatedProduct : p))
      );
      setEditingProduct(null);
      toast.success("تم تحديث المنتج بنجاح!");
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("حدث خطأ أثناء تحديث المنتج");
    } finally {
      setIsLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      <ProductSearch
        searchTerm={searchTerm}
        onSearchChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
        onClearSearch={clearSearch}
      />

      <ProductTableMobile
        products={paginatedProducts}
        onEdit={setEditingProduct}
        onDelete={setProductToDelete}
      />

      <ProductTableDesktop
        products={paginatedProducts}
        onEdit={setEditingProduct}
        onDelete={setProductToDelete}
      />

      {filteredProducts.length > ITEMS_PER_PAGE && (
        <div className="flex justify-center">
          <ProductsPagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)}
            onPageChange={setCurrentPage}
          />
        </div>
      )}

      {editingProduct && (
        <EditProductForm
          product={{ ...editingProduct, _id: editingProduct.id }}
          onSave={handleSave}
          onCancel={() => setEditingProduct(null)}
        />
      )}

      <ConfirmDialog
        isOpen={!!productToDelete}
        onClose={() => setProductToDelete(null)}
        onConfirm={handleDelete}
        title="حذف المنتج"
        message="هل أنت متأكد من أنك تريد حذف هذا المنتج؟ لا يمكن التراجع عن هذا الإجراء."
        confirmText="نعم، احذف"
        cancelText="إلغاء"
        confirmVariant="danger"
        isLoading={isLoading}
      />
    </div>
  );
};

export default ProductTable;
