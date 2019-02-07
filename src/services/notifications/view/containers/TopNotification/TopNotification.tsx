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
import { i18nConnect, ITranslateProps, tKeys } from 'services/i18n';
import { INotification, variantByType } from 'shared/types/models';

interface IOwnProps {
  notificationInfo: INotification;
  hideNotification: (id: string) => void;
}

type IProps = IOwnProps & StylesProps & ITranslateProps;

class TopNotification extends React.PureComponent<IProps, {}> {
  public render() {
    const { t, classes } = this.props;
    const { type, payload } = this.props.notificationInfo;

    const variant = variantByType[type];

    return (
      <div className={classes.root}>
        <Slide direction="down" in={true} mountOnEnter unmountOnExit>
          <Card
            className={
              cn(classes.notification, {
                [classes.infoNotification]: variant === 'info',
                [classes.positiveNotification]: variant === 'positive',
                [classes.negativeNotification]: variant === 'negative',
              })}
          >
            <CardHeader
              avatar={(<NotificationIcon type={variant} />)}
              title={t(tKeys.services.notifications.title[type].getKey(), payload || {})}
              subheader={t(tKeys.services.notifications.description[type].getKey(), payload || {})}
              classes={{ title: classes.title }}
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
export default i18nConnect(provideStyles(TopNotification));
