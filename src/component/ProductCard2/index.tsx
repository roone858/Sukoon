import React from "react";
import { Product } from "../../util/types";

// Props for the component
type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {


  return (
    <div className="relative overflow-hidden rounded shape-product-card product-card-sky w-60 h-60">
      <div className="absolute top-0 right-0 left-0 bottom-0">
        <a href={"link"}>
          <img
            src={product.images[0]}
            alt={product.name}
            className="display-image-product-card h-full w-full lazy transition-all duration-500 hover:scale-110 loaded"
          />
          <div className="absolute top-2 right-2 rounded px-2 py-1.5 text-sm font-semibold promo-title-style-color">
         -10   {/* -{discountPercentage} */}
          </div>
        </a>
      </div>

      {/* Wishlist Button */}
      <div className="absolute left-2 top-2 z-2 s-product-card-vertical">
        <button
          className="s-product-card-wishlist-btn animated s-button-element s-button-icon s-button-solid s-button-light s-button-loader-center"
          onClick={() => console.log("Add to wishlist:",product._id)}
          aria-label="Add or remove to wishlist"
        >
          <span className="s-button-text">
            <i className="sicon-heart"></i>
          </span>
        </button>
      </div>

      {/* Product Info */}
      <div className="absolute right-2 left-2 bottom-2 z-2">
        <div className="flex flex-col items-start w-full">
          <div className="product-info flex flex-col items-center add-product-button-sky bg_info_product_card w-full h-min py-3 rounded gap-2 overflow-hidden">
            <div className="flex items-center justify-between w-full px-3 gap-1">
              <div className="flex flex-col items-start gap-1">
                <h3 className="text-sm font-semibold text-black transition-all hover:text-primary">
                  <a href={"link"}>{product.name}</a>
                </h3>
                <div className="flex items-center gap-0.5">
                  <h4 className="text-sm font-bold price-text-discount">
                    {product.price} <i className="sicon-sar"></i>
                  </h4>
                  <span className="text-sm text-black font-bold opacity-60 line-through">
                    {product.price} <i className="sicon-sar"></i>
                  </span>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                className="s-button-element s-button-btn s-button-solid s-button-light s-button-loader-center"
                onClick={() => console.log("Add to cart:", product._id)}
                aria-label="Add to cart"
              >
                <span className="s-button-text">
                  <i className="text-[16px] font-bold sicon-cart2"></i>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;