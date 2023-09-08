import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../..';

export const selectProducts = (state: RootState) => ({
  products: state.product.products,
  isProductsLoading: state.product.isProductsLoading,
  productsError: state.product.productsError,
});

const products = (state: RootState) => state.product.products;
const isProductsLoading = (state: RootState) => state.product.isProductsLoading;
const productsError = (state: RootState) => state.product.productsError;

export const getProducts = createSelector(
  [products, isProductsLoading, productsError],
  (products, isProductsLoading, productsError) => {
    return { products, isProductsLoading, productsError };
  }
);
