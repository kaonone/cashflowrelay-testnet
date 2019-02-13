import * as React from 'react';
import * as cn from 'classnames';
import { BigNumber } from '0x.js';

import { i18nConnect, ITranslateProps, tKeys as tKeysAll } from 'services/i18n';
import { usePaymentOrders } from 'services/transactions';

import { TokenType, IToken, ITokenStatus } from 'shared/types/models';
import { StarsRating } from 'shared/view/elements';
import { CircleArrow } from 'shared/view/elements/Icons';
import {
  calcInstallmentsCount, groupInstallmentsByPaymentStatus, calcTokenRating, calcNextInstalmentDate,
} from 'shared/helpers/model';
import { formatNumber } from 'shared/helpers/format';

import { StylesProps, provideStyles } from './Header.style';

const tKeys = tKeysAll.features.manageCashFlows;

interface IOwnProps {
  token: IToken;
  type: TokenType;
  expanded: boolean;
  price?: BigNumber;
}

type IProps = IOwnProps & StylesProps & ITranslateProps;

function Header(props: IProps) {
  const { classes, type, t, expanded, price, token } = props;
  const { interestRate, instalmentSize, name, balance, id } = token;

  const { orders, ordersLoading } = usePaymentOrders(id);

  const nextInstalmentDate = calcNextInstalmentDate(token);

  const { paid, due, missed } = calcInstallmentsCount(groupInstallmentsByPaymentStatus(orders));
  const rating = calcTokenRating(orders);
  const payerRating = 75; // TODO ds: calculate from orders

  const status: ITokenStatus = 'pending' as ITokenStatus; // TODO ds: calculate status

  return (
    <div className={classes.root}>
      <div className={classes.title}>{name}</div>
      <div className={classes.payersRating}>
        {type !== 'obligations' && <span className={classes.payersRatingValue}>{`${payerRating}%`}</span>}
      </div>
      <div className={cn(classes.instalments, { [classes.withOpacity]: ordersLoading })}>
        <div className={cn(classes.instalment, classes.paid)}>{paid}</div>
        <div className={cn(classes.instalment, classes.due)}>{due}</div>
        <div className={cn(classes.instalment, classes.missed)}>{missed}</div>
      </div>
      <div className={cn(classes.stars, { [classes.withOpacity]: ordersLoading })}>
        <StarsRating rating={rating} />
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

export default i18nConnect(provideStyles(Header));
