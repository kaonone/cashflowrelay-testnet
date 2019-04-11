import * as React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';

import { BaseLayout } from 'modules/shared';
import routes from 'modules/routes';
import { useMainContractData } from 'services/transactions';
import { i18nConnect, ITranslateProps, tKeys as tKeysAll } from 'services/i18n';
import { TokensList } from 'features/manageCashFlow';

import { InjectedAuthRouterProps } from 'shared/helpers/authWrapper';
import { TokenType } from 'shared/types/models';
import { ToggleButtonGroup, ToggleButton, Button } from 'shared/view/elements';
import { withComponent } from 'shared/helpers/react';

import { provideStyles, StylesProps } from './CashFlow.style';

const tKeys = tKeysAll.features.manageCashFlows;

const links: Array<{ type: TokenType, title: string }> = [
  { type: 'obligations', title: tKeys.obligations.getKey() },
  { type: 'incoming', title: tKeys.income.getKey() },
];

const NavToggleButton = withComponent(Link)(ToggleButton);
const NavButton = withComponent(Link)(Button);

type IProps = ITranslateProps & InjectedAuthRouterProps & StylesProps & RouteComponentProps<{ type: TokenType }>;

const transactionByType: Record<TokenType, 'idsOfCashflowsFor' | 'idsOfSubscribedCashflowsFor'> = {
  incoming: 'idsOfCashflowsFor',
  obligations: 'idsOfSubscribedCashflowsFor',
  selling: 'idsOfSubscribedCashflowsFor',
};

function Marketplace(props: IProps) {
  const { classes, t, match: { params: { type: selectedType } } } = props;
  const { data } = useMainContractData(transactionByType[selectedType], {});
  return (
    <BaseLayout>
      <div className={classes.root}>
        <div className={classes.head}>
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
          <NavButton to={routes.create.getRedirectPath()} color="primary" variant="outlined">
            {t(tKeys.borrowLink.getKey())}
          </NavButton>
        </div>
        {!data ? 'Loading...' : <TokensList type={selectedType} tokenIds={data} />}
      </div>
    </BaseLayout>
  );
}

export default withRouter(i18nConnect(provideStyles(Marketplace)));
