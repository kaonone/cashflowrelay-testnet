import { withStyles, WithStyles, Theme } from 'shared/styles';
import { rule } from 'shared/helpers/style';

const styles = ({ extra: theme }: Theme) => ({
  root: rule({
    display: 'flex',
    alignItems: 'stretch',
  }),

  link: rule({
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: theme.palette.text.primary,
    fontFamily: theme.typography.primaryFont,
    tapHighlightColor: 'rgba(0,0,0,0)',
    borderRadius: 0,
    marginRight: '2.125rem',
    padding: theme.spacing.unit,
    borderBottom: `solid transparent 2px`,

    '&:last-child': rule({
      marginRight: 0,
    }),

    '&$isActive': rule({
      fontWeight: 'bold',
      letterSpacing: '-0.03rem',
      borderColor: theme.palette.control.border.focus,
    }),
  }),

  isActive: {},
});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
