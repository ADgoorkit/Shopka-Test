import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../..';

const watchList = (state: RootState) => state.product.watchList;
const isProductUpdating = (state: RootState) => state.product.isProductUpdating;
const productUpdateError = (state: RootState) =>
  state.product.productUpdateError;

export const getWatchList = createSelector(
  [watchList, isProductUpdating, productUpdateError],
  (watchList, isProductUpdating, productUpdateError) => {
    return { watchList, isProductUpdating, productUpdateError };
  }
);
