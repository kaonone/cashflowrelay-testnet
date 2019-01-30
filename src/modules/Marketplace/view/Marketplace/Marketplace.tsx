import * as React from 'react';

import { BaseLayout } from 'modules/shared';
import { InjectedAuthRouterProps } from 'shared/helpers/authWrapper';
import { TokensList } from 'features/manageCashFlow';

type IProps = InjectedAuthRouterProps;

class Marketplace extends React.PureComponent<IProps> {

  public render() {
    return (
      <BaseLayout>
        <TokensList type="selling" />
      </BaseLayout>
    );
  }

}

export default Marketplace;
