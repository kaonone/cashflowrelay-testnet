import * as React from 'react';
import { SubSet } from '_helpers';
import * as moment from 'moment';
import { formatNumber } from 'accounting';

import { i18nConnect, ITranslateProps, tKeys as tkeysAll } from 'services/i18n';
import { IToken } from 'shared/types/models';
import { provideStyles, StylesProps } from './CashFlowInfo.style';

const tKeys = tkeysAll.features.manageCashFlows;

type PartialToken = Pick<
  IToken,
  'periodDuration' | 'amount' | 'instalmentSize' | 'duration' | 'firstInstalmentDate' | 'lastInstalmentDate'
>;

type TokenField = SubSet<
  keyof PartialToken,
  'amount' | 'instalmentSize' | 'duration' | 'firstInstalmentDate' | 'lastInstalmentDate'
>;

interface IOwnProps {
  token: PartialToken;
  fields: TokenField[];
  price?: number;
  recommendedPrice?: string;
}

type IProps = IOwnProps & StylesProps & ITranslateProps;

class CashFlowInfo extends React.Component<IProps> {
  private renderValueByField: { [key in TokenField]: () => React.ReactNode } = {
    firstInstalmentDate: () => moment(this.props.token.firstInstalmentDate).format('LL'),
    lastInstalmentDate: () => moment(this.props.token.lastInstalmentDate).format('LL'),
    duration: () => moment.duration(this.props.token.duration).humanize(), // TODO ds: rewrite this formatter
    instalmentSize: () => this.props.t(tKeys.amountPerPeriodicity.getKey(), {
      amount: formatNumber(this.props.token.instalmentSize.toNumber(), 2),
      periodicity: moment.duration(this.props.token.periodDuration).humanize(),
    }),
    amount: () => `${formatNumber(this.props.token.amount.toNumber(), 2)} DAI`,
  };

  public render() {
    const { classes, t, recommendedPrice, price, fields } = this.props;

    return (
      <div>
        {price !== undefined &&
          <>
            <div className={classes.daiAmount}>
              <span>{t(tKeys.borrowingAmount.getKey())}</span>
              <span>{`${formatNumber(price, 2)} DAI`}</span>
            </div>
            <div className={classes.usdAmount}>{`${formatNumber(price, 2)} USD`}</div>
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
              <span>{this.renderValueByField[field]()}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
export { IProps };
export default i18nConnect(provideStyles(CashFlowInfo));
