import * as React from 'react';
import { Route, RouteComponentProps, Redirect, Switch } from 'react-router-dom';

import { App } from 'modules/App';
import routes from 'modules/routes';
import { PageNotFound } from 'modules/shared';

import { IModule } from 'shared/types/app';

function getRoutes(modules: IModule[]): React.ReactElement<RouteComponentProps<any>> {
  return (
    <Route path={routes.root()}>
      <App>
        <Switch>
          {modules.map(module => module.getRoutes ? module.getRoutes() : null)}
          <Redirect exact from={routes.root()} to={routes.marketplace.getRedirectPath()} />
          <Route component={PageNotFound} />
        </Switch>
      </App>
    </Route>
  );
}

export default getRoutes;
