import { withStyles, WithStyles, Theme } from 'shared/styles';
import { rule, styledBy } from 'shared/helpers/style';

import { IProps } from './RowsLayout';

const styles = ({ extra: theme }: Theme) => ({
  root: rule({
    flexGrow: 1,
    minHeight: '100%',
    backgroundColor: styledBy<IProps, 'background'>('background', {
      primary: theme.colors.white,
      unset: 'unset',
    }, 'unset'),
  }),
  content: rule({
    display: ({ fullHeight }: IProps) => fullHeight ? 'flex' : 'unset',
    flexGrow: 1,
  }),
});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
