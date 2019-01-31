import * as React from 'react';
import * as moment from 'moment';

import { i18nConnect, ITranslateProps, tKeys as allKeys } from 'services/i18n';
import { toFixed } from 'shared/helpers/integer';

import { IFormData } from '../../../namespace';
import { StylesProps, provideStyles } from './LoanSummary.style';

const tKeys = allKeys.features.createCashFlow.form;

interface IOwnProps {
  fields: IFormData;
  nameInput: React.ReactElement<any>;
  actions: Array<React.ReactElement<any>>;
}

type IProps = IOwnProps & StylesProps & ITranslateProps;

class CreateCashFlowForm extends React.PureComponent<IProps> {
  public render() {
    const {
      classes, t, nameInput, actions,
      fields: { installmentCount, periodicity, amount, interest, installmentSize } } = this.props;
    const today = moment().endOf('day').format('DD MMMM YYYY');
    const lastDay = moment().add(installmentCount, periodicity).endOf('day').format('DD MMMM YYYY');
    const repayingAmount = amount + amount * (interest / 100);
    return (
      <div className={classes.root}>
        <div className={classes.title}>{t(tKeys.loanSummary.getKey())}</div>
        <div className={classes.nameInputLabel}>{t(tKeys.name.getKey())}</div>
        <div className={classes.nameInputDescription}>{t(tKeys.nameDescription.getKey())}</div>
        <div className={classes.nameInput}>{nameInput}</div>
        <div>
          <div className={classes.field}>
            <span className={classes.fieldName}>{t(tKeys.fields.borrowingAmount.getKey())}</span>
            <span className={classes.fieldValue}>{`${amount || '-'} DAI`}</span>
          </div>
          <div className={classes.field}>
            <span className={classes.fieldName}>{t(tKeys.fields.repayingAmount.getKey())}</span>
            <span className={classes.fieldValue}>{`${toFixed(repayingAmount, 2)} DAI (${interest}%)`}</span>
          </div>
          <div className={classes.field}>
            <span className={classes.fieldName}>{t(tKeys.fields.installmentSize.getKey())}</span>
            <span className={classes.fieldValue}>{toFixed(installmentSize, 2)}</span>
          </div>
          <div className={classes.field}>
            <span className={classes.fieldName}>{t(tKeys.fields.installmentCount.getKey())}</span>
            <span className={classes.fieldValue}>{`${installmentCount || '-'} ${periodicity}`}</span>
          </div>
          <div className={classes.field}>
            <span className={classes.fieldName}>{t(tKeys.fields.firstInstalment.getKey())}</span>
            <span className={classes.fieldValue}>{today}</span>
          </div>
          <div className={classes.field}>
            <span className={classes.fieldName}>{t(tKeys.fields.lastInstalment.getKey())}</span>
            <span className={classes.fieldValue}>{lastDay}</span>
          </div>
          <div className={classes.actions}>
            {actions.map((action, i) => (
              <div key={i} className={classes.action} >{actions}</div>
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
      CreateCashFlowForm,
    ),
  )
);
