import * as React from 'react';

import { BaseLayout } from 'modules/shared';
import { InjectedAuthRouterProps } from 'shared/helpers/authWrapper';

type IProps = InjectedAuthRouterProps;

class Marketplace extends React.PureComponent<IProps> {

  public render() {
    return (
      <BaseLayout>
        Marketplace
      </BaseLayout>
    );
  }

}

export default Marketplace;
