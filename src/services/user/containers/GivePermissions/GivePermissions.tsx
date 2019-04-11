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
  isStakingAllowance: boolean;
  isBuyingAllowance: boolean;
  settingMinter: ICommunication;
  settingApproved: ICommunication;
  settingPayingAllowance: ICommunication;
  settingStakingAllowance: ICommunication;
  settingBuyingAllowance: ICommunication;
}

type IProps = ActionProps & IStateProps & StylesProps & ITranslateProps;

interface IPermissionItem {
  title: string;
  checked: boolean;
  disabled?: boolean;
  isShownPreloader: boolean;
  onChange(): void;
}

class GivePermissions extends React.PureComponent<IProps> {
  public render() {
    const {
      classes, t, setMinter,
      isMinter, isApproved, isPayingAllowance, isStakingAllowance, isBuyingAllowance,
      settingMinter, settingApproved, settingPayingAllowance, settingStakingAllowance, settingBuyingAllowance,
    } = this.props;

    const items: IPermissionItem[] = [{
      title: t(tKeys.permissions.createCashflows.getKey()),
      disabled: settingMinter.isRequesting || isMinter,
      checked: isMinter,
      onChange: setMinter,
      isShownPreloader: settingMinter.isRequesting,
    }, {
      title: t(tKeys.permissions.sellCashflows.getKey()),
      disabled: settingApproved.isRequesting,
      checked: isApproved,
      onChange: this.toggleApproved,
      isShownPreloader: settingApproved.isRequesting,
    }, {
      title: t(tKeys.permissions.payInstalments.getKey()),
      disabled: settingPayingAllowance.isRequesting,
      checked: isPayingAllowance,
      onChange: this.togglePayingAllowance,
      isShownPreloader: settingPayingAllowance.isRequesting,
    }, {
      title: t(tKeys.permissions.stakeTokens.getKey()),
      disabled: settingStakingAllowance.isRequesting,
      checked: isStakingAllowance,
      onChange: this.toggleStakingAllowance,
      isShownPreloader: settingStakingAllowance.isRequesting,
    }, {
      title: t(tKeys.permissions.buyCashflows.getKey()),
      disabled: settingBuyingAllowance.isRequesting,
      checked: isBuyingAllowance,
      onChange: this.toggleBuyingAllowance,
      isShownPreloader: settingBuyingAllowance.isRequesting,
    }];

    return (
      <div className={classes.root}>
        <div className={classes.title}>{t(tKeys.permissions.title.getKey())}</div>
        <div className={classes.content}>
          {items.map(({ checked, disabled, isShownPreloader, onChange, title }) => (
            <div key={title} className={classes.permission}>
              <div className={classes.permissionTitle}>{title}</div>
              <Switch
                color="primary"
                onChange={onChange}
                checked={checked}
                disabled={disabled}
              />
              <div className={cn({ [classes.isHidden]: !isShownPreloader })}>
                <CircleProgressBar size={12} />
              </div>
            </div>
          ))}
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
  public toggleStakingAllowance() {
    const { isStakingAllowance, setStakingAllowance } = this.props;
    setStakingAllowance({ isStakingAllowance: !isStakingAllowance });
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
    isStakingAllowance: selectors.selectIsStakingAllowance(state),
    isBuyingAllowance: selectors.selectIsBuyingAllowance(state),
    settingMinter: selectors.selectCommunication(state, 'settingMinter'),
    settingApproved: selectors.selectCommunication(state, 'settingApproved'),
    settingPayingAllowance: selectors.selectCommunication(state, 'settingPayingAllowance'),
    settingStakingAllowance: selectors.selectCommunication(state, 'settingStakingAllowance'),
    settingBuyingAllowance: selectors.selectCommunication(state, 'settingBuyingAllowance'),
  };
}

const mapDispatch = {
  setMinter: actions.setMinter,
  setApproved: actions.setApproved,
  setPayingAllowance: actions.setPayingAllowance,
  setStakingAllowance: actions.setStakingAllowance,
  setBuyingAllowance: actions.setBuyingAllowance,
};

export default connect(mapState, mapDispatch)(
  i18nConnect(
    provideStyles(GivePermissions),
  ),
);
