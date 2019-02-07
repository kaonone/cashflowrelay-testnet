import * as React from 'react';
import { connect } from 'react-redux';
import { bind } from 'decko';
import * as cn from 'classnames';

import { IAppReduxState } from 'shared/types/app';
import { ICommunication } from 'shared/types/redux';
import { i18nConnect, ITranslateProps, tKeys as tKeysAll } from 'services/i18n';
import { Switch, CircleProgressBar } from 'shared/view/elements';

import { actions, selectors } from '../../redux';
import { provideStyles, StylesProps } from './GivePermissions.style';

const tKeys = tKeysAll.features.signIn;

type ActionProps = typeof mapDispatch;

interface IStateProps {
  isMinter: boolean;
  isApproved: boolean;
  isPayingAllowance: boolean;
  isBuyingAllowance: boolean;
  settingMinter: ICommunication;
  settingApproved: ICommunication;
  settingPayingAllowance: ICommunication;
  settingBuyingAllowance: ICommunication;
}

type IProps = ActionProps & IStateProps & StylesProps & ITranslateProps;

class GivePermissions extends React.PureComponent<IProps> {
  public render() {
    const {
      classes, t,
      isMinter, setMinter, settingMinter,
      isApproved, settingApproved,
      isPayingAllowance, settingPayingAllowance, isBuyingAllowance, settingBuyingAllowance } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.title}>{t(tKeys.permissions.title.getKey())}</div>
        <div className={classes.content}>
          <div className={classes.permission}>
            <div className={classes.permissionTitle}>{t(tKeys.permissions.createCashflows.getKey())}</div>
            <Switch
              color="primary"
              onChange={setMinter}
              checked={isMinter}
              disabled={settingMinter.isRequesting || isMinter}
            />
            <div className={cn({ [classes.isHidden]: !settingMinter.isRequesting })}>
              <CircleProgressBar size={12} />
            </div>
          </div>
          <div className={classes.permission}>
            <div className={classes.permissionTitle}>{t(tKeys.permissions.sellCashflows.getKey())}</div>
            <Switch
              color="primary"
              disabled={settingApproved.isRequesting}
              checked={isApproved}
              onChange={this.toggleApproved}
            />
            <div className={cn({ [classes.isHidden]: !settingApproved.isRequesting })}>
              <CircleProgressBar size={12} />
            </div>
          </div>
          <div className={classes.permission}>
            <div className={classes.permissionTitle}>{t(tKeys.permissions.payInstalments.getKey())}</div>
            <Switch
              color="primary"
              disabled={settingPayingAllowance.isRequesting}
              checked={isPayingAllowance}
              onChange={this.togglePayingAllowance}
            />
            <div className={cn({ [classes.isHidden]: !settingPayingAllowance.isRequesting })}>
              <CircleProgressBar size={12} />
            </div>
          </div>
          <div className={classes.permission}>
            <div className={classes.permissionTitle}>{t(tKeys.permissions.buyCashflows.getKey())}</div>
            <Switch
              color="primary"
              disabled={settingBuyingAllowance.isRequesting}
              checked={isBuyingAllowance}
              onChange={this.toggleBuyingAllowance}
            />
            <div className={cn({ [classes.isHidden]: !settingBuyingAllowance.isRequesting })}>
              <CircleProgressBar size={12} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  @bind
  public toggleApproved() {
    const { isApproved, setApproved } = this.props;
    setApproved({ isApproved: !isApproved });
  }

  @bind
  public togglePayingAllowance() {
    const { isPayingAllowance, setPayingAllowance } = this.props;
    setPayingAllowance({ isPayingAllowance: !isPayingAllowance });
  }

  @bind
  public toggleBuyingAllowance() {
    const { isBuyingAllowance, setBuyingAllowance } = this.props;
    setBuyingAllowance({ isBuyingAllowance: !isBuyingAllowance });
  }
}

function mapState(state: IAppReduxState): IStateProps {
  return {
    isMinter: selectors.selectIsMinter(state),
    isApproved: selectors.selectIsApproved(state),
    isPayingAllowance: selectors.selectIsPayingAllowance(state),
    isBuyingAllowance: selectors.selectIsBuyingAllowance(state),
    settingMinter: selectors.selectCommunication(state, 'settingMinter'),
    settingApproved: selectors.selectCommunication(state, 'settingApproved'),
    settingPayingAllowance: selectors.selectCommunication(state, 'settingPayingAllowance'),
    settingBuyingAllowance: selectors.selectCommunication(state, 'settingBuyingAllowance'),
  };
}

const mapDispatch = {
  setMinter: actions.setMinter,
  setApproved: actions.setApproved,
  setPayingAllowance: actions.setPayingAllowance,
  setBuyingAllowance: actions.setBuyingAllowance,
};

export default connect(mapState, mapDispatch)(
  i18nConnect(
    provideStyles(GivePermissions),
  ),
);
