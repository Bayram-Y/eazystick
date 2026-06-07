import { createSelector } from "@reduxjs/toolkit";
import { selectCartItems } from "./cart-slice";

/**
 * FINAL PRICE PER ITEM
 */
export const selectCartItemsWithFinalPrice = createSelector(
  [selectCartItems],
  (cart) =>
    cart.map((item) => {
      const price = Number(item.price ?? 0);
      const discount = Number(item.discountPercent ?? 0);

      const finalPrice =
        discount > 0 ? price * (1 - discount / 100) : price;

      return {
        ...item,
        finalPrice: Number(finalPrice.toFixed(2)),
      };
    })
);

/**
 * SUBTOTAL
 */
export const selectCartSubtotal = createSelector(
  [selectCartItemsWithFinalPrice],
  (cart) =>
    cart.reduce(
      (acc, item) => acc + item.finalPrice * item.quantity,
      0
    )
);

/**
 * TOTAL QUANTITY
 */
export const selectTotalQuantity = createSelector(
  [selectCartItems],
  (cart) =>
    cart.reduce((acc, item) => acc + item.quantity, 0)
);

/**
 * TOTAL DISCOUNT
 */
export const selectTotalDiscount = createSelector(
  [selectCartItems],
  (cart) =>
    cart.reduce((acc, item) => {
      const price = Number(item.price ?? 0);
      const discount = Number(item.discountPercent ?? 0);

      return acc + price * (discount / 100) * item.quantity;
    }, 0)
);