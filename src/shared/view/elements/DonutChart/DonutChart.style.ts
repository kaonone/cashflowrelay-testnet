import { withStyles, WithStyles } from 'shared/styles';
import { rule } from 'shared/helpers/style';

const styles = () => ({
  root: rule({
    position: 'relative',
    width: '100%',
    height: '100%',
  }),
  values: rule({
    position: 'absolute',
    top: 0,
  }),
  content: rule({
    top: 0,
    padding: '0 15%',
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),
});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
