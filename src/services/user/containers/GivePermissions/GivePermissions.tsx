import * as React from 'react';
import { connect } from 'react-redux';

import { provideStyles, StylesProps } from './GivePermissions.style';
import { IAppReduxState } from 'shared/types/app';
import { actions, selectors } from '../../redux';

import Switch from '@material-ui/core/Switch';
import { AddMinterButton } from 'features/addMinter';
import { Button } from 'shared/view/elements';
import { bind } from 'decko';
import { ICommunication } from 'shared/types/redux';

type ActionProps = typeof mapDispatch;

interface IStateProps {
  isApproved: boolean;
  settingApproved: ICommunication;
  checkingApproved: ICommunication;
}

type IProps = ActionProps & IStateProps & StylesProps;

class GivePermissions extends React.PureComponent<IProps> {


  public componentDidMount() {
    const { checkIsApproved } = this.props;
    checkIsApproved();
  }
  public render() {
    const {
      classes, checkIsMinter, isApproved,
      checkIsAllowance, setIsAllowance, settingApproved, checkingApproved } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.title}>Authorise Cashflow Relay to:</div>
        <div className={classes.content}>
          <div className={classes.permission}>
            <div className={classes.permissionTitle}>Create cashflows</div>
            <Switch color="primary" onChange={checkIsMinter} />
            <AddMinterButton />
          </div>
          <div className={classes.permission}>
            <div className={classes.permissionTitle}>Sell cashflows</div>
            <Switch
              color="primary"
              disabled={settingApproved.isRequesting || checkingApproved.isRequesting}
              checked={isApproved}
              onChange={this.toggleApproved}
            />
          </div>
          <div className={classes.permission}>
            <div className={classes.permissionTitle}>Pay instalments from your wallet</div>
            <Switch color="primary" onChange={checkIsAllowance} />
            <Button onClick={() => setIsAllowance({ isAllowed: true })}>add</Button>
            <Button onClick={() => setIsAllowance({ isAllowed: false })}>remove</Button>
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
}

function mapState(state: IAppReduxState) {
  return {
    isApproved: selectors.selectIsApproved(state),
    checkingApproved: selectors.selectCommunication(state, 'checkingApproved'),
    settingApproved: selectors.selectCommunication(state, 'settingApproved'),
  };
}

const mapDispatch = {
  checkIsMinter: actions.checkIsMinter,
  checkIsApproved: actions.checkIsApproved,
  setApproved: actions.setApproved,
  checkIsAllowance: actions.checkIsAllowance,
  setIsAllowance: actions.setIsAllowance,
};

export default connect(mapState, mapDispatch)(
  provideStyles(GivePermissions),
);
