import * as React from 'react';
import * as cn from 'classnames';
import CardHeader from '@material-ui/core/CardHeader';
import Slide from '@material-ui/core/Slide';
import Card from '@material-ui/core/Card';
import { bind } from 'decko';

import { IconButton } from 'shared/view/elements';
import { Cross } from 'shared/view/elements/Icons';

import { StylesProps, provideStyles } from './TopNotification.style';
import { NotificationIcon } from '../../components/NotificationIcon/NotificationIcon';
import { INotificationWithId } from 'services/notifications/namespace';

interface IOwnProps {
  notificationInfo: INotificationWithId;
  hideNotification: (id: string) => void;
}

type IProps = IOwnProps & StylesProps;

class TopNotification extends React.PureComponent<IProps, {}> {
  public render() {
    const { classes, notificationInfo } = this.props;

    return (
      <div className={classes.root}>
        <Slide direction="down" in={true} mountOnEnter unmountOnExit>
          <Card
            className={
              cn(classes.notification, {
                [classes.infoNotification]: notificationInfo.type === 'info',
                [classes.positiveNotification]: notificationInfo.type === 'positive',
                [classes.negativeNotification]: notificationInfo.type === 'negative',
              })}
          >
            <CardHeader
              avatar={(<NotificationIcon type={notificationInfo.type}/>)}
              title={notificationInfo.title}
              subheader={notificationInfo.description}
              classes={{title: classes.title}}
              action={(
                <IconButton onClick={this.hideNotification}>
                  <Cross />
                </IconButton>
              )}
            />
          </Card>
        </Slide>
      </div>
    );
  }

  @bind
  private hideNotification() {
    const { notificationInfo, hideNotification } = this.props;
    hideNotification(notificationInfo.id);
  }
}

export { TopNotification };
export default provideStyles(TopNotification);
