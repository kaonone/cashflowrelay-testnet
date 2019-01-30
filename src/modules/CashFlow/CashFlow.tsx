import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import routes from 'modules/routes';
import { IModule } from 'shared/types/app';

import CashFlow from './view/CashFlow/CashFlow';

const MarketplaceModule: IModule = {
  getRoutes() {
    return (
      <Route key="cashFlow" path={routes.cashFlows.getRoutePath()}>
        <Switch>
          <Route path={routes.cashFlows.type.getRoutePath()} component={CashFlow} />
          <Redirect to={routes.cashFlows.type.getRedirectPath({ type: 'obligations' })} />
        </Switch>
      </Route>
    );
  },
};

export default MarketplaceModule;
