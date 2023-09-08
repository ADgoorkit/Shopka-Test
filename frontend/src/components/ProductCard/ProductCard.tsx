import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';
import { Button, Rating } from '../UI';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Product } from '../../types/product.type';

interface ProductCardProps {
  product: Product;
  onWatchClick: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onWatchClick,
}) => {
  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardActionArea>
        <CardMedia
          component='img'
          alt={product.name}
          image='http://via.placeholder.com/360x360'
        />
        <CardContent>
          <Typography gutterBottom variant='h5'>
            {product.name}
          </Typography>
          <Typography gutterBottom variant='body1'>
            ${product.price}
          </Typography>
          <Typography variant='subtitle1'>{product.description}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Stack width='100%' direction='row' justifyContent='space-between'>
          <Rating
            value={product.rating}
            readOnly
            text={product.rating.toString()}
          />
          <Button
            size='small'
            color='primary'
            onClick={() => onWatchClick(product)}
            startIcon={<FavoriteBorderIcon />}
            variant={product.isWatched ? 'contained' : 'outlined'}
          >
            Watch
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
};
