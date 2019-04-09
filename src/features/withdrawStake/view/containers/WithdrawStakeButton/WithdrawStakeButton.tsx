import * as React from 'react';
import { Web3Wrapper } from '@0x/web3-wrapper';

import { ITranslateProps, i18nConnect } from 'services/i18n';
import { SendTransactionButton } from 'services/transactions';
import { IToken } from 'shared/types/models';
import { DECIMAL } from 'shared/constants';

import { StylesProps, provideStyles } from './WithdrawStakeButton.style';

interface IOwnProps {
  token: IToken;
  disabled?: boolean;
}

type IProps = IOwnProps & StylesProps & ITranslateProps;

class WithdrawStakeButton extends React.PureComponent<IProps> {

  public render() {
    const { token } = this.props;

    const disabled = this.props.disabled || token.stakeSize.comparedTo(0) === 0;

    return (
      <SendTransactionButton<'withdrawStake'>
        type="withdrawStake"
        data={{ tokenId: token.id, amount: Web3Wrapper.toBaseUnitAmount(token.stakeSize, DECIMAL) }}
        disabled={disabled}
        variant="contained"
        color="primary"
      >
        Withdraw Stake
      </SendTransactionButton>
    );
  }
}

export { WithdrawStakeButton };
export default i18nConnect(provideStyles(WithdrawStakeButton));
