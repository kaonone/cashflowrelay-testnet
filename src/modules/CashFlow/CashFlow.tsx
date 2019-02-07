import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import routes from 'modules/routes';
import { isLoggedRedirect } from 'modules/shared/checkAuth';
import { IModule } from 'shared/types/app';

import CashFlow from './view/CashFlow/CashFlow';
import CreateCashFlow from './view/CreateCashFlow/CreateCashFlow';

const MarketplaceModule: IModule = {
  getRoutes() {
    return [(
      <Route key="cashFlow" path={routes.cashFlows.getRoutePath()}>
        <Switch>
          <Route path={routes.cashFlows.type.getRoutePath()} component={isLoggedRedirect(CashFlow)} />
          <Redirect to={routes.cashFlows.type.getRedirectPath({ type: 'obligations' })} />
        </Switch>
      </Route>
    ), (
      <Route key="createCashFlow" path={routes.create.getRoutePath()} component={isLoggedRedirect(CreateCashFlow)} />
    )];
  },
};

export default MarketplaceModule;
