import * as React from 'react';
import * as cn from 'classnames';
import * as moment from 'moment';
import { BigNumber } from '0x.js';

import { i18nConnect, ITranslateProps, tKeys as tKeysAll } from 'services/i18n';

import { TokenType, IToken, ITokenStatus } from 'shared/types/models';
import { Star, OutlinedStar, CircleArrow } from 'shared/view/elements/Icons';
import { formatNumber } from 'shared/helpers/format';

import { StylesProps, provideStyles } from './Header.style';

const tKeys = tKeysAll.features.manageCashFlows;

interface IOwnProps {
  token: IToken;
  type: TokenType;
  expanded: boolean;
  price?: BigNumber;
  instalments: {
    paidInstallments: number;
    dueInstallments: number;
    missedInstallments: number;
  };
}

type IProps = IOwnProps & StylesProps & ITranslateProps;

class Header extends React.PureComponent<IProps> {
  public render() {
    const {
      classes, type, t, expanded, price,
      token: {
        interestRate, createdAt, periodDuration, lastInstalmentDate, instalmentSize, name, balance,
      },
      instalments: { paidInstallments, dueInstallments, missedInstallments },
    } = this.props;

    const nextInstalmentDate = moment.min(
      moment(lastInstalmentDate),
      moment(createdAt + Math.floor((Date.now() - createdAt) / periodDuration) * periodDuration),
    );

    const rating = 3; // TODO ds: calculate from orders
    const payerRating = 75; // TODO ds: calculate from orders

    const status: ITokenStatus = 'pending' as ITokenStatus; // TODO ds: calculate status

    return (
      <div className={classes.root}>
        <div className={classes.title}>{name}</div>
        <div className={classes.payersRating}>
          {type !== 'obligations' && <span className={classes.payersRatingValue}>{`${payerRating}%`}</span>}
        </div>
        <div className={classes.instalments}>
          <div className={cn(classes.instalment, classes.paid)}>{paidInstallments}</div>
          <div className={cn(classes.instalment, classes.due)}>{dueInstallments}</div>
          <div className={cn(classes.instalment, classes.missed)}>{missedInstallments}</div>
        </div>
        <div className={classes.stars}>
          {rating ?
            Array.from({ length: rating }).map((_, i) => <Star className={classes.activeStar} key={i} />)
            :
            Array.from({ length: 5 }).map((_, i) => <OutlinedStar key={i} />)
          }
        </div>
        <div className={classes.discountCell}>
          <div className={classes.discount}>{`${interestRate}%`}</div>
        </div>
        <div className={classes.statusCell}>
          <div className={cn(classes.status, { [classes.contained]: status === 'sold' || type === 'incoming' })}>
            {(() => {
              switch (type) {
                case 'incoming':
                case 'obligations':
                  return `${formatNumber(balance.toNumber(), 2)} DAI`;
                case 'selling':
                  return `+${formatNumber(instalmentSize.toNumber(), 2)} DAI`;
                default:
                  return t(tKeys.status[status].getKey());
              }
            })()}
          </div>
        </div>
        <div className={classes.nextInstalmentCell}>
          <div className={classes.nextInstalment}>{nextInstalmentDate.format('LL')}</div>

        </div>
        <div className={classes.amount}>
          {type === 'selling' && price && `${formatNumber(price.toNumber(), 2)} DAI`}
          {type !== 'selling' && `${formatNumber(instalmentSize.toNumber(), 2)} DAI`}
        </div>
        <CircleArrow className={cn(classes.expandIcon, { [classes.isRotated]: expanded })} />
      </div>
    );
  }
}

export default i18nConnect(provideStyles(Header));
