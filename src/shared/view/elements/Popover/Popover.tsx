import * as React from 'react';
import MuiPopover, { PopoverProps } from '@material-ui/core/Popover';

function Popover(props: PopoverProps) {
  const { children, ...rest } = props;
  return (
    <MuiPopover
      {...rest}
    >
      {children}
    </MuiPopover>
  );
}

export default Popover;
