import { withStyles, WithStyles, Theme } from 'shared/styles';
import { rule } from 'shared/helpers/style';

const styles = ({ extra: theme }: Theme) => ({
  root: rule({
    backgroundColor: theme.colors.purpleHeart,
    color: theme.colors.white,
    padding: '0.625rem',
    borderRadius: '0.3125rem',
  }),

  wrapper: rule({
    zIndex: 10000,
    marginTop: '8px',
    marginRight: '16px',

    [theme.breakpoints.up('sm')]: {
      marginTop: '16px',
    },
  }),
});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
