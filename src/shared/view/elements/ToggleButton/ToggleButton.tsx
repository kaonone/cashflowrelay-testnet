import * as React from 'react';
import * as cn from 'classnames';
import MuiToggleButton, { ToggleButtonProps } from '@material-ui/lab/ToggleButton';

import { StylesProps, provideStyles } from './ToggleButton.style';
import { Omit } from '_helpers';

interface IOwnProps {
  variant?: 'contained' | 'outlined';
}

type IProps = IOwnProps & Omit<ToggleButtonProps, 'classes'> & StylesProps;

function ToggleButton(props: IProps) {
  const { classes, variant } = props;
  const { root, selected, disabled, label } = classes;
  return (
    <MuiToggleButton
      {...props}
      classes={{ root, selected, disabled, label }}
      className={cn(props.className, {
        [classes.outlined]: variant === 'outlined',
        [classes.contained]: variant === 'contained' || !variant,
      })}
    />
  );
}

export default provideStyles(ToggleButton);
