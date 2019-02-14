import { withStyles, Theme, WithStyles } from 'shared/styles';

import { rule } from 'shared/helpers/style';

const styles = ({ extra: theme }: Theme) => ({
  root: rule({
    width: '100%',
    display: 'flex',
    padding: '0 !important',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontFamily: theme.typography.primaryFont,
    color: theme.palette.text.primary,
  }),

  title: rule({
    flexBasis: theme.tableColumns.width.name,
    fontSize: '1.125rem',
    fontWeight: 'bold',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }),

  payersRating: rule({
    display: 'flex',
    flexBasis: theme.tableColumns.width.payersRating,
  }),

  payersRatingValue: rule({
    width: '2.5rem',
    display: 'flex',
    justifyContent: 'center',
    padding: '0.3125rem',
    borderRadius: '0.25rem',
    backgroundColor: '#b8e986',
    fontWeight: 600,
    fontSize: '0.625rem',
  }),

  text: rule({
    fontWeight: 600,
    fontSize: '0.625rem',
  }),

  stars: rule({
    flexBasis: theme.tableColumns.width.rating,
    paddingRight: theme.spacing.unit / 2,
  }),

  nextInstalmentCell: rule({
    display: 'flex',
    flexBasis: theme.tableColumns.width.nextInstalment,
  }),
  nextInstalment: rule({
    flexGrow: 1,
    marginRight: theme.spacing.unit / 2,
    display: 'flex',
    justifyContent: 'center',
    fontWeight: 600,
    fontSize: '0.625rem',
    padding: '0.3125rem 0.625rem',
    border: `solid 0.0625rem ${theme.palette.text.primary}`,
    borderRadius: '0.25rem',
  }),

  instalments: rule({
    display: 'flex',
    flexBasis: theme.tableColumns.width.performance,
    alignItems: 'center',
  }),

  instalment: rule({
    composes: '$text',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.colors.white,
    borderRadius: '0.25rem',
    width: '1.375rem',
    height: '1.375rem',
    marginRight: '0.1875rem',

    '&$paid': {
      backgroundColor: theme.colors.salem,
    },
    '&$due': {
      backgroundColor: theme.colors.buttercup,
    },
    '&$missed': {
      backgroundColor: theme.colors.monza,
    },

  }),

  paid: {},
  due: {},
  missed: {},

  statusCell: rule({
    display: 'flex',
    flexBasis: theme.tableColumns.width.cashFlowBalance,
  }),
  status: rule({
    flexGrow: 1,
    marginRight: theme.spacing.unit / 2,
    display: 'flex',
    justifyContent: 'center',
    padding: '0.3125rem',
    textTransform: 'uppercase',
    fontWeight: 600,
    fontSize: '0.625rem',
    borderRadius: '0.25rem',
    color: theme.colors.purpleHeart,
    border: `solid 0.0625rem ${theme.colors.purpleHeart}`,

    '&$contained': {
      backgroundColor: theme.colors.purpleHeart,
      color: theme.colors.white,
    },
  }),

  contained: {},

  discountCell: rule({
    display: 'flex',
    flexBasis: theme.tableColumns.width.discount,
  }),
  discount: rule({
    width: '48px',
    display: 'flex',
    justifyContent: 'center',
    fontSize: '0.625rem',
    padding: '0.3125rem 0.625rem',
    borderRadius: '0.25rem',
    border: `solid 0.0625rem ${theme.colors.purpleHeart}`,
    color: theme.colors.purpleHeart,
  }),
  amount: rule({
    flexBasis: theme.tableColumns.width.dueAmount,
    fontSize: '1.125rem',
    fontWeight: 'bold',
  }),

  expandIcon: rule({
    color: theme.colors.dustyGray,
  }),

  isRotated: rule({
    transform: 'rotate(180deg)',
  }),

  withOpacity: rule({
    opacity: 0.4,
  }),
});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
