import * as React from 'react';
import { connect } from 'react-redux';
import { withSnackbar, InjectedNotistackProps } from 'notistack';
import * as uuid from 'uuid';

import { IAppReduxState } from 'shared/types/app';

import * as selectors from './../../../redux/selectors';
import * as actions from './../../../redux/actions';
import { INotification } from '../../../namespace';
import { Button } from 'shared/view/elements';
import { bind } from 'decko';

interface IStateProps {
  notifications: INotification[];
}
type IActionProps = typeof mapDispatch;

type IProps = IStateProps & IActionProps & InjectedNotistackProps;

function mapState(state: IAppReduxState): IStateProps {
  return {
    notifications: selectors.selectNotifications(state),
  };
}

const mapDispatch = {
  pushNotification: actions.pushNotification,
  removeNotification: actions.removeNotification,
};

class Notifications extends React.Component<IProps> {

  public componentDidUpdate() {
    const { enqueueSnackbar, notifications, removeNotification } = this.props;
    notifications.forEach(notification => {
      enqueueSnackbar(notification.message, notification.options);
      removeNotification(notification.id);
  });
  }

  public render() {
    return (
      <Button onClick={this.testClick}>TEdtd</Button>
    );
  }

  @bind
  private testClick() {
    this.props.pushNotification(
      {
        id: uuid(),
        options: {
          variant: 'success'
        },
        message: 'test',
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
