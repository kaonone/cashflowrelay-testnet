import * as React from 'react';
import { connect } from 'react-redux';
import * as uuid from 'uuid';
import { bind } from 'decko';

import { IAppReduxState } from 'shared/types/app';
import { Button } from 'shared/view/elements';

import * as selectors from './../../../redux/selectors';
import * as actions from './../../../redux/actions';
import TopNotification from '../TopNotification/TopNotification';
import { INotification, notificationId } from '../../../namespace';

interface IStateProps {
  notifications: INotification[];
  hideNotifications: notificationId[];
}
type IActionProps = typeof mapDispatch;

type IProps = IStateProps & IActionProps;

function mapState(state: IAppReduxState): IStateProps {
  return {
    notifications: selectors.selectNotifications(state),
    hideNotifications: selectors.selectHideNotifications(state),
  };
}

const mapDispatch = {
  pushNotification: actions.pushNotification,
  hideNotification: actions.hideNotification,
};

class Notifications extends React.Component<IProps> {

  public componentDidUpdate() {
    const { notifications, hideNotifications, hideNotification } = this.props;
    const actualNotifications = this.getActualNotifications(notifications, hideNotifications);
    const currentNotification = actualNotifications[0];
    setTimeout(() => hideNotification(currentNotification.id), 10000);
  }

  public render() {
    const {notifications, hideNotifications, hideNotification} = this.props;
    const actualNotifications = this.getActualNotifications(notifications, hideNotifications);
    const currentNotification = actualNotifications[0];
    const isShowNotification = actualNotifications.length > 0;
    return (
      <>
      <Button variant="contained" onClick={this.testClick}>Push notification</Button>
      {isShowNotification && (
        <TopNotification hideNotification={hideNotification} notificationInfo={currentNotification}/>
      )}
    </>
    );
  }

  @bind
  private getActualNotifications(allNotifications: INotification[], hideNotifications: notificationId[]) {
    return allNotifications.filter(notification => !hideNotifications.includes(notification.id));
  }

  @bind
  private testClick() {
    this.props.pushNotification(
      {
        id: uuid(),
        type: 'positive',
        title: uuid(),
        description: 'Notification descriotion',
      },

    );
  }
}

export {Notifications};
export default (
  connect(mapState, mapDispatch)(Notifications)
);
