import { withStyles, WithStyles } from 'shared/styles';
import { rule } from 'shared/helpers/style';

const styles = {
  root: rule({
    boxShadow: 'unset',
    display: 'flex',
    borderRadius: 0,
  }),
  selected: rule({

  }),
};

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
