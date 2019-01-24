import * as React from 'react';
import { IContract, Drizzle } from 'drizzle';

import daiABI from 'blockchain/abi/dai.json';
import { SignTransactionModal } from 'services/signTransaction';
import { LoadingContainer } from 'shared/view/components';

class App extends React.Component {
  public render() {
    const { children } = this.props;

    return (
      <LoadingContainer onInitialize={this.onDrizzleInitialize}>
        {children}
        <SignTransactionModal />
      </LoadingContainer>
    );
  }

  public onDrizzleInitialize(drizzle: Drizzle) {
    const contracts: IContract[] = [
      {
        contractName: 'DAI',
        web3Contract: new drizzle.web3.eth.Contract(daiABI, '0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359'),
      },
    ];
    contracts.forEach(drizzle.addContract.bind(drizzle));
  }
}

export default App;
