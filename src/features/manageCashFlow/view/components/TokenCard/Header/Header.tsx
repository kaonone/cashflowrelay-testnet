import * as React from 'react';
import * as cn from 'classnames';
import { BigNumber } from '0x.js';

import { i18nConnect, ITranslateProps, tKeys as tKeysAll } from 'services/i18n';
import { usePaymentOrders } from 'services/transactions';

import { TokenType, IToken } from 'shared/types/models';
import { StarsRating } from 'shared/view/elements';
import { CircleArrow } from 'shared/view/elements/Icons';
import {
  calcInstallmentsCount, groupInstallmentsByPaymentStatus, calcTokenRating, calcNextInstalmentDate,
} from 'shared/model/calculate';
import { useTokenStatus } from 'shared/model/hooks';
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

  const { orders: paymentOrders, ordersLoading: paymentOrdersLoading } = usePaymentOrders(id);
  const { status, statusLoading } = useTokenStatus(id);

  const nextInstalmentDate = calcNextInstalmentDate(token);

  const { paid, due, missed } = calcInstallmentsCount(groupInstallmentsByPaymentStatus(paymentOrders));
  const rating = calcTokenRating(paymentOrders);
  const payerRating = 75; // TODO ds: calculate from orders

  const isNullBalance = token.balance.comparedTo(0) === 0;
  const isContainedStatus = !status && !isNullBalance || status === 'sold';

  return (
    <div className={classes.root}>
      <div className={classes.title}>{name}</div>
      <div className={classes.payersRating}>
        {type !== 'obligations' && <span className={classes.payersRatingValue}>{`${payerRating}%`}</span>}
      </div>
      <div className={cn(classes.instalments, { [classes.withOpacity]: paymentOrdersLoading })}>
        <div className={cn(classes.instalment, classes.paid)}>{paid}</div>
        <div className={cn(classes.instalment, classes.due)}>{due}</div>
        <div className={cn(classes.instalment, classes.missed)}>{missed}</div>
      </div>
      <div className={cn(classes.stars, { [classes.withOpacity]: paymentOrdersLoading })}>
        <StarsRating rating={rating} />
      </div>
      <div className={classes.discountCell}>
        <div className={classes.discount}>{`${interestRate}%`}</div>
      </div>
      <div className={cn(classes.statusCell, { [classes.withOpacity]: statusLoading })}>
        <div className={cn(classes.status, { [classes.contained]: isContainedStatus })}>
          {!!status ? t(tKeys.status[status].getKey()) : ({
            incoming: `${formatNumber(balance.toNumber(), 2)} DAI`,
            obligations: `${formatNumber(balance.toNumber(), 2)} DAI`,
            selling: `+${formatNumber(instalmentSize.toNumber(), 2)} DAI`,
          })[type]}
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
