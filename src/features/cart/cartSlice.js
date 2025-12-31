import { createSlice } from "@reduxjs/toolkit";

const items = localStorage.getItem('cartItems') !== null ? JSON.parse(localStorage.getItem('cartItems')) : []
const totalQuantity = localStorage.getItem('totalQty') !== null ? JSON.parse(localStorage.getItem('totalQty')) : 0
const totalPrice = localStorage.getItem('totalPrice') !== null ? JSON.parse(localStorage.getItem('totalPrice')) : 0

  const setCartItems = (item,totalQty,totalPrice) => {
  localStorage.setItem('cartItems', JSON.stringify(item)),
  localStorage.setItem('totalQty', JSON.stringify(totalQty)),
  localStorage.setItem('totalPrice', JSON.stringify(totalPrice))
 }


export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: items,
    totalQty: totalQuantity,
    totalPrice: totalPrice,
  },



  reducers: {
    addToCart: (state, action) => {
      // first get the product
      const product = action.payload;
      // get the existing products
      const existingProduct = state.items.find(
        (item) => item.id === product.id
      );

      // check if the product exist or not
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }

      // update the cart
      state.totalQty = state.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      state.totalPrice = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      setCartItems(state.items.map((item) => item),state.totalQty,state.totalPrice)
    },
    // Remove From Cart
    removeFromCart: (state, action) => {
      const id = action.payload;

      const existingItem = state.items.find((item) => item.id === id);

      if (!existingItem) return;

      if (existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      } else {
        state.items = state.items.filter((item) => item.id !== id);
      }

      state.totalQty = state.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );

      state.totalPrice = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      setCartItems(state.items.map((item) => item),state.totalQty,state.totalPrice)
    },

    // Remove Cart
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
      state.totalQty = 0;
      setCartItems(state.items.map((item) => item),state.totalQty,state.totalPrice)
    },
  },
});

export const cartReducer = cartSlice.reducer;
export const { addToCart, clearCart, removeFromCart } = cartSlice.actions;
