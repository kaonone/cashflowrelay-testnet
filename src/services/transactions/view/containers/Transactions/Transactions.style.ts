import { withStyles, Theme, WithStyles } from 'shared/styles';
import { rule } from 'shared/helpers/style';

const styles = ({ extra: theme }: Theme) => ({
  root: rule({}),
  transaction: rule({
    marginBottom: theme.spacing.unit,

    '&:last-child': {
      marginBottom: 0,
    },
  }),
});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
