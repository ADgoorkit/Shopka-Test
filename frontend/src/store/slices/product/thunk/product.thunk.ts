import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  UpdateProductInWatchList,
  getAllProducts,
} from './../../../../api/product/product.api';
import { GetAllProductsParams } from '../../../../types/get-all-products-params.type';

export const fetchAllProducts = createAsyncThunk(
  'product/fetchAllProducts',
  async (params: GetAllProductsParams) => {
    const data = await getAllProducts(params);
    return data;
  }
);

export const toggleProductInWatchList = createAsyncThunk(
  'product/toggleProductInWatchList',
  async (productId: number) => {
    const data = await UpdateProductInWatchList(productId);
    return data;
  }
);
