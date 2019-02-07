import { withStyles, WithStyles, Theme } from 'shared/styles';
import { rule } from 'shared/helpers/style';

const styles = (theme: Theme) => ({
  root: rule({
    display: 'flex',
    justifyContent: 'space-between',
  }),

  commitmentFields: rule({
    flexBasis: '40%',
  }),

  loanSummary: rule({
    flexBasis: '40%',
  }),

  preloader: rule({
    display: 'inline-flex',
    marginLeft: theme.spacing.unit,
  }),
});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
