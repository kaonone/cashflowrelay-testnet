import * as React from 'react';
import { SubSet, Omit } from '_helpers';
import MuiIconButton, { IconButtonProps } from '@material-ui/core/IconButton';

type ICommonProps = Omit<IconButtonProps, 'color'>;

type IProps = ICommonProps & {
  color?: SubSet<IconButtonProps['color'], 'primary' | 'default'>;
};

function IconButton(props: IProps) {
  return (
    <MuiIconButton {...props} />
  );
}

export default IconButton;
