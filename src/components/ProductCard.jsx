import React from "react";
import Price from "./Price";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cart-slice";
import { getImageUrl } from "../lib/utils/imageUrl";
import { CategoryLabel } from "../lib/enums/product.enum";
import {
  StarIcon,
  HeartIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/solid";

import LikeButton from "./LikeButton";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  const hasDiscount =
    product?.discountPercent != null && product.discountPercent > 0;

  const price = Number(product?.price ?? 0);

  const discountPrice = hasDiscount
    ? Number((price * (1 - product.discountPercent / 100)).toFixed(2))
    : null;

  // popularity > 50  "Top Seller"
  const isTopSeller = (product.popularity ?? 0) > 50;

  //publishedDate within last 6 months
  const isNew =
    product.publishedDate &&
    new Date() - new Date(product.publishedDate) < 180 * 24 * 60 * 60 * 1000;

  // Category enum
  const categoryLabel = CategoryLabel[product.category] ?? product.category;

  return (
    <div className="group w-68 rounded-2xl mx-auto overflow-hidden flex flex-col bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-600 hover:-translate-y-1 transition-all duration-300 ease-out shadow-sm hover:shadow-md">
      {/* Image Section */}
      <Link
        to={`/products/${product.productId}`}
        state={{ product }}
        className="relative w-full h-64 overflow-hidden bg-gray-50 dark:bg-gray-800 block"
      >
        <img
          src={getImageUrl(product.imageUrl)}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badge */}
        {isTopSeller && (
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-amber-50 text-amber-800 text-xs font-medium px-2.5 py-1 rounded-full border border-amber-200">
            <StarIcon className="w-3 h-3 text-amber-500" />
            Top Seller
          </div>
        )}
        {isNew && !isTopSeller && (
          <div className="absolute top-3 left-3 bg-violet-50 text-violet-800 text-xs font-medium px-2.5 py-1 rounded-full border border-violet-200">
            New
          </div>
        )}

        {/* Like Button */}
        <div
          className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-200"
          onClick={(e) => e.preventDefault()}
        >
          <LikeButton
            productId={product.productId} 
            initialCount={product.likesCount}
            initialLiked={product.isLikedByCurrentUser}
          />
        </div>
      </Link>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        {/* Category */}
        {categoryLabel && (
          <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-widest">
            {categoryLabel}
          </p>
        )}

        {/* Name */}
        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 leading-snug line-clamp-2">
          {product.name}
        </h2>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon
                  key={star}
                  className={`w-3 h-3 ${
                    star <= Math.round(product.rating)
                      ? "text-amber-400"
                      : "text-gray-200 dark:text-gray-700"
                  }`}
                />
              ))}
            </div>
            {product.reviewCount && (
              <span className="text-xs text-gray-400 dark:text-gray-500">
                ({product.reviewCount})
              </span>
            )}
          </div>
        )}

        {/* Description */}
        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">
          {product.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100 dark:border-gray-800">
          {/* Price */}
          <div className="flex items-baseline gap-1.5">
            {hasDiscount ? (
              <>
                {/* Discount price */}
                <span className="text-base font-semibold text-red-600 dark:text-green-400">
                  <Price currency="$" price={discountPrice} />
                </span>

                {/* Original price (line-through) */}
                <span className="text-xs text-gray-400 line-through">
                  <Price currency="$" price={product.price} />
                </span>
              </>
            ) : (
              <span className="text-base font-semibold text-gray-900 dark:text-gray-100">
                <Price currency="$" price={product.price} />
              </span>
            )}
          </div>

          {/* Add to Cart */}
          <button
            className="flex items-center gap-1.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-medium px-3 py-2 rounded-xl hover:bg-gray-700 dark:hover:bg-gray-200 active:scale-95 transition-all duration-150 cursor-pointer"
            onClick={() => dispatch(addToCart({ product, quantity: 1 }))}
          >
            <ShoppingCartIcon className="w-3.5 h-3.5" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
