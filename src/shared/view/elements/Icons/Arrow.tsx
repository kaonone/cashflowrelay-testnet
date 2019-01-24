import * as React from 'react';
import { GetProps } from '_helpers';

import SvgIcon from '@material-ui/core/SvgIcon';

// tslint:disable:max-line-length
function Arrow(props: GetProps<typeof SvgIcon>) {
  return (
    <SvgIcon {...props} viewBox="0 0 18 18">
      <g fill="none" fillRule="evenodd" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5">
        <path d="M12.968 10.802l-4 3.5M4.968 10.802l4 3.5M8.968 14.302v-12" />
      </g>
    </SvgIcon>
  );
}

export default Arrow;
