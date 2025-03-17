import React from "react";

// Define types for the cart item
type CartItemProps = {
  id: number;
  imageSrc: string;
  name: string;
  size: string;
  color: string;
};

// Define types for the quantity input
type QuantityInputProps = {
  id: string;
};

// Define types for the remove item button (no props needed for this example)
type RemoveItemButtonProps = object;

// Reusable Cart Item Component
const CartItem: React.FC<CartItemProps> = ({
  id,
  imageSrc,
  name,
  size,
  color,
}) => {
  return (
    <li className="flex items-center gap-4">
      <img
        src={imageSrc}
        alt={name}
        className="size-16 rounded-sm object-cover"
      />
      <div>
        <h3 className="text-sm text-gray-900">{name}</h3>
        <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
          <div>
            <dt className="inline">Size:</dt>
            <dd className="inline">{size}</dd>
          </div>
          <div>
            <dt className="inline">Color:</dt>
            <dd className="inline">{color}</dd>
          </div>
        </dl>
      </div>
      <div className="flex flex-1 items-center justify-end gap-2">
        <QuantityInput id={`Line${id}Qty`} />
        <RemoveItemButton />
      </div>
    </li>
  );
};

// Reusable Quantity Input Component
const QuantityInput: React.FC<QuantityInputProps> = ({ id }) => {
  return (
    <form>
      <label htmlFor={id} className="sr-only">
        Quantity
      </label>
      <input
        type="number"
        min="1"
        value="1"
        id={id}
        className="h-8 w-12 rounded-sm border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-hidden [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
      />
    </form>
  );
};

// Reusable Remove Item Button Component
const RemoveItemButton: React.FC<RemoveItemButtonProps> = () => {
  return (
    <button className="text-gray-600 transition hover:text-red-600">
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
const Cart: React.FC = () => {
  const cartItems: CartItemProps[] = [
    {
      id: 1,
      imageSrc:
        "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=830&q=80",
      name: "Basic Tee 6-Pack",
      size: "XXS",
      color: "White",
    },
    {
      id: 2,
      imageSrc:
        "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=830&q=80",
      name: "Basic Tee 6-Pack",
      size: "XXS",
      color: "White",
    },
    {
      id: 3,
      imageSrc:
        "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=830&q=80",
      name: "Basic Tee 6-Pack",
      size: "XXS",
      color: "White",
    },
  ];

  return (
    <div
      className="relative top-100 border border-gray-50 shadow rounded-2xl bg-white px-4 py-8 sm:px-6 lg:px-8"
      aria-modal="true"
      role="dialog"
      tabIndex={-1}
    >
      <button className="absolute end-4 top-4 text-gray-600 transition hover:scale-110">
        <span className="sr-only">Close cart</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div className="mt-4 space-y-6">
        <ul className="space-y-4">
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
        </ul>

        <div className="space-y-4 text-center">
          <a
            href="#"
            className="block rounded-sm border border-gray-600 px-5 py-3 text-sm text-gray-600 transition hover:ring-1 hover:ring-gray-400"
          >
            View my cart (2)
          </a>
          <a
            href="#"
            className="block rounded-sm bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
          >
            Checkout
          </a>
          <a
            href="#"
            className="inline-block text-sm text-gray-500 underline underline-offset-4 transition hover:text-gray-600"
          >
            Continue shopping
          </a>
        </div>
      </div>
    </div>
  );
};

export default Cart;
