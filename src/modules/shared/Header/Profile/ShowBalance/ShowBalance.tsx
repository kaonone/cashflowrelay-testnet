import * as React from 'react';
import { Button } from 'shared/view/elements';
import { withDrizzle, InjectDrizzleProps } from 'shared/helpers/react';

import { provideStyles, StylesProps } from './ShowBalance.style';

interface IState {
  balanceKey: string;
  decimalsKey: string;
}

interface IOwnProps {
  token: 'DAI' | 'AKT';
}

type IProps = IOwnProps & InjectDrizzleProps & StylesProps;

class ShowBalance extends React.Component<IProps, IState> {
  public state: IState = { balanceKey: '', decimalsKey: '' };

  public componentDidMount() {
    const { drizzle, drizzleState, token } = this.props;
    const contract = drizzle.contracts[token];

    const address = drizzleState.accounts[0];

    const balanceKey = contract.methods.balanceOf.cacheCall(address);
    const decimalsKey = contract.methods.decimals.cacheCall();

    this.setState({ balanceKey, decimalsKey });
  }

  public render() {
    const { classes, token } = this.props;
    const balance = this.getBalance();
    return balance !== null && <Button className={classes.root} disabled variant="outlined">{token}: {balance}</Button>;
  }

  private getBalance(): number | null {
    const { token } = this.props;
    const contract = this.props.drizzleState.contracts[token];

    const balance = contract.balanceOf[this.state.balanceKey];
    const decimals = contract.decimals[this.state.decimalsKey];

    if (balance && decimals) {
      return Number(balance.value) / 10 ** Number(decimals.value);
    }
    return null;
  }
}

export default withDrizzle(provideStyles(ShowBalance));
