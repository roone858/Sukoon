import { motion } from "framer-motion";
import { IoHeartOutline, IoTrashOutline } from "react-icons/io5";
import { useAuthContext } from "../../context/hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import "./style.css";
import wishlistService from "../../services/wishlist.service";
import { useStoreContext } from "../../context/hooks/useStoreContext";
import { Product } from "../../util/types";

const WishListPage = () => {
  const { user } = useAuthContext();
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

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">قائمة المفضلة</h1>

        {wishlist.length === 0 ? (
          <div className="text-center py-12">
            <IoHeartOutline className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold text-gray-600 mb-2">
              قائمة المفضلة فارغة
            </h2>
            <p className="text-gray-500 mb-6">
              لم تقم بإضافة أي منتجات إلى المفضلة بعد
            </p>
            <button
              onClick={() => navigate("/products")}
              className="btn-primary"
            >
              تصفح المنتجات
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((productId) => {
              const product = products.find((p) => p.id === productId);
              if (!product) return null;
              return (
                <motion.div
                  key={productId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="wishlist-card"
                >
                  <div className="relative group">
                    <img
                      src={product?.images[0].url}
                      alt={product?.name}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => removeFromWishlist(productId)}
                      className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <IoTrashOutline className="w-5 h-5 text-red-500" />
                    </button>
                  </div>

                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {product?.name}
                    </h3>

                    <div className="flex items-center gap-2 mb-4">
                      {product?.discount && (
                        <>
                          <span className="text-sm text-red-500">
                            -{product?.discount}%
                          </span>
                          <span className="text-sm text-gray-500 line-through">
                            {product?.price} ريال
                          </span>
                        </>
                      )}
                      <span className="text-lg font-bold text-purple-600">
                        {product?.price} ريال
                      </span>
                    </div>

                    <button
                      onClick={() => addToCart(product)}
                      className="btn-primary w-full"
                    >
                      أضف للسلة
                    </button>
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

export default WishListPage;
