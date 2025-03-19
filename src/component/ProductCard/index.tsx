import { Link } from "react-router-dom";
import { useStoreContext } from "../../context/useContext/useStoreContext";
import { Product } from "../../util/types";
import { toast } from "react-toastify";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="max-w-sm bg-white border-0 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 dark:bg-gray-800 overflow-hidden flex flex-col ">
      {" "}
      {/* ارتفاع ثابت للبطاقة */}
      {/* Product Image */}
      <Link to={"/products/" + product.id} className="block flex-shrink-0 p-2">
        <img
          className=" mx-auto h-38  rounded-t-lg" // ارتفاع ثابت للصور
          src={product.image}
          alt={product.title}
        />
      </Link>
      {/* Product Details */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Product Title */}
        <Link to={"/products/" + product.id} className="flex-grow">
          <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white line-clamp-2">
            {product.title}
          </h5>
        </Link>

        {/* Product Description */}
        <p className="mb-4 text-sm text-gray-600 dark:text-gray-400 line-clamp-3 flex-grow">
          {product.description}
        </p>
        {/* Add to Cart Button */}
        <AddButton product={product} />
      </div>
    </div>
  );
};

export default ProductCard;

export const AddButton = ({ product }: { product: Product }) => {
  const { cart, updateCart } = useStoreContext();

  const handleAddToCart = () => {
    const found = cart.find((item) => item.id === product.id);
    if (found?.id) {
      toast.info("تمت الإضافة إلى السلة!");
    } else {
      updateCart([...cart, product]);
    }
  };
  return (
    <div
      onClick={handleAddToCart}
      className="inline-flex group cursor-pointer items-center justify-center w-full px-4 py-2 text-sm font-medium text-center text-purple-700 border border-purple-700 rounded-lg hover:bg-purple-700 active:bg-purple-700 hover:text-white active:text-white focus:ring-4 focus:outline-none focus:ring-purple-300 transition-all duration-300 dark:border-purple-600 dark:text-purple-600 dark:hover:bg-purple-600 dark:hover:text-white dark:active:bg-purple-600 dark:active:text-white dark:focus:ring-purple-800"
    >
      <button
        className="flex items-center justify-center cursor-pointer   w-full"
        aria-label="Add to cart"
      >
        {/* Cart Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15H11C8.17157 15 6.75736 15 5.87868 14.1213C5 13.2426 5 11.8284 5 9V5C5 3.89543 4.10457 3 3 3M10 19.5C10 20.3284 9.32843 21 8.5 21C7.67157 21 7 20.3284 7 19.5C7 18.6716 7.67157 18 8.5 18C9.32843 18 10 18.6716 10 19.5ZM18 19.5C18 20.3284 17.3284 21 16.5 21C15.6716 21 15 20.3284 15 19.5C15 18.6716 15.6716 18 16.5 18C17.3284 18 18 18.6716 18 19.5ZM12.5 11H16.5C17.9045 11 18.6067 11 19.1111 10.6629C19.3295 10.517 19.517 10.3295 19.6629 10.1111C20 9.60669 20 8.90446 20 7.5C20 6.09554 20 5.39331 19.6629 4.88886C19.517 4.67048 19.3295 4.48298 19.1111 4.33706C18.6067 4 17.9045 4 16.5 4H12.5C11.0955 4 10.3933 4 9.88886 4.33706C9.67048 4.48298 9.48298 4.67048 9.33706 4.88886C9 5.39331 9 6.09554 9 7.5C9 8.90446 9 9.60669 9.33706 10.1111C9.48298 10.3295 9.67048 10.517 9.88886 10.6629C10.3933 11 11.0955 11 12.5 11Z" />
        </svg>
        {/* Button Text */}
        <span>اضافة الى السلة</span>
      </button>
    </div>
  );
};
