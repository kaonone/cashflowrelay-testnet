import * as React from 'react';
import MuiSwitch, { SwitchProps } from '@material-ui/core/Switch';

function Switch(props: SwitchProps) {
  return (
    <MuiSwitch {...props} />
  );
}

export default Switch;
