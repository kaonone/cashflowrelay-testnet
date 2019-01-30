import * as React from 'react';

import { BaseLayout } from 'modules/shared';
import { CreateCashFlowForm } from 'features/getInFund';

function CreateCashFlow() {
  return (
    <BaseLayout>
      <CreateCashFlowForm />
    </BaseLayout>
  );
}

export default CreateCashFlow;
