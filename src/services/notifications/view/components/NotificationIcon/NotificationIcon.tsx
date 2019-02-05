import * as React from 'react';
import CheckCircleOutlineRounded from '@material-ui/icons/CheckCircleOutlineRounded';
import HighlightOffOutlined from '@material-ui/icons/HighlightOffOutlined';
import InfoOutlined from '@material-ui/icons/InfoOutlined';
import { NotificationVariant } from 'shared/types/models';

interface IProps {
  type: NotificationVariant;
}

class NotificationIcon extends React.Component<IProps> {

  public render() {
    const { type } = this.props;
    const icon = {
      positive: (<CheckCircleOutlineRounded color="disabled"/>),
      negative: (<HighlightOffOutlined color="disabled"/>),
      info: (<InfoOutlined color="disabled"/>),
    };
    return (icon[type]);
  }
}

export {NotificationIcon};
