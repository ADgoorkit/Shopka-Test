import React from 'react';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import { TextFieldProps } from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/Clear';

// Type instead of interface. An interface can only extend an object with statically known members.
type InputProps = TextFieldProps & {
  showClearButton?: boolean;
  onClear?: () => void;
};

export const Input: React.FC<InputProps> = ({
  showClearButton = false,
  onChange,
  onClear,
  value,
  ...props
}) => {
  return (
    <TextField
      {...props}
      value={value}
      onChange={onChange}
      InputProps={{
        ...props.InputProps,
        endAdornment: (
          <InputAdornment position='end' style={{ minWidth: '28px' }}>
            {showClearButton && value ? (
              <IconButton edge='end' onClick={onClear}>
                <ClearIcon />
              </IconButton>
            ) : null}
          </InputAdornment>
        ),
      }}
    />
  );
};
