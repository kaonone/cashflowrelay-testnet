import * as React from 'react';

import { BaseLayout } from 'modules/shared';
import { CreateCashFlowForm } from 'features/getInFund';

import { provideStyles, StylesProps } from './CreateCashFlow.style';

class CreateCashFlow extends React.PureComponent<StylesProps> {

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
