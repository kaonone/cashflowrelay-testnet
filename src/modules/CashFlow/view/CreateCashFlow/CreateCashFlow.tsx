import * as React from 'react';

import { BaseLayout } from 'modules/shared';
import { CreateCashFlowForm } from 'features/getInFund';
import { InjectedAuthRouterProps } from 'shared/helpers/authWrapper';

import { provideStyles, StylesProps } from './CreateCashFlow.style';

type IProps = InjectedAuthRouterProps & StylesProps;
class CreateCashFlow extends React.PureComponent<IProps> {

  public render() {
    const { classes } = this.props;
    return (
      <BaseLayout>
        <div className={classes.root}>
          <CreateCashFlowForm />
        </div>
      </BaseLayout>
    );
  }

}

export default provideStyles(CreateCashFlow);
