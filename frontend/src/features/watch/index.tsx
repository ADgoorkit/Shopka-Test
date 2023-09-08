import { Box, Grid } from '@mui/material';
import React from 'react';
import { ProductCard } from '../../components/ProductCard';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { Product } from '../../types/product.type';
import { useAppSelector } from '../../hooks/useAppSelector';
import { getWatchList } from '../../store/slices/product/selector/watchListSelector';
import { toggleProductInWatchList } from '../../store/slices/product/thunk/product.thunk';

interface WatchPageProps {}

const WatchPage: React.FC<WatchPageProps> = ({}) => {
  const { watchList } = useAppSelector(getWatchList);

  const dispatch = useAppDispatch();

  const onWatchClick = (product: Product) => {
    dispatch(toggleProductInWatchList(product._id));
  };

  return (
    <Box sx={{ marginTop: '64px' }} width='100%'>
      <Grid container spacing={2}>
        {watchList.map((product) => (
          <Grid item xs={12} sm={12} md={6} lg={3} key={product._id}>
            <ProductCard product={product} onWatchClick={onWatchClick} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default WatchPage;
