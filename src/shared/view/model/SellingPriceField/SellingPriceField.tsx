import * as React from 'react';
import { bind } from 'decko';
import { NumberFormatValues } from 'react-number-format';

import { i18nConnect, ITranslateProps, tKeys as tkeysAll } from 'services/i18n';
import { NumberInput } from 'shared/view/elements';
import { provideStyles, StylesProps } from './SellingPriceField.style';

const tKeys = tkeysAll.features.manageCashFlows;

interface IOwnProps {
  sellPrice?: number;
  disabled: boolean;
  onChangeSellPrice?(price: number): void;
}

type IProps = IOwnProps & StylesProps & ITranslateProps;

class SellingPriceField extends React.Component<IProps> {
  public render() {
    const { classes, t, sellPrice, disabled } = this.props;

    return (
      <div>
        <div className={classes.sellPrice}>
          <span>{t(tKeys.sellingPrice.getKey())}</span>
          <div className={classes.sellInput}>
            <NumberInput
              className={classes.sellInputField}
              margin="none"
              variant="outlined"
              value={sellPrice || 1000}
              disabled={disabled}
              InputProps={{
                inputProps: {
                  className: classes.input,
                },
                classes: {
                  root: classes.cssOutlinedInput,
                  focused: classes.cssFocused,
                  notchedOutline: classes.notchedOutline,
                },
              }}
              onChange={this.onChangeSellPrice}
            />
            <span>DAI</span>
          </div>
        </div>
        <div className={classes.usdAmount}>{`${sellPrice} USD`}</div>

      </div>
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
export default i18nConnect(provideStyles(SellingPriceField));
