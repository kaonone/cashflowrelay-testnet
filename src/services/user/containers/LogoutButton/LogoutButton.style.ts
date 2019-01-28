import { withStyles, WithStyles, Theme } from 'shared/styles';
import { rule } from 'shared/helpers/style';

const styles = ({ extra: theme }: Theme) => ({
  root: rule({
    color: 'inherit',
  }),
});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
