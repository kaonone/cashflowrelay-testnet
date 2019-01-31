import * as React from 'react';
import { bind } from 'decko';
import { Form } from 'react-final-form';
import { MarkAs } from '_helpers';
import { connect } from 'react-redux';
import * as moment from 'moment';
import BigNumber from 'bignumber.js';
import createDecorator from 'final-form-calculate';

import { i18nConnect, ITranslateProps, tKeys as allKeys, ITranslateFunction, ITranslateKey } from 'services/i18n';
import { actions as transactionActions } from 'services/transactions';

import { TimePeriod } from 'shared/types/models';
import { Button, MenuItem } from 'shared/view/elements';
import { TextInputField, NumberInputField, SliderField, SliderSelectField } from 'shared/view/form';
import { lessThenOrEqual, moreThenOrEqual, moreThen, isRequired } from 'shared/validators';
import { formatSliderLabelDefault, formatPercent } from 'shared/helpers/format';
import { calcRepaymentAmount, calcInstallmentSize, OneDAI } from 'shared/helpers/model';

import { createCashFlowConfig } from '../../constants';
import { StylesProps, provideStyles } from './CreateCashFlowForm.style';

const tKeys = allKeys.features.createCashFlow.form;

interface IFormData {
  name: string;
  amount: number;
  interest: number;
  installmentSize: number;
  installmentCount: number;
  periodicity: TimePeriod;
}

// tslint:disable-next-line:no-empty-interface
interface IOwnProps {
  // onSuccess(): void;
}

type IActionProps = typeof mapDispatch;

type IProps = IOwnProps & IActionProps & StylesProps & ITranslateProps;

const initialValues: IFormData = {
  name: createCashFlowConfig.defaultName,
  amount: createCashFlowConfig.defaultAmount,
  interest: createCashFlowConfig.defaultInterest,
  installmentSize: calcInstallmentSize(
    createCashFlowConfig.defaultAmount,
    createCashFlowConfig.defaultInterest,
    createCashFlowConfig.defaultInstallmentCount,
  ).toNumber(),
  installmentCount: createCashFlowConfig.defaultInstallmentCount,
  periodicity: createCashFlowConfig.defaultPeriodicity,
};

const names: { [key in keyof IFormData]: key } = {
  name: 'name',
  amount: 'amount',
  interest: 'interest',
  installmentSize: 'installmentSize',
  installmentCount: 'installmentCount',
  periodicity: 'periodicity',
};

const getFieldProps = (field: keyof IFormData, t: ITranslateFunction) => ({
  required: true,
  fullWidth: true,
  name: names[field],
  label: t(tKeys.fields[field].getKey()),
});

function validateForm(values: IFormData): Partial<MarkAs<ITranslateKey, IFormData>> {
  return {
    name: isRequired(values.name),
    interest: (
      moreThenOrEqual(createCashFlowConfig.minInterest, values.interest) ||
      lessThenOrEqual(createCashFlowConfig.maxInterest, values.interest)
    ),
    amount: moreThen(createCashFlowConfig.minAmount, values.amount),
    installmentCount: moreThen(createCashFlowConfig.minInstallmentCount, values.installmentCount),

  };
}

const calculateDecorator = createDecorator({
  field: names.amount,
  updates: {
    [names.installmentSize]: (amount: number, all: IFormData): number =>
      calcInstallmentSize(amount, all.interest, all.installmentCount).toNumber(),
  },
}, {
    field: names.interest,
    updates: {
      [names.installmentSize]: (interest: number, all: IFormData): number =>
        calcInstallmentSize(all.amount, interest, all.installmentCount).toNumber(),
    },
  }, {
    field: names.installmentCount,
    updates: {
      [names.installmentSize]: (installmentCount: number, all: IFormData): number =>
        calcInstallmentSize(all.amount, all.interest, installmentCount).toNumber(),
    },
  });

class CreateCashFlowForm extends React.PureComponent<IProps> {
  public render() {
    const { classes, t } = this.props;

    const periodicityItems = createCashFlowConfig.availablePeriodicity.map(item => (
      <MenuItem key={item} value={item}>{t(tKeys.periodicityItemPrefix.getKey())} {item}</MenuItem>
    ));

    return (
      <Form
        onSubmit={this.onSubmit}
        validate={validateForm}
        initialValues={initialValues}
        subscription={{}}
        decorators={[calculateDecorator]}
      >
        {({ handleSubmit }) => (
          <form className={classes.root} onSubmit={handleSubmit}>
            <div className={classes.field}>
              <TextInputField {...getFieldProps('name', t)} />
            </div>
            <div className={classes.field}>
              <NumberInputField
                {...getFieldProps('amount', t)}
                thousandSeparator
                suffix="DAI"
                decimalScale={2}
              />
            </div>
            <div className={classes.field}>
              <NumberInputField
                {...getFieldProps('interest', t)}
                thousandSeparator
                suffix="%"
                decimalScale={0}
              />
              <div className={classes.slider}>
                <SliderField
                  name={names.interest}
                  min={createCashFlowConfig.minInterest}
                  max={createCashFlowConfig.maxInterest}
                  step={1}
                  formatLabel={formatPercent}
                />
              </div>
            </div>
            <div className={classes.field}>
              <NumberInputField
                {...getFieldProps('installmentSize', t)}
                disabled
                thousandSeparator
                suffix="DAI"
                decimalScale={2}
              />
            </div>
            <div className={classes.field}>
              <TextInputField {...getFieldProps('periodicity', t)} select>
                {periodicityItems}
              </TextInputField>
              <div className={classes.slider}>
                <SliderSelectField name={names.periodicity} formatLabel={formatSliderLabelDefault}>
                  {periodicityItems}
                </SliderSelectField>
              </div>
            </div>
            <div className={classes.field}>
              <NumberInputField
                {...getFieldProps('installmentCount', t)}
                thousandSeparator
                decimalScale={0}
              />
            </div>
            <div className={classes.actions}>
              <Button className={classes.action} fullWidth type="submit" variant="contained" color="primary">
                {t(tKeys.submitButton.getKey())}
              </Button>
            </div>
          </form>
        )}
      </Form>
    );
  }

  @bind
  private onSubmit(data: IFormData) {
    const { sendTransaction } = this.props;
    const value = OneDAI.times(calcRepaymentAmount(data.amount, data.interest));
    const commit = value.div(data.installmentCount).integerValue(BigNumber.ROUND_CEIL);
    const resultValue = commit.times(data.installmentCount);

    sendTransaction({
      type: 'createCashFlow',
      data: {
        name: data.name,
        value: resultValue,
        commit,
        duration: moment.duration(data.installmentCount, data.periodicity).asSeconds(),
        interestRate: data.interest,
      },
    });
  }
}

const mapDispatch = {
  sendTransaction: transactionActions.sendTransaction,
};

export { IOwnProps };
export default (
  connect(null, mapDispatch)(
    i18nConnect(
      provideStyles(
        CreateCashFlowForm,
      ),
    ),
  )
);
