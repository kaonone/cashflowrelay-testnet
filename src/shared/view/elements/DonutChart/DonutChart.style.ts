import { withStyles, WithStyles, Theme } from 'shared/styles';
import { rule } from 'shared/helpers/style';

const styles = ({ extra: theme }: Theme) => ({
  root: rule({
    position: 'relative',
    width: '100%',
    height: '100%',
  }),
  values: rule({
    position: 'absolute',
    top: 0,
  }),
  title: rule({
    fontFamily: theme.typography.primaryFont,
    fontSize: '0.75rem',
    fontWeight: 'bold',
    top: 0,
    padding: '0 15%',
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
  }),
});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
