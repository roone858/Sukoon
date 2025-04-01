interface WishlistItem {
  id: number;
  name: string;
  price: number;
  image: string;
}



const WishlistTab = () => {
     const wishlistItems = [
          {
            id: 1,
            name: "مرتبة طبية فاخرة",
            price: 1999,
            image: "https://via.placeholder.com/150",
          },
          {
            id: 2,
            name: "وسادة طبية",
            price: 299,
            image: "https://via.placeholder.com/150",
          },
        ] as WishlistItem[];
      
  return (
    <div className="space-y-6">
      {wishlistItems.map((item: WishlistItem) => (
        <div key={item.id} className="profile-card flex items-center gap-4">
          <img
            src={item.image}
            alt={item.name}
            className="w-20 h-20 object-cover rounded-lg"
          />
          <div className="flex-1">
            <h3 className="text-lg font-medium">{item.name}</h3>
            <p className="text-purple-600 font-medium">{item.price} ريال</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WishlistTab; 