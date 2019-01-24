import * as React from 'react';
import { GetProps } from '_helpers';

import SvgIcon from '@material-ui/core/SvgIcon';

// tslint:disable:max-line-length
function Cross(props: GetProps<typeof SvgIcon>) {
  return (
    <SvgIcon {...props} viewBox="0 0 18 18">
      <g fill="none" fillRule="evenodd" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5">
        <path d="M2.58 2.516l13 13M2.58 15.516l13-13" />
      </g>
    </SvgIcon>
  );
}

export default Cross;
