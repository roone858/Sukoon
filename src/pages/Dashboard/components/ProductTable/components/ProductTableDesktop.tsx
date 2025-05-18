import React from "react";
import { FiEdit2, FiTrash2, FiPackage, FiTag, FiDollarSign, FiBox } from "react-icons/fi";
import Button from "./Button";
import Badge from "./Badge";
import { Product } from "../../../../../types/product.type";


interface ProductTableDesktopProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

const ProductTableDesktop: React.FC<ProductTableDesktopProps> = ({
  products,
  onEdit,
  onDelete,
}) => {
  if (products.length === 0) {
    return (
      <div className="hidden sm:block bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          لا توجد منتجات متطابقة مع بحثك
        </div>
      </div>
    );
  }

  return (
    <div className="hidden sm:block bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                <div className="flex items-center justify-start">
                  <FiPackage className="ml-2" />
                  المنتج
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                <div className="flex items-center justify-start">
                  <FiTag className="ml-2" />
                  الفئات
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                <div className="flex items-center justify-start">
                  <FiDollarSign className="ml-2" />
                  السعر
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                <div className="flex items-center justify-start">
                  <FiBox className="ml-2" />
                  المخزون
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                الإجراءات
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center justify-start">
                    <img
                      className="w-10 h-10 ml-3 rounded-lg object-cover"
                      src={product.images[0]?.url || "/placeholder.webp"}
                      alt={product.name}
                    />
                    <div className="text-right">
                      <div className="font-medium text-gray-900 dark:text-white">
                      {product.name.slice(0,25)  }{product.name.length > 25 && "..."}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                        {product.description.slice(0,25)  }{product.description.length > 25 && "..."}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-wrap gap-1 justify-start">
                    {product.categories?.map((category) => (
                      <Badge key={category} variant="purple">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-right">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {product.price} ر.س
                    </span>
                    {product.discount && product.discount > 0 && (
                      <div className="text-xs text-green-600 dark:text-green-400">
                        {Math.round(product.price * (1 - product.discount / 100))} ر.س بعد الخصم
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge variant={product.stock && product?.stock > 0 ? "default" : "danger"}>
                    {product.stock || 0} متوفر
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-start gap-2">
                    <Button
                      onClick={() => onEdit(product)}
                      variant="primary"
                      size="sm"
                      icon={<FiEdit2 className="ml-1" />}
                    >
                      تعديل
                    </Button>
                    <Button
                      onClick={() => onDelete(product.id)}
                      variant="danger"
                      size="sm"
                      icon={<FiTrash2 className="ml-1" />}
                    >
                      حذف
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTableDesktop;