import * as React from 'react';

import { provideStyles, StylesProps } from './ExpandedContent.style';

interface IOwnProps {
  title: string;
  withOverlay?: boolean;
}

type IProps = StylesProps & IOwnProps;

class ExpandedContent extends React.PureComponent<IProps> {

  public render() {
    const { classes, title, children, withOverlay } = this.props;
    return (
      <div className={classes.root}>
        {withOverlay && <div className={classes.overlay} />}
        <div className={classes.header}>
          {title}
        </div>
        <div className={classes.content}>
          {children}
        </div>
      </div>
    );
  }
}

export default provideStyles(ExpandedContent);
