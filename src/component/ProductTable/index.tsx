import React, { useState } from "react";
import { toast } from "react-toastify";
import { useStoreContext } from "../../context/useContext/useStoreContext";
import productService from "../../services/products.service";
import EditProductForm from "../EditProductForm";
import { Product } from "../../util/types";

const ProductTable: React.FC = () => {
  const { products, updateProducts } = useStoreContext();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleDelete = (id: string) => {
    toast.info(
      <div className="text-right">
        <p>هل أنت متأكد من أنك تريد حذف هذا المنتج؟</p>
        <div className="flex justify-end gap-2 mt-3">
          <button
            onClick={async () => {
              await productService.delete(id);
              updateProducts(products.filter((p) => p._id !== id));
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

  const handleSave = async (updatedProduct: {
    _id: string;
    name: string;
    description: string;
    category: string;
    price: number;
    images: string[];
    newImages: File[];
  }) => {
    try {
      const formData = new FormData();
      formData.append("name", updatedProduct.name);
      formData.append("description", updatedProduct.description);
      formData.append("category", updatedProduct.category);
      formData.append("price", updatedProduct.price.toString());

      updatedProduct.images.forEach((image, index) => {
        formData.append(`images[${index}]`, image);
      });

      updatedProduct.newImages.forEach((image) => {
        formData.append("newImages", image);
      });

      const updatedProductApi = await productService.update(
        updatedProduct._id,
        formData
      );
      updateProducts([...products, updatedProductApi]);

      setEditingProduct(null);
      toast.success("تم تحديث المنتج بنجاح!");
    } catch {
      toast.error("حدث خطأ أثناء تحديث المنتج");
    }
  };

  const handleCancel = () => {
    setEditingProduct(null);
  };

  return (
    <div className="relative">
      {/* Mobile view - Cards */}
      <div className="sm:hidden space-y-3">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-start gap-3">
              <img
                className="w-16 h-16 object-cover rounded"
                src={product.images[0] || "/placeholder-product.png"}
                alt={product.name}
              />
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {product.name || "بدون اسم"}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {product.description?.slice(0, 50) || "بدون وصف"}...
                </p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm font-medium">
                    {product.price} ر.س
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-xs bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300 px-2 py-1 rounded"
                    >
                      تعديل
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
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
                الإجراء
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr
                key={product._id}
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
                      src={product.images[0] || "/placeholder-product.png"}
                      alt={product.name}
                    />
                    {product.name || "بدون اسم"}
                  </div>
                </td>
                <td className="px-4 py-3">
                  {product.description?.slice(0, 30) || "بدون وصف"}...
                </td>
                <td className="px-4 py-3">{product.category || "-"}</td>
                <td className="px-4 py-3">{product.price} ر.س</td>
                <td className="px-4 py-3 space-x-2 space-x-reverse">
                  <button
                    onClick={() => handleEdit(product)}
                    className="font-medium text-purple-600 dark:text-purple-500 hover:underline text-sm"
                  >
                    تعديل
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
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
