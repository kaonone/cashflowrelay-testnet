import * as R from 'ramda';

import routes from 'modules/routes';
import { selectors } from 'services/user';
import { locationHelperBuilder, connectedRouterRedirect } from 'shared/helpers/authWrapper';

const locationHelper = locationHelperBuilder({});

export default connectedRouterRedirect({
  authenticatedSelector: R.pipe(selectors.selectIsLogged, R.not),
  wrapperDisplayName: 'IsLoggedRedirect',
  allowRedirectBack: false,
  redirectPath: (_state, ownProps) =>
    locationHelper.getRedirectQueryParam(ownProps) || routes.marketplace.getRedirectPath(),
});
