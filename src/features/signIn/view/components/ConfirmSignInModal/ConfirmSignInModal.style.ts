import { withStyles, Theme, WithStyles } from 'shared/styles';
import { rule } from 'shared/helpers/style';

const styles = ({ extra: theme }: Theme) => ({
  root: rule({
    padding: theme.spacing.unit * 4,
  }),
  paragraph: rule({
    fontSize: '1rem',
    marginTop: theme.spacing.unit * 2,
  }),
  address: rule({
    fontSize: '1.5rem',
    color: theme.palette.text.positive,
  }),
  actions: rule({
    display: 'flex',
    marginTop: theme.spacing.unit * 2,
  }),
  action: rule({
    width: 0,
    flexGrow: 1,
    marginRight: theme.spacing.unit * 2,
  }),
  preloader: rule({
    display: 'inline-flex',
    marginLeft: theme.spacing.unit,
  }),
});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
