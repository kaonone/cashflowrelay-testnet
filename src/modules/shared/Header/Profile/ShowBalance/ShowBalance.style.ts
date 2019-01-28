import { withStyles, WithStyles, Theme } from 'shared/styles';
import { rule } from 'shared/helpers/style';

const styles = ({ extra: theme }: Theme) => ({
  root: rule({
    border: 'none',
    fontSize: '0.75rem',
    fontWeight: 'bold',

    '&:disabled': {
      color: theme.colors.tundora,
    },
  }),

});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
