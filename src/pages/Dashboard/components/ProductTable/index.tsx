import React, { useState } from "react";
import { toast } from "react-toastify";
import { useStoreContext } from "../../../../context/useContext/useStoreContext";
import productService from "../../../../services/products.service";
import EditProductForm from "../../../../component/EditProductForm";
import { Product } from "../../../../util/types";
import LoadingPage from "../../../LoadingPage";
import { Dimension } from "../../../AddProduct/components/types";
import { FiEdit2, FiTrash2, FiPackage, FiTag, FiDollarSign, FiBox } from "react-icons/fi";

const ProductTable: React.FC = () => {
  const { products, updateProducts } = useStoreContext();
  const [isLoading, setIsLoading] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = (id: string) => {
    toast.info(
      <div className="text-right">
        <p className="text-gray-700 dark:text-gray-200">هل أنت متأكد من أنك تريد حذف هذا المنتج؟</p>
        <div className="flex justify-end gap-2 mt-3">
          <button
            onClick={async () => {
              try {
                setIsLoading(true);
                await productService.delete(id);
                updateProducts(products.filter((p) => p.id !== id));
                toast.dismiss();
                toast.success("تم حذف المنتج بنجاح!");
              } catch (error) {
                console.error("Error deleting product:", error);
                toast.error("حدث خطأ أثناء حذف المنتج");
              } finally {
                setIsLoading(false);
              }
            }}
            className="bg-red-500 text-white px-4 py-1.5 rounded-md text-sm hover:bg-red-600 transition-colors"
          >
            نعم
          </button>
          <button
            onClick={() => toast.dismiss()}
            className="bg-gray-500 text-white px-4 py-1.5 rounded-md text-sm hover:bg-gray-600 transition-colors"
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
      if (data.dimensions && data.dimensions.length > 0) {
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

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="بحث عن منتج..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiPackage className="h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Mobile View - Cards */}
      <div className="sm:hidden space-y-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-4 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-start gap-4">
              <img
                className="w-20 h-20 rounded-lg object-cover"
                src={product.images[0]?.url || "/placeholder.png"}
                alt={product.name}
              />
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {product.categories?.map((category) => (
                    <span
                      key={category}
                      className="text-xs px-2 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300"
                    >
                      {category}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center mt-3">
                  <div className="flex items-center gap-2">
                    <FiDollarSign className="text-green-500" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {product.price} ر.س
                    </span>
                    {product.discount && product.discount > 0 && (
                      <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-1 rounded">
                        {product.discount}% خصم
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <FiBox className="text-gray-400" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {product.stock || 0}
                    </span>
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-3">
                  <button
                    onClick={() => handleEdit(product)}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
                  >
                    <FiEdit2 className="w-4 h-4 ml-1" />
                    تعديل
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                  >
                    <FiTrash2 className="w-4 h-4 ml-1" />
                    حذف
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View - Table */}
      <div className="hidden sm:block overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-right rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-4 py-3">
                <div className="flex items-center">
                  <FiPackage className="w-4 h-4 ml-2" />
                  اسم المنتج
                </div>
              </th>
              <th scope="col" className="px-4 py-3">
                <div className="flex items-center">
                  <FiTag className="w-4 h-4 ml-2" />
                  الفئة
                </div>
              </th>
              <th scope="col" className="px-4 py-3">
                <div className="flex items-center">
                  <FiDollarSign className="w-4 h-4 ml-2" />
                  السعر
                </div>
              </th>
              <th scope="col" className="px-4 py-3">
                <div className="flex items-center">
                  <FiBox className="w-4 h-4 ml-2" />
                  الكمية
                </div>
              </th>
              <th scope="col" className="px-4 py-3">
                الإجراء
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product, index) => (
              <tr
                key={product.id}
                className={`${
                  index % 2 === 0
                    ? "bg-white dark:bg-gray-900"
                    : "bg-gray-50 dark:bg-gray-800"
                } border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors`}
              >
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <img
                      className="w-8 h-8 ml-3 rounded-lg object-cover"
                      src={product.images[0]?.url || "/placeholder.png"}
                      alt={product.name}
                    />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {product.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                        {product.description}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {product.categories?.map((category) => (
                      <span
                        key={category}
                        className="text-xs px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {product.price} ر.س
                    </span>
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
                <td className="px-4 py-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                    {product.stock || 0}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
                    >
                      <FiEdit2 className="w-4 h-4 ml-1" />
                      تعديل
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                    >
                      <FiTrash2 className="w-4 h-4 ml-1" />
                      حذف
                    </button>
                  </div>
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
