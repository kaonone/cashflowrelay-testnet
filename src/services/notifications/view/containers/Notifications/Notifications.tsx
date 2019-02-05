import * as React from 'react';
import { connect } from 'react-redux';
import * as uuid from 'uuid';
import { bind } from 'decko';

import { IAppReduxState } from 'shared/types/app';
import { Button } from 'shared/view/elements';

import * as selectors from './../../../redux/selectors';
import * as actions from './../../../redux/actions';
import TopNotification from '../TopNotification/TopNotification';
import { INotificationWithId, NotificationId } from '../../../namespace';

interface IStateProps {
  notifications: INotificationWithId[];
  hideNotifications: NotificationId[];
  showingNotification: NotificationId;
}

type IActionProps = typeof mapDispatch;

type IProps = IStateProps & IActionProps;

function mapState(state: IAppReduxState): IStateProps {
  return {
    notifications: selectors.selectNotifications(state),
    hideNotifications: selectors.selectHideNotifications(state),
    showingNotification: selectors.selectShowingNotification(state),
  };
}

const mapDispatch = {
  pushNotification: actions.pushNotification,
  hideNotification: actions.hideNotification,
  setShowingNotification: actions.setShowingNotification,
};

class Notifications extends React.Component<IProps> {

  public componentDidUpdate() {
    const { notifications, hideNotifications, setShowingNotification } = this.props;
    const actualNotifications = this.getActualNotifications(notifications, hideNotifications);
    const isShowNotification = actualNotifications.length > 0;
    const currentNotification = actualNotifications[0];
    if (this.props.showingNotification === '' && isShowNotification) {
      setTimeout(() => this.hideNotification(currentNotification.id), 10000);
      setShowingNotification(currentNotification.id);
    }
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
  private getActualNotifications(allNotifications: INotificationWithId[], hideNotifications: NotificationId[]) {
    return allNotifications.filter(notification => !hideNotifications.includes(notification.id));
  }

  @bind
  private hideNotification(id: string) {
    const {hideNotification, setShowingNotification} = this.props;
    hideNotification(id);
    setShowingNotification('');
  }

  @bind
  private testClick() {
    this.props.pushNotification(
      {
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
