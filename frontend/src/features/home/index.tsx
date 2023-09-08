import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  Grid,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';
import { RangeSlider, Rating, Select } from '../../components/UI';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CUSTOM_REVIEWS_VALUES } from './constants/custom-reviews-values.constant';
import { SORT_BY_OPTIONS } from '../../constants/sort-options.constant';
import { ProductCard } from '../../components/ProductCard';
import { Product } from '../../types/product.type';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import {
  fetchAllProducts,
  toggleProductInWatchList,
} from '../../store/slices/product/thunk/product.thunk';
import { GetAllProductsParams } from '../../types/get-all-products-params.type';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useAppSelector';
import { getProducts } from '../../store/slices/product/selector/productsSelector';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = ({}) => {
  const [ratingValue, setRatingValue] = React.useState<number | null>(null);
  const [priceRangeValue, setPriceRangeValue] = React.useState<number[]>([
    0, 200,
  ]);
  const debouncedPriceRangeValue = useDebouncedValue(priceRangeValue, 300);
  const [sortByValue, setSortByValue] = React.useState<string>('rating');
  const { products, isProductsLoading, productsError } =
    useAppSelector(getProducts);

  const dispatch = useAppDispatch();
  const location = useLocation();

  React.useEffect(() => {
    const params: GetAllProductsParams = {};

    const search = new URLSearchParams(location.search).get('search');
    if (search) {
      params.search = search;
    }

    if (ratingValue) {
      params.minRating = ratingValue;
    }

    if (debouncedPriceRangeValue) {
      params.minPrice = debouncedPriceRangeValue[0];
      params.maxPrice = debouncedPriceRangeValue[1];
    }

    if (sortByValue) {
      params.sortField = sortByValue;
    }

    dispatch(fetchAllProducts(params));
  }, [
    ratingValue,
    debouncedPriceRangeValue,
    sortByValue,
    dispatch,
    location.search,
  ]);

  const onPriceRangeChange = (newValue: number[]) => {
    setPriceRangeValue(newValue as number[]);
  };

  const onSortByChange = (event: SelectChangeEvent<string | number>) => {
    setSortByValue(event.target.value as string);
  };

  const onWatchClick = (product: Product) => {
    dispatch(toggleProductInWatchList(product._id));
  };

  const onCustomerReviewsFilterClick = (value: number) => {
    if (ratingValue === value) {
      setRatingValue(null);
    } else {
      setRatingValue(value);
    }
  };

  const customerReviewsFilter = CUSTOM_REVIEWS_VALUES.map((value) => (
    <Box onClick={() => onCustomerReviewsFilterClick(value)} key={value}>
      <Rating
        hideEmptyIcon
        value={value}
        readOnly
        text='& up'
        align='flex-end'
        sx={{
          backgroundColor: ratingValue === value ? '#e3e1e1' : '#f0eded',
          padding: '8px',
          borderRadius: '16px',
          cursor: 'pointer',
        }}
      />
    </Box>
  ));

  return (
    <Stack direction='row' width='100%' spacing={4} sx={{ marginTop: '64px' }}>
      <Stack sx={{ flex: '2' }} spacing={4}>
        <Box>
          <Typography variant='body1' sx={{ margin: '80px 0 16px' }}>
            Price Range Selected
          </Typography>
          <Card sx={{ padding: '40px 20px 0' }}>
            <RangeSlider
              value={priceRangeValue}
              onChange={onPriceRangeChange}
              min={0}
              max={200}
              step={1}
            />
          </Card>
        </Box>

        <Box>
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              id='panel1a-header'
            >
              <Typography>CUSTOMERS REVIEWS</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack flexDirection='row' flexWrap='wrap' spacing={1} useFlexGap>
                {customerReviewsFilter}
              </Stack>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Stack>

      <Stack sx={{ flex: '6' }}>
        <Card sx={{ padding: '16px' }}>
          <Box sx={{ marginBottom: '32px' }}>
            <Select
              label='Sort by'
              value={sortByValue}
              onChange={onSortByChange}
              options={SORT_BY_OPTIONS}
              sx={{ width: '200px' }}
            />
          </Box>

          <Box>
            <Grid container spacing={2}>
              {products?.map((product) => (
                <Grid item xs={12} sm={12} md={6} lg={3} key={product._id}>
                  <ProductCard product={product} onWatchClick={onWatchClick} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Card>
      </Stack>
    </Stack>
  );
};

export default HomePage;
