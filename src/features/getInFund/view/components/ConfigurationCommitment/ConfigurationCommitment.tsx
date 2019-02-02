import * as React from 'react';

import { i18nConnect, ITranslateProps, tKeys as allKeys, ITranslateFunction } from 'services/i18n';
import { MenuItem } from 'shared/view/elements';
import { TextInputField, NumberInputField, SliderField, SliderSelectField } from 'shared/view/form';
import { formatSliderLabelDefault, formatPercent } from 'shared/helpers/format';

import { createCashFlowConfig, fieldNames } from '../../../constants';
import { StylesProps, provideStyles } from './ConfigurationCommitment.style';
import { IFormData } from '../../../namespace';

const tKeys = allKeys.features.createCashFlow.form;

type IProps = StylesProps & ITranslateProps;

const getFieldProps = (field: keyof IFormData, t: ITranslateFunction) => ({
  required: true,
  fullWidth: true,
  name: fieldNames[field],
  label: t(tKeys.fields[field].getKey()),
});

class ConfigurationCommitment extends React.PureComponent<IProps> {
  public render() {
    const { classes, t } = this.props;

    const periodicityItems = createCashFlowConfig.availablePeriodicity.map(item => (
      <MenuItem key={item} value={item}>{t(tKeys.periodicityItemPrefix.getKey())} {item}</MenuItem>
    ));

    return (
      <div className={classes.root}>
        <div className={classes.title}>{t(tKeys.borrow.getKey())}</div>
        <div className={classes.description}>
          {t(tKeys.creationDescription.getKey())}
        </div>
        <div className={classes.field}>
          <div className={classes.borrowAmount}>
            <span>{t(tKeys.fields.amount.getKey())}</span>
            <NumberInputField
              className={classes.borrowAmountInput}
              required
              fullWidth
              name={fieldNames.amount}
              thousandSeparator
              decimalScale={2}
              inputProps={{ className: classes.borrowAmountValue }}
            />
            <span className={classes.isBold}>dai</span>
          </div>
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
              name={fieldNames.interest}
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
            <SliderSelectField name={fieldNames.periodicity} formatLabel={formatSliderLabelDefault}>
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
      </div>
    );
  }
}

export default (
  i18nConnect(
    provideStyles(
      ConfigurationCommitment,
    ),
  )
);
