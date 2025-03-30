import React, { useCallback, useEffect, useState } from "react";
import { CartItem as CartItemType } from "../../util/types";
import { useCartContext } from "../../context/useContext/useCartContext";

type QuantityInputProps = {
  id: string;
  quantity: number;
};

// Reusable Cart Item Component
const CartItem = ({ item }: { item: CartItemType }) => {
  return (
    <li className="flex items-center gap-2 p-2 rounded-xl border bg-gray-50 shadow border-gray-100">
      <img
        src={item.image}
        alt={item?.name}
        className="w-16 rounded-sm object-cover"
      />
      <div className="flex-2">
        <h3 className="text-xs text-gray-900">{item?.name}</h3>
        <p className="text-xs text-green-700 rounded-2xl ">
          {item.finalPrice || item.price} ريال
        </p>
      </div>
      <div className="flex flex-1  flex-col sm:flex-row items-center justify-end gap-2">
        <QuantityInput quantity={item.quantity} id={item.productId} />
        <RemoveItemButton id={item.productId} />
      </div>
    </li>
  );
};

// Reusable Quantity Input Component
export const QuantityInput: React.FC<QuantityInputProps> = ({
  id,
  quantity,
}) => {
  const { updateCartItemQuantity } = useCartContext();
  const [quantityValue, setQuantityValue] = useState<number>(quantity);

  const handleChangeQuantity = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newQuantity = Math.max(1, +e.target.value); // تجنب القيم السالبة أو الصفر
      setQuantityValue(newQuantity);
      updateCartItemQuantity(id, newQuantity);
    },
    [id, updateCartItemQuantity]
  );

  useEffect(() => {
    setQuantityValue(quantity);
  }, [quantity]);

  return (
    <form>
      <label htmlFor={id} className="sr-only">
        Quantity
      </label>
      <input
        type="number"
        min="1"
        onChange={handleChangeQuantity}
        value={quantityValue}
        id={id}
        className="h-8 w-12 rounded-sm border border-gray-300 bg-gray-50 text-center text-xs text-gray-600
          focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </form>
  );
};

// Reusable Remove Item Button Component
export const RemoveItemButton = ({ id }: { id: string }) => {
  const { removeItemFromCart } = useCartContext();

  return (
    <button
      className="text-gray-600 transition rounded p-2 hover:text-red-600  active:text-red-600 hover:bg-red-100 action:bg-red-100 cursor-pointer"
      onClick={() => removeItemFromCart(id)}
    >
      <span className="sr-only">Remove item</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="size-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
        />
      </svg>
    </button>
  );
};

// Main Cart Component

export default CartItem;
