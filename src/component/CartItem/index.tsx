import React, { useCallback, useEffect, useState, memo } from "react";
import { CartItem as CartItemType } from "../../util/types";
import { useCartContext } from "../../context/hooks/useCartContext";
import { throttle } from "../../utils/performance";

type QuantityInputProps = {
  id: string;
  quantity: number;
};

// Reusable Cart Item Component
const CartItem = memo(({ item }: { item: CartItemType }) => {
  return (
    <li className="flex items-center gap-2 p-2 rounded-xl border bg-gray-50 shadow border-gray-100">
      <img
        src={item.image}
        alt={item?.name}
        className="w-16 rounded-sm object-cover"
        loading="lazy"
        width="64"
        height="64"
      />
      <div className="flex-2">
        <h3 className="text-xs text-gray-900">{item?.name}</h3>
        <p className="text-xs text-green-700 rounded-2xl">
          {item.finalPrice || item.originalPrice} ريال
        </p>
      </div>
      <div className="flex flex-1 flex-col sm:flex-row items-center justify-end gap-2">
        <QuantityInput quantity={item.quantity} id={item.productId} />
        <RemoveItemButton id={item.productId} />
      </div>
    </li>
  );
});

// Reusable Quantity Input Component
const QuantityInput = memo<QuantityInputProps>(({ id, quantity }) => {
  const { updateCartItemQuantity } = useCartContext();
  const [quantityValue, setQuantityValue] = useState<number>(quantity);
  const [isFocused, setIsFocused] = useState(false);

  // Throttle the quantity update to prevent excessive updates
  const throttledUpdateQuantity = useCallback(
    throttle((newQuantity: number) => {
      updateCartItemQuantity(id, newQuantity);
    }, 300),
    [id, updateCartItemQuantity]
  );

  const handleChangeQuantity = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newQuantity = Math.max(1, Math.min(99, +e.target.value)); // Limit between 1 and 99
      setQuantityValue(newQuantity);
      throttledUpdateQuantity(newQuantity);
    },
    [throttledUpdateQuantity]
  );

  // Handle blur event to ensure final value is valid
  const handleBlur = useCallback(() => {
    setIsFocused(false);
    if (quantityValue !== quantity) {
      updateCartItemQuantity(id, quantityValue);
    }
  }, [id, quantity, quantityValue, updateCartItemQuantity]);

  useEffect(() => {
    if (!isFocused) {
      setQuantityValue(quantity);
    }
  }, [quantity, isFocused]);

  return (
    <div className="relative">
      <label htmlFor={`quantity-${id}`} className="sr-only">
        الكمية
      </label>
      <input
        type="number"
        min="1"
        max="99"
        onChange={handleChangeQuantity}
        onFocus={() => setIsFocused(true)}
        onBlur={handleBlur}
        value={quantityValue}
        id={`quantity-${id}`}
        className="h-8 w-12 rounded-sm border border-gray-300 bg-gray-50 text-center text-xs text-gray-600
          focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-shadow"
        aria-label="الكمية"
      />
    </div>
  );
});

// Reusable Remove Item Button Component
const RemoveItemButton = memo(({ id }: { id: string }) => {
  const { removeItemFromCart } = useCartContext();
  
  const handleRemove = useCallback(() => {
    removeItemFromCart(id);
  }, [id, removeItemFromCart]);

  return (
    <button
      className="text-gray-600 transition rounded p-2 hover:text-red-600 active:text-red-600 hover:bg-red-100 active:bg-red-100 cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500"
      onClick={handleRemove}
      aria-label="إزالة المنتج"
    >
      <span className="sr-only">إزالة المنتج</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="size-4"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
        />
      </svg>
    </button>
  );
});

CartItem.displayName = "CartItem";
QuantityInput.displayName = "QuantityInput";
RemoveItemButton.displayName = "RemoveItemButton";

export default CartItem;
