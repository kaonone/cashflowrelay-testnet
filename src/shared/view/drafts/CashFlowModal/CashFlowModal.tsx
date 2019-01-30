import * as React from 'react';
import * as cn from 'classnames';

import { provideStyles, StylesProps } from './CashFlowModal.style';
import { DrawerModal } from 'shared/view/components';
import { i18nConnect, ITranslateProps, tKeys as tkeysAll } from 'services/i18n';
import { IToken } from 'shared/types/models';
import { Button, NumberInput } from 'shared/view/elements';
import { Alert } from 'shared/view/elements/Icons';
import { NumberFormatValues } from 'react-number-format';
import { bind } from 'decko';

const tKeys = tkeysAll.features.manageCashFlows;
interface IOwnProps {
  open: boolean;
  type: 'borrow' | 'selling';
  recommendedPrice?: string;
  repayingAmount?: number;
  duration: number;
  token: IToken;
  actions: Array<React.ReactElement<any>>;
  hint?: string;
  sellPrice?: number;
  onChangeSellPrice?(price: number): void;
  onClose(): void;
}

type IProps = IOwnProps & StylesProps & ITranslateProps;

class CashFlowModal extends React.Component<IProps> {
  public render() {
    const {
      classes, t, onClose, open, actions, hint, type, duration, repayingAmount, recommendedPrice,
      token: { name, instalmentSize, firstInstalmentDate, lastInstalmentDate, dueAmount },
      sellPrice,
    } = this.props;

    return (
      <DrawerModal
        onClose={onClose}
        open={open}
        anchor="right"
      >
        <div className={classes.root}>
          <div className={classes.title}>{name}</div>
          {type === 'borrow' &&
            <div className={classes.daiAmount}>
              <span>Borrowing amount</span>
              <span>{`${dueAmount} DAI`}</span>
            </div>}
          {type === 'selling' && sellPrice &&
            <div className={classes.sellPrice}>
              <span>Selling price</span>
              <div className={classes.sellInput}>
                <NumberInput
                  className={classes.sellInputField}
                  margin="none"
                  variant="outlined"
                  color="secondary"
                  value={sellPrice}
                  inputProps={{
                    className: classes.input,
                  }}
                  onChange={this.onChangeSellPrice}
                />
                <span>DAI</span>
              </div>
            </div>}
          <div className={classes.usdAmount}>2000 USD</div>

          <div className={cn(classes.tokenFields, { [classes.doubleMargin]: !hint })}>
            <div className={classes.tokenField}>
              {type === 'borrow' &&
                <>
                  <span>{t(tKeys.repayingAmount.getKey())}</span>
                  <span>{`${repayingAmount} DAI`}</span>
                </>}
              {type === 'selling' &&
                <>
                  <span>{t(tKeys.recommendedPrice.getKey())}</span>
                  <span>{`${recommendedPrice} DAI`}</span>
                </>}
            </div>
            <div className={classes.tokenField}>
              <span>{t(tKeys.instalmentSize.getKey())}</span>
              <span>{t(tKeys.daiMonthly.getKey(), { amount: instalmentSize })}</span>
            </div>
            <div className={classes.tokenField}>
              <span>{t(tKeys.duration.getKey())}</span>
              <span>{t(tKeys.months.getKey(), { amount: duration })}</span>
            </div>
            <div className={classes.tokenField}>
              <span>{t(tKeys.firstInstalmentDate.getKey())}</span>
              <span>{firstInstalmentDate}</span>
            </div>
            <div className={classes.tokenField}>
              <span>{t(tKeys.lastInstalmentDate.getKey())}</span>
              <span>{lastInstalmentDate}</span>
            </div>
          </div>
          {hint &&
            <div className={classes.hint}>
              <Alert className={classes.hintIcon} />
              {hint}</div>
          }
          <div className={classes.actions}>
            {actions.map((action, i) => <div className={classes.action} key={i}>{action}</div>)}
            <Button variant="outlined" className={classes.cancleButton} onClick={onClose} fullWidth>
              {t(tkeysAll.shared.cancel.getKey())}
            </Button>
          </div>
        </div>
      </DrawerModal>
    );
  }

  @bind
  public onChangeSellPrice(value: NumberFormatValues) {
    const { onChangeSellPrice } = this.props;
    if (onChangeSellPrice) {
      onChangeSellPrice(value.floatValue);
    }
  }
}

export { IProps };
export default i18nConnect(provideStyles(CashFlowModal));
