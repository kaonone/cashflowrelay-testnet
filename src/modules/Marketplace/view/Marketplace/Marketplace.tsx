import * as React from 'react';

import { BaseLayout } from 'modules/shared';
import { InjectedAuthRouterProps } from 'shared/helpers/authWrapper';
import { AddMinterButton } from 'features/addMinter';
import { SendTransactionButton, ShowMainContractData } from 'services/transactions';
import { withDrizzle, InjectDrizzleProps } from 'shared/helpers/react';

type IProps = InjectedAuthRouterProps & InjectDrizzleProps;

let counter = 1;

// tslint:disable:jsx-no-lambda
class Marketplace extends React.PureComponent<IProps> {
  public render() {
    const account = this.props.drizzleState.accounts[0];
    return (
      <BaseLayout>
        <AddMinterButton />
        <div>
          Account is minter: <ShowMainContractData type="isMinter" data={{ address: account }} />
        </div>
        <div>
          Owner of 1 token: <ShowMainContractData type="ownerOf" data={{ tokenId: 1 }} />
        </div>
        <div>
          Owner of 2 token: <ShowMainContractData type="ownerOf" data={{ tokenId: 2 }} />
        </div>
        <div>
          Owner of 3 token: <ShowMainContractData type="ownerOf" data={{ tokenId: 2 }} />
        </div>
        <SendTransactionButton<'createToken'>
          type="createToken"
          variant="contained"
          color="primary"
          data={{ tokenId: counter }}
          onClick={() => counter++}
        >
          Mint
        </SendTransactionButton><br />
        Marketplace
      </BaseLayout>
    );
  }

}

export default withDrizzle(Marketplace);
