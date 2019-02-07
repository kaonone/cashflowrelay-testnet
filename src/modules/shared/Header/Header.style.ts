import { withStyles, Theme, WithStyles } from 'shared/styles';
import { rule } from 'shared/helpers/style';

const styles = ({ extra: theme }: Theme) => ({

  root: rule({
    zIndex: theme.zIndex.mobileHeader,
    position: 'relative',
    width: '100%',
    background: theme.colors.white,
    boxShadow: '0 1px 2px 0 rgba(224, 224, 224, 0.5)',
  }),

  content: rule({
    display: 'flex',
    alignItems: 'center',
    maxWidth: theme.sizes.page.maxWidth,
    minHeight: theme.sizes.header.minHeightDesktop,
    padding: `0 ${theme.spacing.unit * 4}px`,
    margin: '0 auto',
  }),

  logo: rule({
    marginRight: '4.2rem',
    fontSize: '3rem',
  }),

  desktopMenu: rule({
    display: 'flex',
    alignSelf: 'stretch',
    alignItems: 'stretch',
  }),

  accountStatus: rule({
    marginLeft: 'auto',
  }),

  signInDescription: rule({
    marginBottom: theme.spacing.unit,
  }),

  signButton: rule({
    fontSize: '0.625rem',
  }),
});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
