import * as React from 'react';

import { provideStyles, StylesProps } from './ExpandedContent.style';

interface IOwnProps {
  title: string;
}

type IProps = StylesProps & IOwnProps;

class ExpandedContent extends React.PureComponent<IProps> {

  public render() {
    const { classes, title, children } = this.props;
    return (
      <div className={classes.root}>
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
