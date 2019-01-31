import * as React from 'react';
import { SubSet } from '_helpers';

import { i18nConnect, ITranslateProps, tKeys as tkeysAll } from 'services/i18n';
import { IToken } from 'shared/types/models';
import { provideStyles, StylesProps } from './CashFlowInfo.style';

const tKeys = tkeysAll.features.manageCashFlows;

type TokenField = SubSet<
  keyof IToken,
  'dueAmount' | 'repayingAmount' | 'instalmentSize' | 'duration' | 'firstInstalmentDate' | 'lastInstalmentDate'
>;

interface IOwnProps {
  token: IToken;
  fields: TokenField[];
  recommendedPrice?: string;
}

type IProps = IOwnProps & StylesProps & ITranslateProps;

class CashFlowInfo extends React.Component<IProps> {
  public render() {
    const {
      classes, t, recommendedPrice, token, fields,
    } = this.props;

    return (
      <div>
        {fields.includes('dueAmount') &&
          <>
            <div className={classes.daiAmount}>
              <span>{t(tKeys.borrowingAmount.getKey())}</span>
              <span>{`${token.dueAmount} DAI`}</span>
            </div>
            <div className={classes.usdAmount}>{`${token.dueAmount} USD`}</div>
          </>
        }
        <div className={classes.tokenFields}>
          {recommendedPrice &&
            <div className={classes.tokenField}>
              <span>{t(tKeys.recommendedPrice.getKey())}</span>
              <span>{recommendedPrice}</span>
            </div>
          }
          {fields.map(field => (
            <div key={field} className={classes.tokenField}>
              <span>{t(tKeys[field].getKey())}</span>
              <span>{this.formatValue(field)}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  public formatValue(field: TokenField) {
    const { t, token } = this.props;
    switch (field) {
      case 'instalmentSize':
        return t(tKeys.daiMonthly.getKey(), { amount: token[field] });
      case 'duration':
        return t(tKeys.months.getKey(), { amount: token[field] });
      case 'repayingAmount':
        return `${token[field]} DAI`;
      default:
        return token[field];
    }
  }
}

export { IProps };
export default i18nConnect(provideStyles(CashFlowInfo));
