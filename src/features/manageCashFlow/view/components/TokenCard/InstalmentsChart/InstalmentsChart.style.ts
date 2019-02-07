import { withStyles, WithStyles, Theme } from 'shared/styles';
import { rule } from 'shared/helpers/style';

const styles = ({ extra: theme }: Theme) => ({
  root: rule({
    width: '100%',
    height: '100%',
  }),
  content: rule({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }),
  title: rule({
    marginBottom: '0.25rem',
    fontFamily: theme.typography.primaryFont,
    fontSize: '0.5rem',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
  }),

  progress: rule({
    width: '3.75rem',
    height: '0.125rem',
    backgroundColor: theme.colors.silver,
  }),

  progressValue: rule({
    maxWidth: '100%',
    height: '100%',
    backgroundColor: theme.colors.electricViolet,
  }),
});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
