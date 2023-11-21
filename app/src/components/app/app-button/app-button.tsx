import React from 'react';
import { Button, ButtonProps, forwardRef } from '@chakra-ui/react';
import { AppButtonVariants, AppColors } from '../../../theme';

export type AppButtonProps = {
  bgColor?: string;
  variant?: AppButtonVariants;
  withStartIconMarginBottom?: string;
} & ButtonProps;

export const AppButtonAs = forwardRef<AppButtonProps, 'button'>(
  (
    {
      bgColor = 'white',
      variant = 'solid',
      withStartIconMarginBottom,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Button
        ref={ref}
        cursor="pointer"
        variant={variant}
        {...props}
        bg={bgColor}
        border={`1px solid ${AppColors.tertiary}`}
        color={'black'}
        _hover={{
          transform: 'translateY(-2px)',
          boxShadow: 'lg',
        }}
        _active={{
          bg: `${AppColors.tertiary}`,
        }}
      >
        {children}
      </Button>
    );
  }
);

export const AppButton: React.FC<AppButtonProps> = ({
  bgColor = 'white',
  variant = 'solid',
  withStartIconMarginBottom,
  children,
  ...props
}) => {
  return (
    <Button
      cursor="pointer"
      variant={variant}
      {...props}
      bg={bgColor}
      border={`1px solid ${AppColors.tertiary}`}
      _hover={{
        transform: 'translateY(-2px)',
        boxShadow: 'lg',
      }}
    >
      {children}
    </Button>
  );
};