import * as React from 'react';
import { connect } from 'react-redux';
import { bind } from 'decko';

import { IAppReduxState } from 'shared/types/app';

import * as selectors from './../../../redux/selectors';
import * as actions from './../../../redux/actions';
import TopNotification from '../TopNotification/TopNotification';
import { INotification, NotificationId } from 'shared/types/models';

const notificationDuration = 3000;

interface IStateProps {
  notifications: INotification[];
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
      setTimeout(() => this.hideNotification(currentNotification.id), notificationDuration);
      setShowingNotification(currentNotification.id);
    }
  }

  public render() {
    const { notifications, hideNotifications, hideNotification } = this.props;
    const actualNotifications = this.getActualNotifications(notifications, hideNotifications);
    const currentNotification = actualNotifications[0];
    const isShowNotification = actualNotifications.length > 0;
    return (
      isShowNotification && (
        <TopNotification hideNotification={hideNotification} notificationInfo={currentNotification} />
      )
    );
  }

  @bind
  private getActualNotifications(allNotifications: INotification[], hideNotifications: NotificationId[]) {
    return allNotifications.filter(notification => !hideNotifications.includes(notification.id));
  }

  @bind
  private hideNotification(id: string) {
    const { hideNotification, setShowingNotification } = this.props;
    hideNotification(id);
    setShowingNotification('');
  }
}

export { Notifications };
export default (
  connect(mapState, mapDispatch)(Notifications)
);
