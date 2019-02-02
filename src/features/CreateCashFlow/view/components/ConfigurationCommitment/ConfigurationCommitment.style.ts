import { withStyles, Theme, WithStyles } from 'shared/styles';
import { rule } from 'shared/helpers/style';

const styles = ({ extra: theme }: Theme) => ({
  root: rule({
    color: theme.palette.text.primary,
    fontFamily: theme.typography.primaryFont,
  }),

  title: rule({
    marginBottom: '1rem',
    fontSize: '2rem',
    fontWeight: 'bold',
  }),

  description: rule({
    marginBottom: '1.25rem',
    fontSize: '0.875rem',
    fontWeight: 600,
    color: theme.colors.dustyGray,
  }),

  borrowAmount: rule({
    display: 'flex',
    alignItems: 'baseline',
    fontSize: '1.5rem',
    color: theme.colors.purpleHeart,
  }),

  borrowAmountInput: rule({
    width: '7rem',
    margin: '0 0.9375rem 0 0.5625rem',
  }),

  borrowAmountValue: rule({
    padding: '0',
    color: theme.colors.purpleHeart,
    fontSize: '2.125rem',
    fontWeight: 600,
    textAlign: 'center',
  }),

  isBold: rule({
    textTransform: 'uppercase',
    fontWeight: 'bold',
  }),

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
