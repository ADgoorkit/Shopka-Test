import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../../types/product.type';
import {
  fetchAllProducts,
  toggleProductInWatchList,
} from './thunk/product.thunk';

interface ProductState {
  products: Product[];
  isProductsLoading: boolean;
  productsError: string | null;

  watchList: Product[];
  isProductUpdating: boolean;
  productUpdateError: string | null;
}

const initialState: ProductState = {
  products: [],
  isProductsLoading: false,
  productsError: null,

  watchList: [],
  isProductUpdating: false,
  productUpdateError: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchAllProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.products = action.payload;
          state.isProductsLoading = false;
          state.productsError = null;

          state.watchList = action.payload.filter((product) => {
            return product.isWatched;
          });
        }
      )
      .addCase(fetchAllProducts.pending, (state) => {
        state.isProductsLoading = true;
        state.productsError = null;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.isProductsLoading = false;
        state.productsError = action.error.message || 'Something went wrong';
      });

    builder
      .addCase(
        toggleProductInWatchList.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.products = state.products.map((product) => {
            if (product._id === action.payload._id) {
              return action.payload;
            }

            return product;
          });
          state.isProductUpdating = false;
          state.productUpdateError = null;

          state.watchList = state.products.filter((product) => {
            return product.isWatched;
          });
        }
      )
      .addCase(toggleProductInWatchList.pending, (state) => {
        state.isProductUpdating = true;
        state.productUpdateError = null;
      })
      .addCase(toggleProductInWatchList.rejected, (state, action) => {
        state.isProductUpdating = false;
        state.productUpdateError =
          action.error.message || 'Something went wrong';
      });
  },
});

export const productReducer = productSlice.reducer;
