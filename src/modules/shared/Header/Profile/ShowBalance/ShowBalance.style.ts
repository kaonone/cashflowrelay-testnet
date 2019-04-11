import { withStyles, WithStyles, Theme } from 'shared/styles';
import { rule } from 'shared/helpers/style';

const styles = ({ extra: theme }: Theme) => ({
  root: rule({
    border: 'none',
    borderRadius: 0,
    borderRight: `solid 1px ${theme.colors.tundora}`,
    fontSize: '0.75rem',
    fontWeight: 'bold',

    '&:last-child': {
      border: 'none',
    },

    '&:disabled': {
      color: theme.colors.tundora,
    },
  }),

});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
