import * as React from 'react';
import { connect } from 'react-redux';

import { Button } from 'shared/view/elements';
import { i18nConnect, ITranslateProps, tKeys } from 'services/i18n';

import { StylesProps, provideStyles } from './LogoutButton.style';
import { actions } from './../../redux';

type ActionProps = typeof actionProps;

type IProps = ActionProps & ITranslateProps & StylesProps;

class ProfileMenu extends React.PureComponent<IProps> {
  public render() {
    const { t, logout, classes } = this.props;
    return (
      <Button className={classes.root} onClick={logout} variant="text">
        {t(tKeys.features.signIn.logout.getKey())}
      </Button>
    );
  }
}

const actionProps = {
  logout: actions.logout,
};

export default connect(null, actionProps)(provideStyles(i18nConnect(ProfileMenu)));
