import { withStyles, Theme, WithStyles } from 'shared/styles';
import { rule } from 'shared/helpers/style';

const styles = ({ extra: theme }: Theme) => ({
  root: rule({
    width: '26.875rem',
    backgroundColor: theme.colors.blackCurrant,
  }),

  usdAmount: rule({
    marginBottom: '2rem',
    fontSize: '0.75rem',
    textAlign: 'right',
  }),

  cssOutlinedInput: {
    '&$cssFocused $notchedOutline, &:hover $notchedOutline': {
      borderColor: `${theme.colors.silver} !important`,
    },
  },
  cssFocused: {},
  notchedOutline: {
    borderColor: `${theme.colors.silver} !important`,
  },

  sellPrice: rule({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.75rem',
    fontSize: '1.125rem',
  }),

  sellInput: rule({
    flexBasis: '7.5rem',
    display: 'flex',
    alignItems: 'center',
  }),
  sellInputField: rule({
    marginRight: '0.5rem',
  }),
  input: rule({
    padding: '0.625rem 1rem',
    textAlign: 'center',
    color: theme.colors.silver,
  }),
});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
