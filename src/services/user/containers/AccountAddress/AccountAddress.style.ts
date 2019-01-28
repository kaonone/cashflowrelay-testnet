import { withStyles, WithStyles, Theme } from 'shared/styles';
import { rule } from 'shared/helpers/style';

const styles = ({ extra: theme }: Theme) => ({

  root: rule({
    fontFamily: theme.typography.primaryFont,
    fontSize: '0.75rem',
    boxShadow: 'none',
    borderRadius: 0,
  }),

  arrowIcon: rule({
    marginLeft: '0.125rem',
    transform: 'rotate(90deg)',
    fontSize: '0.7rem',
  }),

});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
