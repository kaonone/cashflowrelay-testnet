import * as React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';

import { BaseLayout } from 'modules/shared';
import routes from 'modules/routes';
import { TokensList } from 'features/manageCashFlow';
import { i18nConnect, ITranslateProps, tKeys as tKeysAll } from 'services/i18n';
import { InjectedAuthRouterProps } from 'shared/helpers/authWrapper';
import { TokenType } from 'shared/types/models';
import { ToggleButtonGroup, ToggleButton } from 'shared/view/elements';
import { withComponent } from 'shared/helpers/react';

import { provideStyles, StylesProps } from './CashFlow.style';

const tKeys = tKeysAll.features.manageCashFlows;

const links = [
  { type: 'obligations', title: tKeys.obligations.getKey() },
  { type: 'income', title: tKeys.income.getKey() },
];

const NavToggleButton = withComponent(Link)(ToggleButton);

type IProps = ITranslateProps & InjectedAuthRouterProps & StylesProps & RouteComponentProps<{ type: TokenType }>;

class Marketplace extends React.PureComponent<IProps> {
  public render() {

    const { classes, t, match: { params: { type: selectedType } } } = this.props;
    return (
      <BaseLayout>
        <div className={classes.root}>
          <ToggleButtonGroup className={classes.links} value={selectedType} exclusive nullable={false} >
            {links.map(({ type, title }, index: number) => (
              <NavToggleButton
                className={classes.link}
                key={index}
                to={routes.cashFlows.type.getRedirectPath({ type })}
                variant="outlined"
                value={type}
              >
                <span>{t(title)}</span>
              </NavToggleButton>
            ))}
          </ToggleButtonGroup>
          <TokensList type={selectedType} />
        </div>
      </BaseLayout>
    );
  }

}

export default withRouter(i18nConnect(provideStyles(Marketplace)));
