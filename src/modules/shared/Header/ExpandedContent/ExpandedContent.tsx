import * as React from 'react';
import { bind } from 'decko';
import * as cn from 'classnames';

import { Button } from 'shared/view/elements';

import { provideStyles, StylesProps } from './ExpandedContent.style';

interface IOwnProps {
  title: string;
  withOverlay?: boolean;
  expanded?: boolean;
}

type IProps = StylesProps & IOwnProps;

interface IState {
  isOpen: boolean;
}
class ExpandedContent extends React.PureComponent<IProps, IState> {
  public state: IState = { isOpen: false };

  public render() {
    const { classes, title, children, withOverlay, expanded } = this.props;

    const isExpanded = expanded || this.state.isOpen;
    return (
      <div className={cn(classes.root, { [classes.isExpanded]: isExpanded })}>
        {withOverlay && <div className={classes.overlay} />}
        <Button
          color="primary"
          fullWidth
          size="small"
          variant="contained"
          className={classes.header}
          onClick={this.toggle}
        >
          {title}
        </Button>
        {isExpanded && <div className={classes.content}>
          {children}
        </div>}
      </div>
    );
  }

  @bind
  private toggle() {
    this.setState(pState => ({ isOpen: !pState.isOpen }));
  }
}

export default provideStyles(ExpandedContent);
