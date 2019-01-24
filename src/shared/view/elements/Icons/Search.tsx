import * as React from 'react';
import { GetProps } from '_helpers';

import SvgIcon from '@material-ui/core/SvgIcon';

// tslint:disable:max-line-length
function Search(props: GetProps<typeof SvgIcon>) {
  return (
    <SvgIcon {...props} viewBox="0 0 18 18">
      <g fill="none" fillRule="evenodd" stroke="currentColor" strokeWidth="1.5" transform="translate(-126 -162)">
        <circle cx="134" cy="170" r="7.25" />
        <path strokeLinecap="round" d="M139.665 175.537l3.684 3.684" />
      </g>
    </SvgIcon>
  );
}

export default Search;
