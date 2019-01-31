import { withStyles, Theme, WithStyles } from 'shared/styles';
import { rule } from 'shared/helpers/style';

const styles = ({ extra: theme }: Theme) => ({
  root: rule({}),

  field: rule({
    marginBottom: theme.spacing.unit * 3,
  }),

  slider: rule({
    marginTop: theme.spacing.unit * 2,
  }),

  actions: rule({
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing.unit * 2,

    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
    },
  }),

  action: rule({
    flexGrow: 1,
    marginBottom: theme.spacing.unit,

    [theme.breakpoints.up('sm')]: {
      marginBottom: 0,
      marginRight: theme.spacing.unit,

      '&:last-child': {
        marginRight: 0,
      },
    },

    '&:last-child': {
      marginBottom: 0,
    },
  }),
});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
