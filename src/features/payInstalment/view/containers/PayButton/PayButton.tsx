import * as React from 'react';

import { ITranslateProps, i18nConnect } from 'services/i18n';
import { SendTransactionButton } from 'services/transactions';
import { Button } from 'shared/view/elements';

import { StylesProps, provideStyles } from './PayButton.style';

interface IOwnProps {
  type: 'advance' | 'current';
  orderId?: number;
  tokenAmount?: number;
  tokenId: number;
  disabled?: boolean;
}

type IProps = IOwnProps & StylesProps & ITranslateProps;

class PayButton extends React.PureComponent<IProps> {

  public render() {
    const { tokenId, type, disabled, classes, orderId, tokenAmount } = this.props;

    if (type === 'advance' && tokenAmount) {
      return (
        <SendTransactionButton<'executePayment'>
          type="executePayment"
          data={{ tokenId, tokenAmount }}
          variant="contained"
          color="primary"
          disabled={disabled}
        >
          Pay installment
        </SendTransactionButton>
      );
    }

    if (type === 'current' && orderId) {
      return (
        <SendTransactionButton<'executeOrder'>
          type="executeOrder"
          data={{ tokenId, orderId }}
          variant="contained"
          color="primary"
          disabled={disabled}
        >
          Pay installment
        </SendTransactionButton>
      );
    }

    return (
      <Button variant="contained" color="primary" disabled={true}>
        Pay installment
      </Button>
    );
  }
}

export { PayButton };
export default i18nConnect(provideStyles(PayButton));
