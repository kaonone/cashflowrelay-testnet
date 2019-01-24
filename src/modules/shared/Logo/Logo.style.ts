import { withStyles, Theme, WithStyles } from 'shared/styles';
import { rule } from 'shared/helpers/style';

import { IProps } from './Logo';

const styles = ({ extra: theme }: Theme) => ({

  root: rule({
    display: 'flex',
    flexDirection: (props: IProps) => props.viewType,
    alignItems: 'center',
    textDecoration: 'none',
    fontSize: '1em',
  }),

  title: rule({
    display: ({ onlyIcon }: IProps) => onlyIcon ? 'none' : 'unset',
    fontSize: '0.45em',
    fontFamily: theme.typography.primaryFont,
    fontWeight: 'bold',
    color: theme.palette.text.positive,
    letterSpacing: '0.07em',
  }),

  logo: rule({
    fontSize: '1em',
    flexShrink: 0,
    marginRight: ({ viewType, onlyIcon }: IProps) => viewType === 'row' && !onlyIcon ? '0.5em' : 0,
    marginBottom: ({ viewType }: IProps) => viewType === 'row' ? 0 : '0.65em',
  }),
});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
