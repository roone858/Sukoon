import React, { useState } from "react";
import { toast } from "react-toastify";
import { useStoreContext } from "../../context/useContext/useStoreContext";
import productService from "../../services/products.service";
import EditProductForm from "../EditProductForm";
import { Product } from "../../util/types";
import LoadingPage from "../../pages/LoadingPage";

const ProductTable: React.FC = () => {
  const { products, updateProducts } = useStoreContext();
  const [isLoading, setIsLoading] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleDelete = (id: string) => {
    toast.info(
      <div className="text-right">
        <p>هل أنت متأكد من أنك تريد حذف هذا المنتج؟</p>
        <div className="flex justify-end gap-2 mt-3">
          <button
            onClick={async () => {
              await productService.delete(id);
              updateProducts(products.filter((p) => p.id !== id));
              toast.dismiss();
              toast.success("تم حذف المنتج بنجاح!");
            }}
            className="bg-red-500 text-white px-4 py-1.5 rounded-md text-sm"
          >
            نعم
          </button>
          <button
            onClick={() => toast.dismiss()}
            className="bg-gray-500 text-white px-4 py-1.5 rounded-md text-sm"
          >
            لا
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeButton: false,
        draggable: false,
      }
    );
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
  };

  const handleSave = async (data: {
    _id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    discount?: number;
    discountEndDate?: string;
    categories?: string[];
    tags?: string[];
    images: { public_id?: string; url: string; altText?: string }[];
    newImages?: File[];
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

      // Append optional fields if they exist
      if (data.discount) {
        formData.append("discount", data.discount.toString());
      }
      if (data.discountEndDate) {
        formData.append("discountEndDate", data.discountEndDate);
      }
      if (data.categories) {
        data.categories.forEach((cat) => {
          formData.append("categories[]", cat);
        });
      }
      if (data.tags) {
        data.tags.forEach((tag) => {
          formData.append("tags[]", tag);
        });
      }

      // Append new images
      if (data.newImages) {
        data.newImages.forEach((image) => {
          formData.append("newImages", image);
        });
      }

      // Append images to delete
      if (data.imagesToDelete) {
        data.imagesToDelete.forEach((id) => {
          formData.append("imagesToDelete[]", id);
        });
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
  const handleCancel = () => {
    setEditingProduct(null);
  };
  if (isLoading) return <LoadingPage />;
  return (
    <div className="relative">
      {/* Mobile view - Cards */}
      <div className="sm:hidden space-y-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-start gap-3">
              <img
                className="w-16 h-16 object-cover rounded"
                src={product?.images[0]?.url || "/placeholder-product.png"}
                alt={product?.name}
              />
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {product?.name || "بدون اسم"}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {product?.description?.slice(0, 50) || "بدون وصف"}...
                </p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm font-medium">
                    {product?.price} ر.س
                  </span>
                  {product?.discount && product?.discount > 0 && (
                    <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-1 rounded">
                      {product?.discount}% خصم
                    </span>
                  )}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-xs bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300 px-2 py-1 rounded"
                    >
                      تعديل
                    </button>
                    <button
                      onClick={() => handleDelete(product?.id)}
                      className="text-xs bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-300 px-2 py-1 rounded"
                    >
                      حذف
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop view - Table */}
      <div className="hidden sm:block overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-right rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-4 py-3">
                اسم المنتج
              </th>
              <th scope="col" className="px-4 py-3">
                الوصف
              </th>
              <th scope="col" className="px-4 py-3">
                الفئة
              </th>
              <th scope="col" className="px-4 py-3">
                السعر
              </th>
              <th scope="col" className="px-4 py-3">
                الكمية
              </th>
              <th scope="col" className="px-4 py-3">
                الإجراء
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr
                key={product?.id}
                className={`${
                  index % 2 === 0
                    ? "bg-white dark:bg-gray-900"
                    : "bg-gray-50 dark:bg-gray-800"
                } border-b dark:border-gray-700`}
              >
                <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                  <div className="flex items-center justify-start">
                    <img
                      className="w-8 h-8 ml-2 rounded"
                      src={product.images[0]?.url || "/placeholder-product.png"}
                      alt={product.name}
                    />
                    {product.name || "بدون اسم"}
                    {product.discount && product.discount > 0 && (
                      <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-1.5 py-0.5 rounded mr-2">
                        {product.discount}%
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  {product.description?.slice(0, 30) || "بدون وصف"}...
                </td>
                <td className="px-4 py-3">
                  {product.categories?.join("، ") || "-"}
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-col">
                    <span>{product.price} ر.س</span>
                    {product.discount && product.discount > 0 && (
                      <span className="text-xs text-green-600 dark:text-green-400">
                        {Math.round(
                          product.price * (1 - product.discount / 100)
                        )}{" "}
                        ر.س بعد الخصم
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">{product.stock || 0}</td>
                <td className="px-4 py-3 space-x-2 space-x-reverse">
                  <button
                    onClick={() => handleEdit(product)}
                    className="font-medium text-purple-600 dark:text-purple-500 hover:underline text-sm"
                  >
                    تعديل
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="font-medium text-red-600 dark:text-red-500 hover:underline text-sm"
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingProduct && (
        <EditProductForm
          product={editingProduct}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default ProductTable;
