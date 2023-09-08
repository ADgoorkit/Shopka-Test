import React, { PropsWithChildren } from 'react';
import MUIButton, { ButtonProps as MUIButtonProps } from '@mui/material/Button';

interface ButtonProps extends MUIButtonProps {}

export const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  children,
  ...props
}) => {
  return <MUIButton {...props}>{children}</MUIButton>;
};
