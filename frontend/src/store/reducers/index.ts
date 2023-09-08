import { combineReducers } from 'redux';
import { productReducer } from '../slices/product/productSlice';

const rootReducer = combineReducers({
  product: productReducer,
});

export default rootReducer;
