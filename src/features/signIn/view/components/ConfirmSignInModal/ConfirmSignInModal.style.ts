import { withStyles, Theme, WithStyles } from 'shared/styles';
import { rule } from 'shared/helpers/style';

const styles = ({ extra: theme }: Theme) => ({
  root: rule({
    padding: theme.spacing.unit * 3,
    paddingTop: theme.spacing.unit * 1.5,
  }),
  address: rule({
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: theme.palette.text.positive,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  }),

  paragraph: rule({
    fontSize: '0.625rem',
    color: theme.colors.tundora,
    marginTop: theme.spacing.unit * 2,
  }),

  actions: rule({
    display: 'flex',
    marginTop: theme.spacing.unit * 2,
    fontSize: '0.75rem',
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
