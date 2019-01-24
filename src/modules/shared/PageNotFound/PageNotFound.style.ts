import { withStyles, Theme, WithStyles } from 'shared/styles';
import { rule, hexToRGBA } from 'shared/helpers/style';

const styles = ({ extra: theme }: Theme) => ({

  root: rule({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  }),

  title: rule({
    marginBottom: '2.5rem',
    fontSize: '8.5rem',
    fontFamily: theme.typography.primaryFont,
    fontWeight: 'bold',
    color: hexToRGBA(theme.colors.heavyMetal, 0.13),
  }),

  description: rule({
    fontSize: '1.125rem',
    fontFamily: theme.typography.primaryFont,
    color: theme.colors.black,
  }),

});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
