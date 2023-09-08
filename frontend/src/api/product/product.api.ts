import axiosInstance from '../../lib/axios';
import { GetAllProductsParams } from '../../types/get-all-products-params.type';
import { Product } from '../../types/product.type';

export const getAllProducts = async (params: GetAllProductsParams) => {
  try {
    const { data } = await axiosInstance.get<Product[]>('/products', {
      params,
    });

    return data;
  } catch (error) {
    throw error;
  }
};

export const UpdateProductInWatchList = async (productId: number) => {
  try {
    const { data } = await axiosInstance.patch<Product>(
      `/products/${productId}`
    );

    return data;
  } catch (error) {
    throw error;
  }
};
