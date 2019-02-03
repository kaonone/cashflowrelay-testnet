import { withStyles, Theme, WithStyles } from 'shared/styles';
import { rule } from 'shared/helpers/style';

const styles = ({ extra: theme }: Theme) => ({
  root: rule({
    position: 'relative',
    width: '14.375rem',
    border: `solid 0.0625rem ${theme.colors.tundora}`,
    borderRadius: '0.25rem 0.25rem 0 0',
  }),

  header: rule({
    padding: theme.spacing.unit,
    textAlign: 'center',
    background: theme.colors.electricViolet,
    color: theme.colors.white,
  }),

  content: rule({
    position: 'absolute',
    top: '100%',
    left: '-1px',
    right: '-1px',
    padding: '0.75rem 0.9375rem 1.125rem',
    border: `solid 0.0625rem ${theme.colors.tundora}`,
    borderTop: `none`,
    borderRadius: '0 0 0.25rem 0.25rem',
    backgroundColor: theme.colors.white,
  }),

  description: rule({
    marginBottom: theme.spacing.unit,
    fontSize: '0.625rem',
    color: theme.colors.tundora,
  }),

  action: rule({
    fontSize: '10px',
  }),

});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
