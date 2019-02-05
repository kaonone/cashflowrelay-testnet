import * as React from 'react';

import RowsLayout, { IProps as IRowsLayoutProps } from 'shared/view/elements/RowsLayout/RowsLayout';

import Header from '../Header/Header';

import { StylesProps, provideStyles } from './BaseLayout.style';
import { Notifications } from 'services/notifications';

interface IOwnProps {
  children: React.ReactNode;
}

type IProps = IOwnProps & StylesProps & Pick<IRowsLayoutProps, 'background' | 'fullHeight'>;

class BaseLayout extends React.PureComponent<IProps> {
  public render() {
    const { classes, children, ...rest } = this.props;

    return (
      <RowsLayout
        headerContent={<Header />}
        {...rest}
      >
        <Notifications />
        <div className={classes.content}>
          {children}
        </div>
      </RowsLayout>
    );
  }
}

export { IProps };
export default provideStyles(BaseLayout);
