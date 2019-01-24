import { withStyles as muiWithStyles } from '@material-ui/core/styles';
import { withStyles, WithStyles, Theme } from 'shared/styles';
import { rule } from 'shared/helpers/style';

const styles = (theme: Theme) => ({

  root: rule({
    boxSizing: 'border-box',
    padding: '0.5rem 1rem',
    minHeight: 40,
    color: theme.extra.colors.black,
    borderStyle: 'solid',
    borderColor: theme.extra.colors.silver,
    zIndex: theme.extra.zIndex.newContext,
    whiteSpace: 'nowrap',

    '&$contained': rule({
      borderWidth: 1,
    }),
    '&$outlined': rule({
      borderBottomWidth: 1,
      borderRadius: 0,
    }),

    '&:hover': {
      borderColor: theme.palette.primary.dark,
      zIndex: theme.extra.zIndex.afterContext(theme.extra.zIndex.newContext),

      '&$outlined': {
        backgroundColor: 'transparent',
      },
      '&$contained': {
        backgroundColor: theme.palette.primary.dark,
        color: theme.extra.colors.white,
      },

      '&$selected': {
        borderColor: theme.palette.primary.dark,
      },
      // Reset on touch devices, it doesn't add specificity
      ['@media (hover: none)']: {
        backgroundColor: 'transparent',
      },
    },
    '&$disabled': {
      borderColor: theme.extra.palette.control.border.disabled,
      color: theme.extra.colors.mercury,
      '&$contained': {
        backgroundColor: theme.extra.colors.wildSand,
      },
    },
    '&$selected': {
      borderColor: theme.palette.primary.main,
      fontWeight: 600,

      '&$contained': {
        color: theme.extra.colors.white,
        backgroundColor: theme.palette.primary.main,
      },
    },
    '&:not(:first-child)': {
      marginLeft: -1,
    },
  }),
  selected: rule({
    zIndex: theme.extra.zIndex.afterContext(theme.extra.zIndex.newContext),
    '&:after': {
      opacity: 0,
    },
  }),

  label: rule({
    textTransform: 'initial',
  }),

  disabled: {},
  contained: {},
  outlined: {},
});

// TODO ds: rewrite after transition to @material-ui/styles
export const provideStyles = (muiWithStyles as typeof withStyles)(styles);

export type StylesProps = WithStyles<typeof styles>;
