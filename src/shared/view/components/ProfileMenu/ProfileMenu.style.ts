import { withStyles, Theme, WithStyles } from 'shared/styles';

import { rule } from 'shared/helpers/style';

import * as avatarStub from './images/avatarStub.svg';

const styles = ({ extra: theme }: Theme) => ({
  root: rule({
    display: 'flex',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  }),

  avatar: rule({
    width: '2.375rem',
    height: '2.375rem',
    flexShrink: 0,
    borderRadius: '50%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundImage: `url(${avatarStub})`,
  }),

  name: rule({
    margin: '0 0.625rem',
    fontFamily: theme.typography.primaryFont,
    fontSize: '0.9375rem',
    color: theme.palette.text.primary,
  }),

  toggle: rule({
    width: '0.75rem',
    paddingTop: '0.2rem',
    color: theme.colors.dustyGray,
  }),

  toggleIcon: rule({
    width: '100%',
    transform: 'rotate(90deg)',
  }),
});

export const provideStyles = withStyles(styles);
export type StylesProps = WithStyles<typeof styles>;
