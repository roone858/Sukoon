import { IoHeartOutline, IoArrowForward } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import wishlistService from "../../services/wishlist.service";
import { useStoreContext } from "../../context/hooks/useStoreContext";
import withAuth from "../../HOC/withAuth";
import ProductListItem from "./components/ProductListItem";
import { ReviewProvider } from "../../context/providers/ReviewProvider";

const WishListPage = () => {
  const { products, wishlist, updateWishlist } = useStoreContext();
  const navigate = useNavigate();

  const removeFromWishlist = async (id: string) => {
    await wishlistService.removeFromWishlist(id);
    updateWishlist(wishlist.filter((item) => item !== id));
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

              //   <ProductCard mode="grid" product={product} />

              return (
                <ReviewProvider productId={product.id} key={product.id}>
                  <ProductListItem
                    product={product}
                    removeFromWishlist={removeFromWishlist}
                  />
                </ReviewProvider>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

const AuthGuard = withAuth(WishListPage);
export default AuthGuard;
