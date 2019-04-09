import { withStyles, Theme, WithStyles } from 'shared/styles';
import { rule } from 'shared/helpers/style';

const styles = ({ extra: theme }: Theme) => ({
  root: rule({
    padding: '1.875rem 2.5rem',
    boxShadow: '0 0.125rem 0.25rem 0 rgba(184, 184, 184, 0.5)',
    borderRadius: '0.5rem',
    fontFamily: theme.typography.primaryFont,
    fontSize: '0.875rem',
    fontWeight: 600,
    color: theme.palette.text.primary,
  }),

  title: rule({
    marginBottom: '1.5625rem',
    fontWeight: 'bold',
  }),

  nameInput: rule({
    marginBottom: '2.1875rem',
  }),

  nameInputLabel: rule({
    marginBottom: '0.3125rem',
  }),

  nameInputDescription: rule({
    marginBottom: '1.0625rem',
    color: theme.colors.dustyGray,
  }),

  field: rule({
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '1.0625rem',

    '&:nth-child(4)': {
      marginBottom: '2.375rem',
    },
  }),

  fieldName: rule({
  }),

  fieldValue: rule({
    fontWeight: 'bold',
    color: theme.colors.black,
  }),

  actions: {},

  action: {},
});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
