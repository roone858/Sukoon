import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import React, { useState, useCallback, useMemo } from "react";
import { toast } from "react-toastify";
import LoadingPage from "../LoadingPage";
import productService from "../../services/products.service";
import { useStoreContext } from "../../context/useContext/useStoreContext";
import {
  AvailableDimension,
  FormDataState,
  ImagePreview,
} from "./components/types";
import {
  MAX_CATEGORIES,
  MAX_TAGS,
  MAX_SIZES,
  VALID_IMAGE_TYPES,
  MAX_IMAGE_SIZE,
} from "./components/constants";
import ProductFormFields from "./components/ProductFormFields";

const AddProduct = () => {
  // State
  const [formData, setFormData] = useState<FormDataState>({
    name: "",
    description: "",
    price: "",
    stock: "",
    discount: "0",
    discountEndDate: "",
    sizes: [],
    categories: [],
    dimensions: [],
    tags: [],
  });

  const { products, updateProducts } = useStoreContext();
  const [productImages, setProductImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<ImagePreview[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentCategoryInput, setCurrentCategoryInput] = useState<string>("");
  const [currentTagInput, setCurrentTagInput] = useState<string>("");
  const navigate = useNavigate();

  // Computed values
  const discountedPrice = useMemo(() => {
    if (Number(formData.discount) > 0 && Number(formData.price) > 0) {
      return Number(formData.price) * (1 - Number(formData.discount) / 100);
    }
    return null;
  }, [formData.price, formData.discount]);

  // Handlers
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    []
  );

  const handleRemoveItem = useCallback(
    (type: "categories" | "tags" | "sizes") => (itemToRemove: string) => {
      setFormData((prev) => ({
        ...prev,
        [type]: prev[type].filter((item) => item !== itemToRemove),
      }));
    },
    []
  );

  const handleAddItem = useCallback(
    (type: "categories" | "tags" | "sizes", value?: string) => {
      const currentInput =
        type === "categories"
          ? currentCategoryInput
          : type === "tags"
          ? currentTagInput
          : value || "";
      const currentItems = formData[type];
      const maxItems =
        type === "categories"
          ? MAX_CATEGORIES
          : type === "tags"
          ? MAX_TAGS
          : MAX_SIZES;

      if (!currentInput || currentItems.includes(currentInput)) return;

      if (currentItems.length >= maxItems) {
        toast.warning(
          `يمكنك إضافة ${maxItems} ${
            type === "categories"
              ? "فئات"
              : type === "tags"
              ? "علامات"
              : "مقاسات"
          } كحد أقصى`
        );
        return;
      }

      setFormData((prev) => ({
        ...prev,
        [type]: [...prev[type], currentInput],
      }));

      if (type === "categories") {
        setCurrentCategoryInput("");
      } else if (type === "tags") {
        setCurrentTagInput("");
      }
    },
    [currentCategoryInput, currentTagInput, formData]
  );

  const handleSizeSelection = useCallback(
    (size: string) => {
      if (formData.sizes.includes(size)) {
        handleRemoveItem("sizes")(size);
      } else {
        handleAddItem("sizes", size);
      }
    },
    [formData.sizes, handleAddItem, handleRemoveItem]
  );

  const handleImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files || e.target.files.length === 0) return;

      const files = Array.from(e.target.files);
      const validFiles: File[] = [];
      const newPreviews: ImagePreview[] = [];

      files.forEach((file) => {
        if (!VALID_IMAGE_TYPES.includes(file.type)) {
          toast.warning(`تم تخطي ${file.name}: نوع الملف غير مدعوم`);
          return;
        }

        if (file.size > MAX_IMAGE_SIZE) {
          toast.warning(
            `تم تخطي ${file.name}: حجم الملف كبير جداً (الحد الأقصى 5MB)`
          );
          return;
        }

        validFiles.push(file);
        newPreviews.push({
          url: URL.createObjectURL(file),
          name: file.name,
        });
      });

      // Clean up previous previews
      imagePreviews.forEach((preview) => URL.revokeObjectURL(preview.url));

      setProductImages(validFiles);
      setImagePreviews(newPreviews);
    },
    [imagePreviews]
  );
  const handleDimensionSelection: (dimension: AvailableDimension) => void = (
    dimension
  ) => {
    if (!formData.dimensions.some((d) => d.size.label === dimension.label)) {
      setFormData({
        ...formData,
        dimensions: [
          ...formData.dimensions,
          {
            size: {
              width: dimension.width,
              height: dimension.height,
              label: dimension.label,
            },
            price: 0,
            stock: 0,
            isAvailable: true,
          },
        ],
      });
    }
  };

  const handleDimensionPriceChange: (index: number, value: string) => void = (
    index,
    value
  ) => {
    const newDimensions = [...formData.dimensions];
    newDimensions[index].price = parseFloat(value) || 0;
    setFormData({ ...formData, dimensions: newDimensions });
  };

  const handleDimensionStockChange: (index: number, value: string) => void = (
    index,
    value
  ) => {
    const newDimensions = [...formData.dimensions];
    newDimensions[index].stock = parseInt(value) || 0;
    setFormData({ ...formData, dimensions: newDimensions });
  };

  const handleRemoveDimension: (index: number) => void = (index) => {
    const newDimensions = [...formData.dimensions];
    newDimensions.splice(index, 1);
    setFormData({ ...formData, dimensions: newDimensions });
  };
  const validateForm = () => {
    const price = Number(formData.price);
    const stock = Number(formData.stock);
    const discount = Number(formData.discount);

    // Required fields validation
    if (
      !formData.name ||
      !formData.description ||
      isNaN(price) ||
      isNaN(stock) ||
      formData.categories.length === 0 ||
      productImages.length === 0
    ) {
      toast.error("يرجى ملء جميع الحقول المطلوبة");
      return false;
    }

    // Price validation
    if (price <= 0) {
      toast.error("يرجى إدخال سعر صحيح (أكبر من 0)");
      return false;
    }

    // Stock validation
    if (stock < 0) {
      toast.error("يرجى إدخال كمية مخزون صحيحة (0 أو أكثر)");
      return false;
    }

    // Discount validation
    if (isNaN(discount) || discount < 0 || discount > 100) {
      toast.error("نسبة الخصم يجب أن تكون بين 0 و 100");
      return false;
    }

    // Discount end date validation
    if (discount > 0 && !formData.discountEndDate) {
      toast.error("يرجى تحديد تاريخ انتهاء الخصم");
      return false;
    }

    return true;
  };

  const prepareFormData = () => {
    const formDataToSend = new FormData();
    const price = Number(formData.price);
    const stock = Number(formData.stock);
    const discount = Number(formData.discount);

    // Append simple fields
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("price", price.toString());
    formDataToSend.append("stock", stock.toString());
    formDataToSend.append("discount", discount.toString());
    formData.dimensions.forEach((dimension, index) => {
      formDataToSend.append(
        `dimensions[${index}][size][width]`,
        dimension.size.width.toString()
      );
      formDataToSend.append(
        `dimensions[${index}][size][height]`,
        dimension.size.height.toString()
      );
      formDataToSend.append(
        `dimensions[${index}][size][label]`,
        dimension.size.label
      );
      formDataToSend.append(
        `dimensions[${index}][price]`,
        dimension.price.toString()
      );
      formDataToSend.append(
        `dimensions[${index}][stock]`,
        (dimension.stock || 0).toString()
      );
    });

    if (discount > 0) {
      formDataToSend.append("discountEndDate", formData.discountEndDate);
    }

    formData.categories.forEach((cat) =>
      formDataToSend.append("categories[]", cat)
    );

    formData.tags.forEach((tag) => formDataToSend.append("tags[]", tag));

    productImages.forEach((image) => formDataToSend.append("images", image));

    return formDataToSend;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const formDataToSend = prepareFormData();
      console.log(formDataToSend.get("dimensions[]"));
      const newProduct = await productService.addProduct(formDataToSend);

      if (newProduct) {
        updateProducts([newProduct, ...products]);
        toast.success("تم إضافة المنتج بنجاح");
        navigate("/products");
      }
    } catch (err) {
      handleSubmissionError(err);
    } finally {
      cleanup();
    }
  };

  const handleSubmissionError = (err: unknown) => {
    console.error("Error adding product:", err);
    let errorMessage = "حدث خطأ أثناء إضافة المنتج";

    if (err instanceof Error) {
      errorMessage = err.message;
    } else if (typeof err === "object" && err !== null && "response" in err) {
      const axiosError = err as {
        response?: { data?: { message?: string } };
      };
      errorMessage = axiosError.response?.data?.message || errorMessage;
    }

    toast.error(errorMessage);
  };

  const cleanup = () => {
    setIsLoading(false);
    imagePreviews.forEach((preview) => URL.revokeObjectURL(preview.url));
  };

  if (isLoading) return <LoadingPage />;

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        {/* Form Section */}
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div>
            <img src={logo} className="w-32 mx-auto" alt="Logo" />
          </div>
          <div className="mt-2 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">
              إضافة منتج جديد
            </h1>
            <div className="w-full flex-1 mt-8">
              <form onSubmit={handleSubmit} className="mx-auto max-w-xs">
                <ProductFormFields
                  formData={formData}
                  handleInputChange={handleInputChange}
                  handleSizeSelection={handleSizeSelection}
                  handleRemoveItem={handleRemoveItem}
                  currentCategoryInput={currentCategoryInput}
                  setCurrentCategoryInput={setCurrentCategoryInput}
                  currentTagInput={currentTagInput}
                  setCurrentTagInput={setCurrentTagInput}
                  handleAddItem={handleAddItem}
                  handleDimensionSelection={handleDimensionSelection}
                  handleDimensionPriceChange={handleDimensionPriceChange}
                  handleDimensionStockChange={handleDimensionStockChange}
                  handleRemoveDimension={handleRemoveDimension}
                  handleImageChange={handleImageChange}
                  discountedPrice={discountedPrice}
                  imagePreviews={imagePreviews}
                  isLoading={isLoading}
                />

                {/* Back Link */}
                <p className="mt-6 text-xs text-gray-600 text-center">
                  <Link
                    to="/products"
                    className="border-b border-gray-500 border-dotted hover:text-purple-800"
                  >
                    العودة إلى قائمة المنتجات
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* Illustration Section */}
        <div className="flex-1 bg-purple-100 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
