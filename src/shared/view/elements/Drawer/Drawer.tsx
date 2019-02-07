import * as React from 'react';
import MuiDrawer, { DrawerProps } from '@material-ui/core/Drawer';
import { Omit } from '_helpers';

import { provideStyles, StylesProps } from './Drawer.style';

type IProps = Omit<DrawerProps, 'classes'> & StylesProps;

class Drawer extends React.Component<IProps> {
  public render() {
    const { classes, children, title, ...rest } = this.props;

    return (
      <MuiDrawer
        {...rest}
        classes={{ paper: classes.root }}
      >
        {children}
      </MuiDrawer>
    );
  }
}

export { IProps };
export default provideStyles(Drawer);
