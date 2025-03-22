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
      <div>
        <p>هل أنت متأكد من أنك تريد حذف هذا المنتج؟</p>
        <div className="flex justify-end mt-2">
          <button
            onClick={async () => {
              await productService.delete(id);
              updateProducts(products.filter((p) => p._id !== id));
              toast.dismiss();
              toast.success("تم حذف المنتج بنجاح!");
            }}
            className="bg-red-500 text-white px-3 py-1 rounded-md mr-2"
          >
            نعم
          </button>
          <button
            onClick={() => toast.dismiss()}
            className="bg-gray-500 text-white px-3 py-1 rounded-md"
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
    console.log(formData.entries());
    console.log(updatedProduct);
    const res = await productService.update(updatedProduct._id, formData);
    // setProducts(
    //   products.map((product) =>
    //     product._id === editingProduct?._id
    //       ? { ...product, ...updatedProduct }
    //       : product
    //   )
    // );
    console.log(res);
    setEditingProduct(null);
    toast.success("تم تحديث المنتج بنجاح!");
  };

  const handleCancel = () => {
    setEditingProduct(null);
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-right rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              اسم المنتج
            </th>
            <th scope="col" className="px-6 py-3">
              الوصف
            </th>
            <th scope="col" className="px-6 py-3">
              الفئة
            </th>
            <th scope="col" className="px-6 py-3">
              السعر
            </th>
            <th scope="col" className="px-6 py-3">
              الإجراء
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0
                  ? "bg-white dark:bg-gray-900"
                  : "bg-gray-50 dark:bg-gray-800"
              } border-b dark:border-gray-700 border-gray-200`}
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                <div className="flex items-center">
                  <img
                    className="w-10 h-10 ml-2"
                    src={product.images[0]}
                    alt=""
                  />
                  {product.name
                    ? product.name.slice(0, 20) + "..."
                    : "No title"}
                </div>
              </th>
              <td className="px-6 py-4">
                {product.description
                  ? product.description.slice(0, 20) + "..."
                  : "No description"}
              </td>
              <td className="px-6 py-4">{product.category}</td>
              <td className="px-6 py-4">{product.price}</td>
              <td className="px-6 py-4">
                <button
                  onClick={() => handleEdit(product)}
                  className="font-medium cursor-pointer text-purple-600 dark:text-purple-500 hover:underline"
                >
                  تعديل
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="font-medium cursor-pointer text-red-600 dark:text-red-500 hover:underline"
                >
                  حذف
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
