import React from "react";
import { FiEdit2, FiTrash2, FiDollarSign, FiBox } from "react-icons/fi";

import { Product } from "../../../../../util/types";
import Badge from "./Badge";
import Button from "./Button";

interface ProductTableMobileProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

const ProductTableMobile: React.FC<ProductTableMobileProps> = ({
  products,
  onEdit,
  onDelete,
}) => {
  if (products.length === 0) {
    return (
      <div className="sm:hidden text-center py-8 text-gray-500 dark:text-gray-400">
        لا توجد منتجات متطابقة مع بحثك
      </div>
    );
  }

  return (
    <div className="sm:hidden space-y-3">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white p-2 xs:p-3 sm:p-4   dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200  border border-gray-200 dark:border-gray-700"
        >
          <div className="flex   items-start   gap-4">
            <img
              className="w-15 h-15  xs:w-20 xs:h-20 rounded-lg object-cover"
              src={product.images[0]?.url || "/placeholder.png"}
              alt={product.name}
            />
            <div className="flex-1">
              <h3 className="text-xs xs:text-sm  font-medium text-gray-900 dark:text-white">
              {product.name.slice(0,25)  }{product.name.length > 25 && "..."}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
              {product.description.slice(0,25)  }{product.description.length > 25 && "..."}
              </p>
              <div className="flex flex-wrap gap-1 mt-2">
                {product.categories?.map((category) => (
                  <Badge key={category} variant="purple">
                    {category}
                  </Badge>
                ))}
              </div>
              <div className="flex justify-between items-center mt-3">
                <div className="flex items-center gap-2">
                  <FiDollarSign className="text-green-500" />
                  <span className="text-xs font-medium text-gray-900 dark:text-white">
                    {product.price} ر.س
                  </span>
                  {product.discount && product.discount > 0 && (
                    <Badge  variant="green">{product.discount}% خصم</Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <FiBox className="text-gray-400" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {product.stock || 0}
                  </span>
                </div>
              </div>
              <div className="flex justify-center xs:justify-end gap-2 mt-3">
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
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductTableMobile;
