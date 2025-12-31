import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProducts,fetchSingleProduct,fetchCategories,fetchByCategory } from "./productsApi";

// Get All Products
export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => await fetchProducts()
);
// Get Sigle Product
export const getSingleProduct = createAsyncThunk(
  "products/getSingleProduct",
  async (id) => await fetchSingleProduct(id)
);
// Get Category List
export const getCategories = createAsyncThunk(
  "products/getCategories",
  async () => await fetchCategories()
);
// get by category
export const getByCategory = createAsyncThunk(
  "products/getByCategory",
  async (category) => await fetchByCategory(category)
);

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    categories:[],
    selectedCategory:'all',
    singleProduct:null,
    isLoading: false,
    error: null,
  },
  reducers: {
    // to set the selected category in the state
    setSelectedCategory: (state,action) => {
      state.selectedCategory = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.products;
      })
      .addCase(getProducts.rejected, (state) => {
        state.isLoading = false;
        state.error = "Failed to load products";
      }).addCase(getSingleProduct.pending, (state) => {
        state.isLoading = true;
      }).addCase(getSingleProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.singleProduct = action.payload
      }).addCase(getCategories.fulfilled, (state,action) => {
        state.categories = action.payload
      }).addCase(getByCategory.fulfilled, (state,action) => {
        state.isLoading = false
        state.products = action.payload.products
      })
  },
});

export const productsReducer = productsSlice.reducer;
export const {setSelectedCategory} = productsSlice.actions