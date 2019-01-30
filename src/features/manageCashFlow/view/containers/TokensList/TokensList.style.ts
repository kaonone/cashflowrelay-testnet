import { withStyles, Theme, WithStyles } from 'shared/styles';

import { rule } from 'shared/helpers/style';

const styles = ({ extra: theme }: Theme) => ({
  root: rule({

  }),

  tokens: rule({

  }),

  header: rule({
    display: 'flex',
    justifyContent: 'space-between',
    margin: '1.3125rem 0',
    padding: '0 1.5rem',
    fontSize: '0.5rem',
    fontWeight: 600,
    color: theme.colors.gray,
  }),

  sortToggleIcon: rule({
    transform: 'rotate(90deg)',
    marginLeft: '0.625rem',
    fontSize: '0.5rem',
  }),

  tokenCard: rule({
    marginBottom: '0.875rem',
  }),

  tokenMetric: rule({
    textTransform: 'uppercase',

    '&$name': {
      flexBasis: theme.tableColumns.width.name,
    },
    '&$payersRating': {
      flexBasis: theme.tableColumns.width.payersRating,
    },
    '&$performance': {
      flexBasis: theme.tableColumns.width.performance,
    },
    '&$rating': {
      flexBasis: theme.tableColumns.width.rating,
    },
    '&$cashFlowBalance': {
      flexBasis: theme.tableColumns.width.cashFlowBalance,
    },
    '&$instalmentSize': {
      flexBasis: theme.tableColumns.width.cashFlowBalance,
    },
    '&$nextInstalment': {
      flexBasis: theme.tableColumns.width.nextInstalment,
    },
    '&$discount': {
      flexBasis: theme.tableColumns.width.discount,
    },
    '&$dueAmount': {
      flexBasis: theme.tableColumns.width.dueAmount,
    },
    '&$price': {
      flexBasis: theme.tableColumns.width.dueAmount,
    },
  }),

  name: {},
  payersRating: {},
  performance: {},
  rating: {},
  nextInstalment: {},
  cashFlowBalance: {},
  instalmentSize: {},
  discount: {},
  dueAmount: {},
  price: {},

  stubCell: rule({
    width: '1.375rem',
  }),
});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
