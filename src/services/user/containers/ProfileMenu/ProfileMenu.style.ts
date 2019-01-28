import { withStyles, WithStyles, Theme } from 'shared/styles';
import { rule } from 'shared/helpers/style';

import metamask from './images/metamask.svg';

const styles = ({ extra: theme }: Theme) => ({

  paper: rule({
    marginTop: '0.625rem',
    border: `solid 0.0625rem ${theme.colors.mercury}`,
    boxShadow: '0 0.125rem 0.1875rem 0 rgba(184, 184, 184, 0.5)',
  }),

  root: rule({
    position: 'relative',
    padding: '1.375rem 1.375rem 0',
    fontFamily: theme.typography.primaryFont,
    color: theme.colors.tundora,
  }),

  cross: rule({
    position: 'absolute',
    top: '0.125rem',
    right: '0.125rem',
    zIndex: theme.zIndex.newContext + 1,
  }),

  crossIcon: rule({
    fontSize: '0.875rem',
  }),

  content: rule({
    display: 'flex',
    paddingBottom: '1.125rem',
    borderBottom: `solid 0.0625rem ${theme.colors.mercury}`,
  }),

  avatar: rule({
    width: '2.5rem',
    height: '2.5rem',
    marginRight: '1.25rem',
    borderRadius: '100%',
    backgroundImage: `url(${metamask})`,
    backgroundSize: '80%',
    backgroundPosition: '50% 50%',
    backgroundRepeat: 'no-repeat',
    backgroundColor: '#d8d8d8',
  }),

  information: rule({}),

  title: rule({
    marginBottom: '0.6875rem',
    fontSize: '0.75rem',
  }),

  walletAddress: rule({
    marginBottom: '0.3125rem',
    fontSize: '0.625rem',
    color: theme.colors.dustyGray,
  }),

  address: rule({
    fontSize: '0.625rem',
  }),

  logoutButton: rule({
    margin: '0.125rem 0 0.125rem 2.75rem',
    fontSize: '0.625rem',
    color: theme.colors.tundora,

  }),
});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
