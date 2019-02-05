import * as React from 'react';
import { connect } from 'react-redux';
import { bind } from 'decko';

import { provideStyles, StylesProps } from './GivePermissions.style';
import { IAppReduxState } from 'shared/types/app';
import { ICommunication } from 'shared/types/redux';

import { actions, selectors } from '../../redux';

import Switch from '@material-ui/core/Switch'; /// 12313123123123

type ActionProps = typeof mapDispatch;

interface IStateProps {
  isApproved: boolean;
  isAllowance: boolean;
  isMinter: boolean;
  checkingPermissions: ICommunication;
  settingMinter: ICommunication;
  settingApproved: ICommunication;
  settingAllowance: ICommunication;
}

type IProps = ActionProps & IStateProps & StylesProps;

class GivePermissions extends React.PureComponent<IProps> {
  public render() {
    const {
      classes,
      isMinter, setMinter, settingMinter, checkingPermissions,
      isApproved, settingApproved,
      isAllowance, settingAllowance } = this.props;
    // добавить сюда прелодер !!!
    return (
      <div className={classes.root}>
        <div className={classes.title}>Authorise Cashflow Relay to:</div>
        <div className={classes.content}>
          <div className={classes.permission}>
            <div className={classes.permissionTitle}>Create cashflows</div>
            <Switch
              color="primary"
              onChange={setMinter}
              checked={isMinter}
              disabled={settingMinter.isRequesting || isMinter}
            />
          </div>
          <div className={classes.permission}>
            <div className={classes.permissionTitle}>Sell cashflows</div>
            <Switch
              color="primary"
              disabled={settingApproved.isRequesting}
              checked={isApproved}
              onChange={this.toggleApproved}
            />
          </div>
          <div className={classes.permission}>
            <div className={classes.permissionTitle}>Pay instalments from your wallet</div>
            <Switch
              color="primary"
              disabled={settingAllowance.isRequesting}
              checked={isAllowance}
              onChange={this.toggleAllowance}
            />
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
  public toggleAllowance() {
    const { isAllowance, setAllowance } = this.props;
    setAllowance({ isAllowance: !isAllowance });
  }
}

function mapState(state: IAppReduxState): IStateProps {
  return {
    isApproved: selectors.selectIsApproved(state),
    isAllowance: selectors.selectIsAllowance(state),
    isMinter: selectors.selectIsMinter(state),
    checkingPermissions: selectors.selectCommunication(state, 'checkingPermissions'),
    settingMinter: selectors.selectCommunication(state, 'settingMinter'),
    settingApproved: selectors.selectCommunication(state, 'settingApproved'),
    settingAllowance: selectors.selectCommunication(state, 'settingAllowance'),
  };
}

const mapDispatch = {
  checkPermissions: actions.checkPermissions,
  setMinter: actions.setMinter,
  setApproved: actions.setApproved,
  setAllowance: actions.setAllowance,
};

export default connect(mapState, mapDispatch)(
  provideStyles(GivePermissions),
);
