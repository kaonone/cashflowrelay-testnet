import * as React from 'react';
import { SendTransactionButton } from 'services/transactions';

function AddMinterButton() {
  return (
    <SendTransactionButton<'addMinter'>
      type="addMinter"
      variant="contained"
      color="primary"
      data={null}
    >
      Add minter
    </SendTransactionButton>
  );
}

export default AddMinterButton;
