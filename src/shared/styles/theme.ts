import { Theme as MaterialTheme } from '@material-ui/core/styles';
import { hexToRGBA } from 'shared/helpers/style';
import breakpoints from './breakpoints';

// Find color name http://chir.ag/projects/name-that-color
// https://github.com/insomnious0x01/ntc-js
const colors = {
  mediumPurple: '#8c4be6',
  purpleHeart: '#6931b6',
  heliotrope: '#c17bff',
  wildSand: '#f4f4f4',
  mercury: '#e2e2e2',
  silver: '#c9c9c9',
  dustyGray: '#979797',
  codGray: '#1e1e1e',
  monza: '#d0021b',
  buttercup: '#f5a623',
  white: '#fff',
  black: '#000',
  gray: '#868686',
  alto: '#e0e0e0',
  heavyMetal: '#1d1d1b',
  alabaster: '#f8f8f8',
  silverChalice: '#aeaeae',
  tundora: '#4A4A4A',
  salem: '#0EA33A',
  ripeLemon: '#f8e71c',
  blackCurrant: '#2E2639',
  springWood: '#f1efe3',
  harp: '#e3f1e3',
  valencia: '#D63B3B',
  electricViolet: '#9013FE',
  apple: '#35BC2D',
};

export const theme = {
  breakpoints,
  colors,
  palette: {
    text: {
      primary: colors.codGray,
      primaryInverted: colors.white,
      secondary: hexToRGBA(colors.codGray, 0.58),
      warning: colors.buttercup,
      positive: colors.purpleHeart,
      negative: colors.monza,
      disabled: hexToRGBA(colors.codGray, 0.55),
    },
    control: {
      border: {
        normal: colors.mercury,
        hover: colors.purpleHeart,
        focus: colors.mediumPurple,
        disabled: colors.mercury,
      },
      bg: {
        normal: colors.white,
        hover: colors.purpleHeart,
        focus: colors.mediumPurple,
        disabled: colors.mercury,
        overlay: hexToRGBA(colors.black, 0.18),
      },
    },
  },
  sizes: {
    control: {
      borderRadius: 4,
      minHeight: 40,
    },
    page: {
      maxWidth: 1200,
    },
    header: {
      minHeightMobile: '4rem',
      minHeightDesktop: '6.25rem',
    },
  },
  spacing: {
    unit: 8,
  },
  typography: {
    primaryFont: ['OpenSans', 'Arial', 'sans-serif'].join(','),
  },
  zIndex: {
    newContext: 0,
    mobileHeader: 500,
    modal: 1300,
    signTransactionsModal: 1305,
    tooltip: 1500,
    beforeContext: (zIndex: number) => --zIndex,
    afterContext: (zIndex: number) => ++zIndex,
  },
  defaultTransitionDuration: '0.4s',
  tableColumns: {
    width: {
      name: '12rem',
      stake: '5.2rem',
      performance: '5rem',
      rating: '7rem',
      nextInstalment: '7.2rem',
      cashFlowBalance: '6.5rem',
      discount: '4rem',
      dueAmount: '6rem',
    },
  },
};

export type Theme = MaterialTheme & { extra: typeof theme };
