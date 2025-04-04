import { motion } from "framer-motion";
import {
  IoHeartOutline,
  IoTrashOutline,
  IoCartOutline,
  IoArrowForward,
} from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import wishlistService from "../../services/wishlist.service";
import { useStoreContext } from "../../context/hooks/useStoreContext";
import { Product } from "../../util/types";
import withAuth from "../../HOC/withAuth";

const WishListPage = () => {
  const { products, wishlist, updateWishlist } = useStoreContext();
  const navigate = useNavigate();

  const removeFromWishlist = async (id: string) => {
    await wishlistService.removeFromWishlist(id);
    updateWishlist(wishlist.filter((item) => item !== id));
  };

  const addToCart = (product: Product) => {
    // TODO: Implement add to cart functionality
    console.log("Adding to cart:", product);
  };


  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-3 xs:px-4 py-6">
        {/* Header with back button */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full bg-white shadow-xs hover:bg-gray-100 mr-2"
          >
            <IoArrowForward className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-2xl xs:text-3xl font-bold text-gray-800 flex-1 text-center">
            المفضلة
          </h1>
        </div>

        {wishlist.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-6">
              <IoHeartOutline className="w-8 h-8 text-purple-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-700 mb-3">
              قائمة المفضلة فارغة
            </h2>
            <p className="text-gray-500 mb-8 max-w-xs mx-auto">
              لم تقم بإضافة أي منتجات إلى المفضلة بعد
            </p>
            <button
              onClick={() => navigate("/products")}
              className="bg-gradient-to-r from-purple-600 to-purple-800 text-white px-8 py-3 rounded-lg font-bold shadow-md hover:shadow-lg transition-all duration-300"
            >
              تصفح المنتجات
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 xs:gap-6">
            {wishlist.map((productId) => {
              const product = products.find((p) => p.id === productId);
              if (!product) return null;

              return (
                <motion.div
                  key={productId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
                >
                  <div className="relative group">
                    <img
                      src={product.images[0]?.url || "/placeholder-product.jpg"}
                      alt={product.name}
                      className="w-full h-48 xs:h-56 object-cover"
                      onClick={() => navigate(`/product/${product.id}`)}
                    />

                    {/* Remove button - always visible on mobile, show on hover for desktop */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromWishlist(productId);
                      }}
                      className="absolute top-2 right-2 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md opacity-100 xs:opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-50 hover:text-red-600"
                    >
                      <IoTrashOutline className="w-5 h-5 text-red-500" />
                    </button>

                    {/* Discount badge */}
                    {product.discount && product.discount > 0 && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-lg">
                        خصم {product.discount}%
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <h3
                      className="text-base xs:text-lg font-semibold text-gray-800 mb-2 line-clamp-2 cursor-pointer"
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      {product.name}
                    </h3>

                    <div className="flex items-center gap-2 mb-4">
                      {product.discount && product.discount > 0 && (
                        <span className="text-sm text-gray-500 line-through">
                          {product.price} ر.س
                        </span>
                      )}
                      <span className="text-lg font-bold text-purple-600">
                        {product.discount && product.discount > 0
                          ? (
                              product.price *
                              (1 - product.discount / 100)
                            ).toFixed(2)
                          : product.price}{" "}
                        ر.س
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product);
                        }}
                        className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
                      >
                        <IoCartOutline className="w-4 h-4" />
                        <span className="text-sm xs:text-base">أضف للسلة</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

const AuthGuard = withAuth(WishListPage)
export default AuthGuard;
