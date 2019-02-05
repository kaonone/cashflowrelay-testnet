import * as React from 'react';
import { SubSet, MergeRight } from '_helpers';
import MuiButton, { ButtonProps } from '@material-ui/core/Button';

type IProps = MergeRight<ButtonProps, {
  color?: SubSet<ButtonProps['color'], 'primary' | 'default' | 'secondary'>;
}>;

function Button(props: IProps) {
  return (
    <MuiButton {...props} />
  );
}

export default Button;
