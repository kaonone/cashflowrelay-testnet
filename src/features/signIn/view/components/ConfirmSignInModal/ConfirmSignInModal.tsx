import * as React from 'react';
import * as cn from 'classnames';

import { ITranslateProps, i18nConnect, tKeys as allKeys } from 'services/i18n';
import { ICommunication } from 'shared/types/redux';
import { Modal } from 'shared/view/components';
import { Button, CircleProgressBar } from 'shared/view/elements';

import { StylesProps, provideStyles } from './ConfirmSignInModal.style';

const tKeys = allKeys.features.signIn.confirmModal;

interface IProps {
  isOpen: boolean;
  signing: ICommunication;
  address: string;
  onConfirm(): void;
  onClose(): void;
}

function ConfirmSignInModal(props: IProps & StylesProps & ITranslateProps) {
  const { classes, isOpen, t, address, onClose: onCancel, onConfirm, signing: { isRequesting } } = props;
  return (
    <Modal size="small" isOpen={isOpen} title={t(tKeys.title.getKey())} onClose={!isRequesting ? onCancel : undefined}>
      <div className={classes.root}>
        <p className={classes.paragraph}>{t(tKeys.beforeAddressDescription.getKey())}</p>
        <p className={cn(classes.paragraph, classes.address)}>{address}</p>
        <p className={classes.paragraph}>{t(tKeys.afterAddressDescription.getKey())}</p>
        <div className={classes.actions}>
          <Button
            className={classes.action}
            color="secondary"
            onClick={onCancel}
            disabled={isRequesting}
          >
            {t(tKeys.buttons.cancel.getKey())}
          </Button>
          <Button
            className={classes.action}
            variant="outlined"
            color="secondary"
            onClick={onConfirm}
            disabled={isRequesting}
          >
            {t(tKeys.buttons.confirm.getKey())}
            {isRequesting && <div className={classes.preloader}><CircleProgressBar size={22} /></div>}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default i18nConnect(provideStyles(ConfirmSignInModal));
