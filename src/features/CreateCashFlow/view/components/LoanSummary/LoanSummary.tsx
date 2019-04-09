import * as React from 'react';
import * as moment from 'moment';

import { i18nConnect, ITranslateProps, tKeys as allKeys } from 'services/i18n';
import { formatNumber } from 'shared/helpers/format';

import { StylesProps, provideStyles } from './LoanSummary.style';

const tKeys = allKeys.features.createCashFlow.form;

const tKeysManageCashFlows = allKeys.features.manageCashFlows;

interface IOwnProps {
  duration: number; // milliseconds
  amount: number;
  interest: number;
  installmentSize: number;
  stakeSize: number;
  firstInstallmentDate: number; // milliseconds
  lastInstallmentDate: number; // milliseconds
  repayingAmount: number;
  periodDuration: number; // milliseconds
  nameInput: React.ReactElement<any>;
  actions: Array<React.ReactElement<any>>;
}

type IProps = IOwnProps & StylesProps & ITranslateProps;

class LoanSummary extends React.PureComponent<IProps> {
  public render() {
    const {
      classes, t, nameInput, actions, duration, periodDuration, stakeSize,
      amount, interest, installmentSize, firstInstallmentDate, lastInstallmentDate, repayingAmount } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.title}>{t(tKeys.loanSummary.getKey())}</div>
        <div className={classes.nameInputLabel}>{t(tKeys.name.getKey())}</div>
        <div className={classes.nameInputDescription}>{t(tKeys.nameDescription.getKey())}</div>
        <div className={classes.nameInput}>{nameInput}</div>
        <div>
          <div className={classes.field}>
            <span className={classes.fieldName}>{t(tKeys.fields.borrowingAmount.getKey())}</span>
            <span className={classes.fieldValue}>{`${formatNumber(amount, 2)} DAI`}</span>
          </div>
          <div className={classes.field}>
            <span className={classes.fieldName}>{t(tKeys.fields.repayingAmount.getKey())}</span>
            <span className={classes.fieldValue}>{`${formatNumber(repayingAmount, 2)} DAI (${interest}%)`}</span>
          </div>
          <div className={classes.field}>
            <span className={classes.fieldName}>{t(tKeys.fields.installmentSize.getKey())}</span>
            <span className={classes.fieldValue}>
              {t(tKeysManageCashFlows.amountPerPeriodicity.getKey(), {
                amount: formatNumber(installmentSize, 2),
                periodicity: moment.duration(periodDuration).humanize(),
              })}
            </span>
          </div>
          <div className={classes.field}>
            <span className={classes.fieldName}>{t(tKeys.fields.stakeSize.getKey())}</span>
            <span className={classes.fieldValue}>{`${formatNumber(stakeSize, 2)} AKT`}</span>
          </div>
          <div className={classes.field}>
            <span className={classes.fieldName}>{t(tKeys.fields.duration.getKey())}</span>
            <span className={classes.fieldValue}>{moment.duration(duration).humanize()}</span>
          </div>
          <div className={classes.field}>
            <span className={classes.fieldName}>{t(tKeys.fields.firstInstalment.getKey())}</span>
            <span className={classes.fieldValue}>{moment(firstInstallmentDate).format('LL')}</span>
          </div>
          <div className={classes.field}>
            <span className={classes.fieldName}>{t(tKeys.fields.lastInstalment.getKey())}</span>
            <span className={classes.fieldValue}>{moment(lastInstallmentDate).format('LL')}</span>
          </div>
          <div className={classes.actions}>
            {actions.map((action, i) => (
              <div key={i} className={classes.action} >{action}</div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export { IOwnProps };
export default (
  i18nConnect(
    provideStyles(
      LoanSummary,
    ),
  )
);
