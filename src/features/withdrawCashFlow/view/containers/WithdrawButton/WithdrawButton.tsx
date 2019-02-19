import * as React from 'react';
import { Web3Wrapper } from '@0x/web3-wrapper';

import { ITranslateProps, i18nConnect } from 'services/i18n';
import { SendTransactionButton } from 'services/transactions';
import { IToken } from 'shared/types/models';
import { DECIMAL } from 'shared/constants';

import { StylesProps, provideStyles } from './WithdrawButton.style';

interface IOwnProps {
  token: IToken;
  disabled?: boolean;
}

type IProps = IOwnProps & StylesProps & ITranslateProps;

class WithdrawButton extends React.PureComponent<IProps> {

  public render() {
    const { token } = this.props;

    const disabled = this.props.disabled || token.balance.comparedTo(0) === 0;

    return (
      <SendTransactionButton<'withdrawPayments'>
        type="withdrawPayments"
        data={{ tokenId: token.id, amount: Web3Wrapper.toBaseUnitAmount(token.balance, DECIMAL) }}
        disabled={disabled}
        variant="contained"
        color="primary"
      >
        Withdraw DAI
      </SendTransactionButton>
    );
  }
}

export { WithdrawButton };
export default i18nConnect(provideStyles(WithdrawButton));
