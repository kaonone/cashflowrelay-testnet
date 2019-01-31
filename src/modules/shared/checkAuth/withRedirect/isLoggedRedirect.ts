import routes from 'modules/routes';
import { selectors } from 'services/user';
import { connectedRouterRedirect } from 'shared/helpers/authWrapper';

export default connectedRouterRedirect({
  authenticatedSelector: () => true, // selectors.selectIsLogged,
  wrapperDisplayName: 'IsNotLoggedRedirect',
  allowRedirectBack: false,
  redirectPath: routes.marketplace.getRedirectPath(),
});
