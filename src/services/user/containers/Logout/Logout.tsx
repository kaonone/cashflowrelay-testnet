import * as React from 'react';
import { connect } from 'react-redux';

import { actions } from './../../redux';

type ActionProps = typeof actionProps;

type IProps = ActionProps;

class Logout extends React.PureComponent<IProps> {
  public render() {
    const { logout, children, ...rest } = this.props;
    return (
      <div {...rest} onClick={logout} >
        {children}
      </div>
    );
  }
}

const actionProps = {
  logout: actions.logout,
};

export default connect(null, actionProps)(Logout);
