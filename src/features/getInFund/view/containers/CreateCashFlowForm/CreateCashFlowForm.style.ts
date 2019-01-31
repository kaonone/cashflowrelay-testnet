import { withStyles, Theme, WithStyles } from 'shared/styles';
import { rule } from 'shared/helpers/style';

const styles = ({ extra: theme }: Theme) => ({
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
});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
