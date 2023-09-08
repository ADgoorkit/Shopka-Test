import React from 'react';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import styled from '@emotion/styled';

interface RangeSliderProps {
  min: number;
  max: number;
  step: number;
  value: number[];
  onChange: (newValue: number[]) => void;
  valueLabelFormat?: (value: number) => string;
}

const CustomSlider = styled(Slider)(() => ({
  '& .MuiSlider-valueLabel': {
    backgroundColor: 'transparent',
    borderRadius: 'unset',
    color: 'black',
    '&:before': {
      display: 'none',
    },
  },
  color: '#707070',
  '& .MuiSlider-thumb': {
    backgroundColor: '#000',
  },
  '& .MuiSlider-track': {
    backgroundColor: '#707070',
  },
  '& .MuiSlider-rail': {
    backgroundColor: '#333',
  },
}));

export const RangeSlider: React.FC<RangeSliderProps> = ({
  min,
  max,
  step,
  value,
  onChange,
  valueLabelFormat,
}) => {
  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    onChange(newValue as number[]);
  };

  const formatLabel = (value: number) => {
    if (valueLabelFormat) {
      return valueLabelFormat(value);
    }
    return `${value}$`;
  };

  return (
    <Box>
      <CustomSlider
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={handleSliderChange}
        valueLabelDisplay='on'
        valueLabelFormat={formatLabel}
      />
    </Box>
  );
};
