import { Box, CircularProgress } from '@mui/material';
import { LoaderSize } from './types/loader-size.type';
import { LoaderSizesMap } from './constants/loader-sizes.constant';

interface LoaderProps {
  size?: LoaderSize;
}

export const Loader: React.FC<LoaderProps> = ({ size }) => {
  let loaderSize = LoaderSizesMap[size || 'medium'];

  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      height='100%'
      width='100%'
    >
      <CircularProgress size={loaderSize} />
    </Box>
  );
};
