import * as React from 'react';
import { NavLink } from 'react-router-dom';

import { i18nConnect, ITranslateProps, tKeys } from 'services/i18n';

import { withComponent } from 'shared/helpers/react';
import { Button } from 'shared/view/elements';

import routes from '../../../routes';
import { StylesProps, provideStyles } from './Menu.style';

interface IProps {
  isLogged: boolean;
}

interface IMenuItem {
  to: string;
  label: string;
}

const getItems = (isLogged: boolean) => ([] as IMenuItem[])
  .concat(isLogged ? [
    { label: tKeys.shared.menu.myCashflows.getKey(), to: routes.cashFlows.getRoutePath() },
  ] : [])
  .concat([{ label: tKeys.shared.menu.marketplace.getKey(), to: routes.marketplace.getRedirectPath() }]);

const NavButton = withComponent(NavLink)(Button);

function Menu(props: IProps & StylesProps & ITranslateProps) {
  const { classes, t } = props;

  return (
    <nav className={classes.root}>
      {getItems(props.isLogged).map(item => (
        <NavButton
          variant="text"
          key={item.label}
          className={classes.link}
          activeClassName={classes.isActive}
          to={item.to}
        >
          <span>{t(item.label)}</span>
        </NavButton>
      ))}
    </nav>
  );
}

export { IProps };
export default i18nConnect(provideStyles(Menu));
