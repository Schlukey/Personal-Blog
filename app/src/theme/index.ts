import { ComponentStyleConfig, extendTheme } from '@chakra-ui/react';

const AppColors = {
  primary: '#040D12',
  secondary: '#183D3D',
  tertiary: '#5C8374',
  contentColor: '#93B1A6',
  highlight: '#5F8D4E',
  appBackground: '#3C4142',
};

const textStyles = {
  h1: {
    fontSize: ['36px'],
  },
  h2: {
    fontSize: ['30px'],
  },
  h3: {
    fontSize: ['24px'],
  },
  body: {
    fontSize: ['12px', '14px', '16px'],
    fontWeight: '400',
  },
};

const buttonComponentStyle: ComponentStyleConfig = {
  baseStyle: {
    fontWeight: 'bold',
    color: AppColors.primary,
    rounded: 'md',
    border: 'none',
    cursor: 'pointer',
  },
  sizes: {
    xs: {
      fontSize: '12px',
      px: 2,
      py: 1,
    },
    sm: {
      fontSize: '16px',
    },
    md: {
      fontSize: '18px',
      px: 8,
      py: 4,
    },
    lg: {
      fontSize: '20px',
    },
    xl: {
      fontSize: '26px',
      px: 8,
      py: 4,
    },
    xxl: {
      fontSize: '36px',
      px: 8,
      py: 4,
    },
  },
  variants: {},
  defaultProps: {
    size: 'md',
    variant: 'solid',
  },
};

const theme = extendTheme({
  textStyles: textStyles,
  components: {
    Button: buttonComponentStyle,
  },
});

type AppTextStyles = keyof typeof textStyles;
type AppButtonVariants =
  | 'underline'
  | 'solid'
  | 'outline'
  | 'ghost'
  | 'withStartIcon'
  | 'roundedUnderline';
type AppColorsType = keyof typeof AppColors;

export { theme, AppColors };
export type { AppTextStyles, AppButtonVariants, AppColorsType };
