import { withStyles, Theme, WithStyles } from 'shared/styles';
import { rule, styledBy } from 'shared/helpers/style';

import { IProps } from './Modal';

const iconButtonPadding = 12;

const styles = ({ extra: theme }: Theme) => ({
  portal: rule({
    overflow: 'auto',
    position: 'fixed',
    top: -1,
    right: -1,
    bottom: -1,
    left: -1,
    zIndex: styledBy<IProps, 'type'>('type', {
      default: theme.zIndex.modal,
      signTransaction: theme.zIndex.signTransactionsModal,
    }, 'default'),

    '&:empty': {
      display: 'none',
    },
  }),
  overlay: rule({
    position: 'relative',
    minHeight: '100%',
    minWidth: '100%',
    padding: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: theme.palette.control.bg.overlay,
  }),
  modal: rule({
    flexGrow: 1,
    minHeight: '100%',
    minWidth: '100%',
    maxWidth: '100%',
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: theme.colors.white,
    outline: 'none',
    opacity: 0,
    overflow: 'hidden',

    '&$isPrimary': {
      border: `solid 1px ${theme.colors.tundora}`,
      borderRadius: '0.25rem',
    },

    [theme.breakpoints.up('sm')]: rule({
      flexGrow: 0,
      minHeight: 'unset',
      minWidth: 'unset',
      width: styledBy<IProps, 'size'>('size', {
        small: '16rem',
        medium: '25rem',
        large: '35rem',
        xLarge: '45rem',
      }),
      margin: '3rem',
      borderRadius: '0.5rem',
    }),

    [theme.breakpoints.up('md')]: rule({
      width: styledBy<IProps, 'size'>('size', {
        small: '21rem',
        medium: '30rem',
        large: '40rem',
        xLarge: '50rem',
      }),
    }),
  }),

  modalAfterOpen: rule({
    animationName: 'modal-appear-animation',
    animationDuration: '500ms',
    animationFillMode: 'forwards',
  }),
  overlayAfterOpen: rule({
    animationName: 'overlay-appear-animation',
    animationDuration: '500ms',
    animationFillMode: 'forwards',
  }),
  modalBeforeClose: rule({
    animationName: 'modal-disappear-animation',
    animationDuration: '400ms',
    animationFillMode: 'forwards',
  }),
  overlayBeforeClose: rule({
    animationName: 'overlay-disappear-animation',
    animationDuration: '400ms',
    animationFillMode: 'forwards',
  }),

  title: rule({
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    fontFamily: theme.typography.primaryFont,

    '$isPrimary &': {
      justifyContent: 'center',
      padding: `${theme.spacing.unit}px`,
      fontSize: '0.75rem',
      fontWeight: 600,
      backgroundColor: theme.colors.electricViolet,
      color: theme.colors.white,
    },

    '$isSecondary &': {
      // tslint:disable-next-line:max-line-length
      margin: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4 - iconButtonPadding}px 0 ${theme.spacing.unit * 4}px`,
      justifyContent: 'space-between',
      fontSize: '1.25rem',
      fontWeight: 'bold',
    },
  }),

  cross: rule({
    position: 'static',
    top: theme.spacing.unit * 3,
    right: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit * 3,
    zIndex: theme.zIndex.newContext + 1,

    '&$isAbsolute': {
      position: 'absolute',
    },
    '&$isHidden': {
      visibility: 'hidden',
    },
  }),

  isAbsolute: {},
  isHidden: {
    display: styledBy<IProps, 'titleAlign'>('titleAlign', {
      center: 'block',
      left: 'none',
    }, 'center'),
  },

  isPrimary: {},
  isSecondary: {},

  '@keyframes modal-disappear-animation': rule({
    from: {
      opacity: 1,
      transform: 'translateY(0)',
    },
    to: {
      opacity: 0,
      transform: 'translateY(50%)',
    },
  }),

  '@keyframes modal-appear-animation': rule({
    from: {
      opacity: 0,
      transform: 'translateY(25%)',
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)',
    },
  }),

  '@keyframes overlay-appear-animation': rule({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  }),

  '@keyframes overlay-disappear-animation': rule({
    from: {
      opacity: 1,
    },
    to: {
      opacity: 0,
    },
  }),
});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
