import * as React from 'react';
import { connect } from 'react-redux';

import { i18nConnect, ITranslateProps, tKeys } from 'services/i18n';

import { actions } from './../../redux';

type ActionProps = typeof actionProps;

type IProps = ActionProps & ITranslateProps;

class Logout extends React.PureComponent<IProps> {
  public render() {
    const { t, logout, ...rest } = this.props;
    return (
      <div {...rest} onClick={logout} >
        {t(tKeys.features.signIn.logout.getKey())}
      </div>
    );
  }
}

const actionProps = {
  logout: actions.logout,
};

export default connect(null, actionProps)(i18nConnect(Logout));
