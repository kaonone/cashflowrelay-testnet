import * as React from 'react';

import { ITranslateProps, i18nConnect, tKeys as allKeys } from 'services/i18n';
import { Modal } from 'shared/view/components';
import { Button } from 'shared/view/elements';

import { StylesProps, provideStyles } from './RetryModal.style';

const tKeys = allKeys.shared;

interface IProps {
  isOpen: boolean;
  onRetry(): void;
}

class RetryModal extends React.PureComponent<IProps & StylesProps & ITranslateProps> {
  public render() {

    const { classes, isOpen, t, onRetry, children } = this.props;
    return (
      <Modal size="small" isOpen={isOpen} title={t(tKeys.noEthereumConnection.getKey())}>
        <div className={classes.root}>
          <p className={classes.content}>
            {children}
          </p>
          <div className={classes.actions}>
            <Button
              className={classes.action}
              variant="outlined"
              color="secondary"
              size="small"
              onClick={onRetry}
              fullWidth
            >
              {t(tKeys.retry.getKey())}
            </Button>
          </div>
        </div>
      </Modal>
    );
  }
}

export default i18nConnect(provideStyles(RetryModal));
