import { withStyles, WithStyles, Theme } from 'shared/styles';
import { IProps } from './BaseSlider';

import { rule } from 'shared/helpers/style';

const thumbSize = 1.375;
const trachHeight = 0.1875;
const crutchMargin = thumbSize * 2;
const crutchPadding = crutchMargin + trachHeight;

const styles = (theme: Theme) => ({
  root: rule({
    margin: `-${crutchMargin}rem`,
    padding: `${crutchPadding}rem`,
    overflow: 'hidden',
  }),
  labels: rule({
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.extra.spacing.unit * 2,
    fontFamily: theme.extra.typography.primaryFont,
    color: theme.extra.palette.text.secondary,
    fontSize: '0.75rem',
  }),
  thumb: rule({
    width: `${thumbSize}rem`,
    height: `${thumbSize}rem`,
    '$disabled &': rule({
      width: `${thumbSize}rem`,
      height: `${thumbSize}rem`,
    }),
  }),
  disabled: rule({}),
  track: rule({
    height: `${trachHeight}rem`,
    width: '100%',
  }),
  trackAfter: rule({
    height: `${trachHeight}rem`,
    backgroundColor: theme.extra.colors.silver,
  }),
  runnerWrapper: rule({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    width: `${thumbSize}rem`,
    height: `${thumbSize}rem`,
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.5)',
    backgroundColor: (props: IProps) => props.disabled ? theme.extra.colors.alto : theme.extra.colors.silver,
  }),
  runner: rule({
    margin: '0, auto',
    borderRadius: 50,
    width: '0.75rem',
    height: '0.75rem',
    backgroundColor: (props: IProps) => props.disabled ? theme.extra.colors.silverChalice : theme.palette.primary.main,
  }),
});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
