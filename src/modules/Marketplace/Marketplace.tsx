import * as React from 'react';
import { Route } from 'react-router-dom';

import routes from 'modules/routes';
import { IModule } from 'shared/types/app';

import Marketplace from './view/Marketplace/Marketplace';

const MarketplaceModule: IModule = {
  getRoutes() {
    return (
      <Route
        exact
        key="marketplace"
        path={routes.marketplace.getRoutePath()}
        component={Marketplace}
      />
    );
  },
};

export default MarketplaceModule;
