import * as React from 'react';
import { GetProps } from '_helpers';

import SvgIcon from '@material-ui/core/SvgIcon';

// tslint:disable:max-line-length
function TrashBasket(props: GetProps<typeof SvgIcon>) {
  return (
    <SvgIcon {...props} viewBox="0 0 18 18">
      <g fill="none" fillRule="evenodd" stroke="currentColor" strokeWidth="1.5">
        <path d="M13.25 3.25V2.009c0-.695-.561-1.259-1.25-1.259H6c-.694 0-1.25.56-1.25 1.259V3.25h8.5zM15.25 3.75v12.258c0 .68-.564 1.242-1.256 1.242H4.006a1.248 1.248 0 0 1-1.256-1.242V3.75h12.5z" />
        <path strokeLinecap="round" d="M7.5 6.5v8M10.5 6.5v8M.5 3.5h17" />
      </g>
    </SvgIcon>
  );
}

export default TrashBasket;
