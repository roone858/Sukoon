import { ProductFormValues } from "../../../components/ProductForm/types";
import { ProductForm } from "../../../components/ProductForm";
import productService from "../../../services/products.service";
import { useState } from "react";
import { toast } from "react-toastify";

const AddProduct = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (data: ProductFormValues) => {
    setIsSubmitting(true);
    const formData = new FormData();

    // Append basic fields
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price.toString());
    formData.append("stock", data.stock.toString());

    // Append optional fields
    if (data.discount) formData.append("discount", data.discount.toString());
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
    if (data.images) {
      data.images.forEach((image) => formData.append("images", image));
    }

    await productService.addProduct(formData);
    toast.success("تم إضافة المنتج بنجاح");
    setIsSubmitting(false);
  };

  return <ProductForm isSubmitting={isSubmitting} onSubmit={handleSubmit} />;
};

export default AddProduct;

// Add this to your global CSS
// .react-select-container .react-select__control {
//   border: 1px solid #d1d5db;
//   min-height: 42px;
// }
// .react-select-container .react-select__control--is-focused {
//   border-color: #8b5cf6;
//   box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.2);
// }
// .react-select-container.react-select-error .react-select__control {
//   border-color: #ef4444;
// }
// .react-select-container .react-select__multi-value {
//   background-color: #f3e8ff;
// }
// .react-select-container .react-select__multi-value__label {
//   color: #7e22ce;
// }
