import * as React from 'react';
import * as ReactModal from 'react-modal';
import * as cn from 'classnames';

import { Cross } from 'shared/view/elements/Icons';
import { IconButton } from 'shared/view/elements';

import { provideStyles, StylesProps } from './Modal.style';

interface IOwnProps {
  children?: React.ReactNode;
  size: 'small' | 'medium' | 'large' | 'xLarge';
  type?: 'default' | 'signTransaction';
  variant?: 'primary' | 'secondary';
  isOpen: boolean;
  title?: string;
  titleAlign?: 'center' | 'left';
  onClose?: () => void;
}

type IProps = IOwnProps & StylesProps;

ReactModal.setAppElement('#root');

class Modal extends React.Component<IProps> {
  public render() {
    const { classes, children, isOpen, onClose, title, variant } = this.props;

    return (
      <ReactModal
        portalClassName={classes.portal}
        className={classes.modal && {
          base: cn(classes.modal, {
            [classes.isPrimary]: !variant || variant === 'primary',
            [classes.isSecondary]: variant === 'secondary',
          }),
          afterOpen: classes.modalAfterOpen,
          beforeClose: classes.modalBeforeClose,
        }}
        overlayClassName={classes.overlay && {
          base: classes.overlay,
          afterOpen: classes.overlayAfterOpen,
          beforeClose: classes.overlayBeforeClose,
        }}
        isOpen={isOpen}
        onRequestClose={onClose}
        closeTimeoutMS={400}
      >
        {!!title && (
          <div className={classes.title}>
            {variant === 'secondary' && <CrossButton isHidden classes={classes} />}
            {title}
            {variant === 'secondary' && <CrossButton classes={classes} onClick={onClose} />}
          </div>
        )}
        {!title && variant === 'secondary' && <CrossButton isAbsolute classes={classes} onClick={onClose} />}
        {children}
      </ReactModal>
    );
  }
}

interface ICrossButtonProps {
  isAbsolute?: boolean;
  isHidden?: boolean;
  onClick?(): void;
}

function CrossButton({ isAbsolute, isHidden, classes, onClick }: ICrossButtonProps & StylesProps) {
  return (
    <div
      className={cn(classes.cross, {
        [classes.isAbsolute]: isAbsolute,
        [classes.isHidden]: isHidden,
      })}
    >
      <IconButton onClick={onClick} ><Cross /></IconButton>
    </div>
  );
}

export { IProps };
export default provideStyles(Modal);
