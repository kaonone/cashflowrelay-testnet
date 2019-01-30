import * as React from 'react';
import { connect } from 'react-redux';
import CardHeader from '@material-ui/core/CardHeader';
import Card from '@material-ui/core/Card';

import { ITranslateProps, i18nConnect } from 'services/i18n';
import { IAppReduxState } from 'shared/types/app';
import { withDrizzle, InjectDrizzleProps } from 'shared/helpers/react';
import { IconButton } from 'shared/view/elements';
import { Cross } from 'shared/view/elements/Icons';

import { ITransactionInfo } from '../../../namespace';
import * as actions from './../../../redux/actions';
import * as selectors from './../../../redux/selectors';
import { StylesProps, provideStyles } from './Transactions.style';

interface IStateProps {
  transactions: ITransactionInfo[];
}

type IActionProps = typeof mapDispatch;

type IProps = IStateProps & IActionProps & StylesProps & InjectDrizzleProps;

function mapState(state: IAppReduxState): IStateProps {
  return {
    transactions: selectors.selectSentTransactions(state),
  };
}

const mapDispatch = {
  deleteTransaction: actions.deleteTransactionInfo,
};

class Transactions extends React.PureComponent<IProps & ITranslateProps, {}> {
  public render() {
    const { classes, transactions, deleteTransaction, drizzleState } = this.props;

    return (
      <div className={classes.root}>
        {transactions.map(item => {
          const txHash = drizzleState.transactionStack[item.stackId];
          if (!txHash) { return null; }

          const transaction = drizzleState.transactions[txHash];

          return (
            <Card key={txHash} className={classes.transaction}>
              <CardHeader
                title={txHash}
                subheader={transaction.status}
                action={(
                  <IconButton onClick={deleteTransaction.bind(null, item.stackId)}>
                    <Cross />
                  </IconButton>
                )}
              />
            </Card>
          );
        })}
      </div>
    );
  }
}

export { Transactions };
export default (
  connect(mapState, mapDispatch)(
    i18nConnect(
      withDrizzle(
        provideStyles(Transactions),
      ),
    ),
  )
);
