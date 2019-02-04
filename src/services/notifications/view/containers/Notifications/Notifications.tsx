import * as React from 'react';
import { connect } from 'react-redux';
import { withSnackbar, InjectedNotistackProps } from 'notistack';
import * as uuid from 'uuid';
import CardHeader from '@material-ui/core/CardHeader';
import Card from '@material-ui/core/Card';

import { IAppReduxState } from 'shared/types/app';

import * as selectors from './../../../redux/selectors';
import * as actions from './../../../redux/actions';
import { INotification, notificationId } from '../../../namespace';
import { Button } from 'shared/view/elements';
import { bind } from 'decko';

interface IStateProps {
  notifications: INotification[];
  hideNotifications: notificationId[];
}
type IActionProps = typeof mapDispatch;

type IProps = IStateProps & IActionProps & InjectedNotistackProps;

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

  // public componentDidUpdate() {
  //   const { enqueueSnackbar, notifications, removeNotification } = this.props;
  // //   notifications.forEach(notification => {
  // //     enqueueSnackbar(notification.message, notification.options);
  // //     removeNotification(notification.id);
  // // });
  // }

  public componentDidUpdate() {
    const { notifications, hideNotifications, hideNotification } = this.props;
    const actualNotifications = notifications.filter(notification => !hideNotifications.includes(notification.id));
    setTimeout(() => hideNotification(actualNotifications[0].id), 10000);
  }

  public render() {
    const {notifications, hideNotifications} = this.props;
    const actualNotifications = notifications.filter(notification => !hideNotifications.includes(notification.id));
    const isShowNotification = actualNotifications.length > 0;
    return (
      <>
      <Button variant="contained" onClick={this.testClick}>Push notification</Button>
          {isShowNotification && (<Card>
              <CardHeader
                title={actualNotifications[0].message}
                subheader={'transaction.status'}
              />
            </Card>)
          }
          </>
    );
  }

  @bind
  private testClick() {
    this.props.pushNotification(
      {
        id: uuid(),
        options: {
          variant: 'default',
          autoHideDuration: 10000,
        },
        message: 'Notification succes',
      },
    );
  }
}

export {Notifications};
export default (
  connect(mapState, mapDispatch)(
    withSnackbar(Notifications),
  )
);
