import * as React from 'react';
import Drawer, { DrawerProps } from '@material-ui/core/Drawer';
import { Omit } from '_helpers';

import { provideStyles, StylesProps } from './DrawerModal.style';

type IProps = Omit<DrawerProps, 'classes'> & StylesProps;

class DrawerModal extends React.Component<IProps> {
  public render() {
    const { classes, children, title, ...rest } = this.props;

    return (
      <Drawer
        {...rest}
        classes={{ paper: classes.root }}
      >
        {children}
      </Drawer>
    );
  }
}

export { IProps };
export default provideStyles(DrawerModal);
