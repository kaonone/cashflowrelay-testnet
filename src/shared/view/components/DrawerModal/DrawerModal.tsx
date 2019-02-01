import * as React from 'react';

import { provideStyles, StylesProps } from './DrawerModal.style';
import { i18nConnect, ITranslateProps, tKeys } from 'services/i18n';
import { Button, Drawer } from 'shared/view/elements';
import { Alert } from 'shared/view/elements/Icons';

interface IOwnProps {
  title: string;
  open: boolean;
  actions: Array<React.ReactElement<any>>;
  hint?: string;

  onClose(): void;
}

type IProps = IOwnProps & StylesProps & ITranslateProps;

class DrawerModal extends React.Component<IProps> {
  public render() {
    const {
      classes, t, children, onClose, open, actions, hint, title,
    } = this.props;

    return (
      <Drawer
        onClose={onClose}
        open={open}
        anchor="right"
      >
        <div className={classes.root}>
          <div className={classes.title}>{title}</div>
          <div className={classes.content}>{children}</div>
          {hint &&
            <div className={classes.hint}>
              <Alert className={classes.hintIcon} />
              {hint}</div>
          }
          <div className={classes.actions}>
            {actions.map((action, i) => <div className={classes.action} key={i}>{action}</div>)}
            <Button variant="outlined" className={classes.cancelButton} onClick={onClose} fullWidth>
              {t(tKeys.shared.cancel.getKey())}
            </Button>
          </div>
        </div>
      </Drawer>
    );
  }
}

export { IProps };
export default i18nConnect(provideStyles(DrawerModal));
