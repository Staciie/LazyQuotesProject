export type ColorTheme = {
  primary: string;
  lightPrimary: string;
  secondary: string;
  textSecondary: string;
  textPrimary: string;
  background: string;
  disabled: string;
  disabledText: string;
};

const sharedColors = {
  black: '#000000',
  white: '#FFFFFF',
};

type SharedColors = typeof sharedColors;

export type TColors = ColorTheme & SharedColors;

type TColorPalette = TColors;

const colorPallete: TColorPalette = {
  primary: '#7BAE7F',
  lightPrimary: '#7BAE7F50',
  secondary: '#ED6A5A',
  textPrimary: '#27233A',
  textSecondary: '#233342',
  background: '#FFFFFB',
  disabled: '#A5A5A5',
  disabledText: '#4F4F4F',
  ...sharedColors,
};

export default colorPallete;
