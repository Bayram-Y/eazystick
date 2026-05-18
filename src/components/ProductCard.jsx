import React from "react";
import Price from "./Price";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cart-slice";
import { getImageUrl } from "../lib/utils/imageUrl";
import { CategoryLabel } from "../lib/enums/product.enum";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  const onSale = product.discountPercent && product.discountPercent > 0;

  const discountPrice = onSale
    ? (product.price * (1 - product.discountPercent / 100)).toFixed(2)
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
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Top Seller
          </div>
        )}
        {isNew && !isTopSeller && (
          <div className="absolute top-3 left-3 bg-violet-50 text-violet-800 text-xs font-medium px-2.5 py-1 rounded-full border border-violet-200">
            New
          </div>
        )}

        {/* Wishlist button */}
        <button
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 dark:bg-gray-900/90 border border-gray-200 dark:border-gray-700 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-white hover:scale-110"
          onClick={(e) => {
            e.preventDefault();
          }}
          aria-label="Add to Wishlist"
        >
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
        </button>
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
                <svg
                  key={star}
                  className={`w-3 h-3 ${star <= Math.round(product.rating) ? "text-amber-400" : "text-gray-200 dark:text-gray-700"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
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
            {onSale ? (
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
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
