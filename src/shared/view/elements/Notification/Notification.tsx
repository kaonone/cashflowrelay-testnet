import * as React from 'react';
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';

import { StylesProps, provideStyles } from './Notification.styles';

interface IOwnProps {
  title: string;
  isOpen: boolean;
  closeTimeout?: number;
  onClose(): void;
}

type IProps = StylesProps & IOwnProps;

interface IState {
  arrowRef: HTMLSpanElement | null;
  isOpen: boolean;
}

class Notification extends React.Component<IProps> {
  public state: IState = {
    arrowRef: document.querySelector('#root'),
    isOpen: false,
  };
  public closeTimer: number = -1;

  public componentDidUpdate(prevProps: IProps) {
    const { isOpen, onClose, closeTimeout } = this.props;
    if (!prevProps.isOpen && isOpen) {
      this.closeTimer = window.setTimeout(() => onClose(), closeTimeout || 2000);
    }
  }

  public componentWillUnmount() {
    this.closeTimer && window.clearTimeout(this.closeTimer);
  }

  public render() {
    const { classes, title } = this.props;

    return (
      <Popper
        open={this.props.isOpen}
        anchorEl={this.state.arrowRef}
        placement={'left-start'}
        className={classes.wrapper}
        transition
      >{({ TransitionProps }) => (
        <Grow
          {...TransitionProps}
          timeout={500}
        >
          <div className={classes.root} >{title}</div>
        </Grow>
      )}
      </Popper>
    );
  }
}

export default provideStyles(Notification);
