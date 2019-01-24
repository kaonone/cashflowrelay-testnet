import { withStyles as muiWithStyles } from '@material-ui/core/styles';
import { withStyles, WithStyles, Theme } from 'shared/styles';
import { rule } from 'shared/helpers/style';

const styles = ({ extra: theme }: Theme) => ({

  root: rule({
    width: '100%',

    '&$separated': {
      borderSpacing: '0 1rem',
      borderCollapse: 'separate',
    },
  }),

  separated: {},

  row: rule({
    background: theme.colors.white,
  }),

  text: rule({
    fontWeight: 'normal',
    fontFamily: theme.typography.primaryFont,
    color: theme.palette.text.primary,
  }),

  cell: rule({
    composes: '$text',
    fontSize: '0.9375rem',

    '&:first-child': {
      paddingLeft: '3.125rem',
    },
    '&:last-child': {
      paddingRight: '3.125rem',
    },
  }),
});

// TODO ds: rewrite after transition to @material-ui/styles
export const provideStyles = (muiWithStyles as typeof withStyles)(styles);

export type StylesProps = WithStyles<typeof styles>;
