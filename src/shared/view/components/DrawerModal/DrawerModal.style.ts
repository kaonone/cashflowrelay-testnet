import { withStyles, Theme, WithStyles } from 'shared/styles';
import { rule } from 'shared/helpers/style';

const styles = ({ extra: theme }: Theme) => ({
  root: rule({
    padding: '2rem 2.375rem',
    color: theme.colors.silver,
    fontFamily: theme.typography.primaryFont,
  }),

  title: rule({
    fontSize: '21px',
    fontWeight: 'bold',
    marginBottom: '2rem',
  }),

  content: rule({

  }),
  hint: rule({
    display: 'flex',
    alignItems: 'center',
    padding: '0.75rem 1.375rem',
    fontSize: '0.75rem',
    border: `solid 0.125rem ${theme.colors.silver}`,
    borderRadius: '0.25rem',
  }),

  hintIcon: rule({
    marginRight: '1.875rem',
    fontSize: '2rem',
    color: theme.colors.silver,
  }),

  actions: rule({
    marginTop: '3.4375rem',
  }),

  action: rule({
    marginBottom: '0.875rem',
  }),

  cancelButton: rule({
    color: theme.colors.dustyGray,
    borderColor: theme.colors.dustyGray,
  }),
});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
