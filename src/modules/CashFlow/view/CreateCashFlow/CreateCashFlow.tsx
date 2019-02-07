import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { bind } from 'decko';

import routes from 'modules/routes';
import { BaseLayout } from 'modules/shared';
import { CreateCashFlowForm } from 'features/CreateCashFlow';
import { InjectedAuthRouterProps } from 'shared/helpers/authWrapper';

import { provideStyles, StylesProps } from './CreateCashFlow.style';

type IProps = InjectedAuthRouterProps & RouteComponentProps & StylesProps;
class CreateCashFlow extends React.PureComponent<IProps> {

  public render() {
    const { classes } = this.props;
    return (
      <BaseLayout>
        <div className={classes.root}>
          <CreateCashFlowForm onCreate={this.onCreate} />
        </div>
      </BaseLayout>
    );
  }

  @bind
  private onCreate() {
    this.props.history.push(routes.cashFlows.type.getRedirectPath({ type: 'obligations' }));
  }
}

export default provideStyles(CreateCashFlow);
