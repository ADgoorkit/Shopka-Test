import React from 'react';
import { Rating as MUIRating, Box, Typography } from '@mui/material';
import { RatingProps as MUIRatingProps } from '@mui/material/Rating';
import { RatingAlign } from './types/rating-align.type';
import styled from '@emotion/styled';

const CustomRating = styled(MUIRating)({
  '& .MuiRating-iconEmpty': {
    display: 'none',
  },
});

interface RatingProps extends Omit<MUIRatingProps, 'onChange'> {
  text?: string;
  align?: RatingAlign;
  hideEmptyIcon?: boolean;
  onChange?: (value: number | null) => void;
}

export const Rating: React.FC<RatingProps> = ({
  text,
  value,
  onChange,
  align = 'center',
  hideEmptyIcon = false,
  sx,
  ...props
}) => {
  const handleChange = (
    event: React.ChangeEvent<{}>,
    newValue: number | null
  ) => {
    onChange?.(newValue);
  };

  return (
    <Box display='flex' alignItems={align} sx={sx}>
      {hideEmptyIcon ? (
        <>
          <CustomRating value={value} onChange={handleChange} {...props} />
          {text && (
            <Typography variant='body2' style={{ marginLeft: '6px' }}>
              {text}
            </Typography>
          )}
        </>
      ) : (
        <>
          <MUIRating value={value} onChange={handleChange} {...props} />
          {text && (
            <Typography variant='body2' style={{ marginLeft: '6px' }}>
              {text}
            </Typography>
          )}
        </>
      )}
    </Box>
  );
};
