import { withStyles, Theme, WithStyles } from 'shared/styles';
import { rule } from 'shared/helpers/style';

const styles = ({ extra: theme }: Theme) => ({
  root: rule({
    position: 'absolute',
    width: '100%',
    maxWidth: theme.sizes.page.maxWidth,
    zIndex: 9,
    top: '7rem',
    left: '50%',
    transform: 'translateX(-50%)',
  }),
  notification: rule({
    backgroundColor: theme.colors.harp,
  }),
  title: rule({
    fontSize: '1rem',
    fontWeight: 'bold',
  }),
  infoNotification: rule({
    backgroundColor: theme.colors.springWood,
  }),
  positiveNotification: rule({
    backgroundColor: theme.colors.harp,
  }),
  negativeNotification: rule({
    backgroundColor: theme.colors.valencia,
  }),
});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
