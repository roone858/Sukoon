import { useStoreContext } from "../../../context/hooks/useStoreContext";

const WishlistTab = () => {
  const { products, wishlist } = useStoreContext();

  return (
    <div className="space-y-6">
      {wishlist?.map((productId: string) => {
        const product = products.find((p) => p.id === productId);
        return (
          <div key={productId} className="profile-card flex items-center gap-4">
            <img
              src={product?.images[0].url}
              alt={product?.name}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="text-lg font-medium">{product?.name}</h3>
              <p className="text-purple-600 font-medium">
                {product?.price} ريال
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WishlistTab;
