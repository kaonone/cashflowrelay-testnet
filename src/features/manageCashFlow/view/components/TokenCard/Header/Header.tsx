import * as React from 'react';
import * as cn from 'classnames';

import { TokenType, IToken } from 'shared/types/models';
import { Star, OutlinedStar, CircleArrow } from 'shared/view/elements/Icons';
import { i18nConnect, ITranslateProps, tKeys as tKeysAll } from 'services/i18n';

import { StylesProps, provideStyles } from './Header.style';

const tKeys = tKeysAll.features.manageCashFlows;

interface IOwnProps {
  token: IToken;
  type: TokenType;
  expanded: boolean;
}

type IProps = IOwnProps & StylesProps & ITranslateProps;

class Header extends React.PureComponent<IProps> {
  public render() {
    const {
      classes, type, t, expanded,
      token: {
        discount, dueAmount, instalments, nextInstalmentDate, instalmentSize,
        rating, name, status, payerRating, balance, price },
    } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.title}>{name}</div>
        <div className={classes.payersRating}>
          {type !== 'obligations' && <span className={classes.payersRatingValue}>{`${payerRating}%`}</span>}
        </div>
        <div className={classes.instalments}>
          <div className={cn(classes.instalment, classes.paid)}>{instalments.paid}</div>
          <div className={cn(classes.instalment, classes.due)}>{instalments.due}</div>
          <div className={cn(classes.instalment, classes.missed)}>{instalments.missed}</div>
        </div>
        <div className={classes.stars}>
          {rating ?
            Array.from({ length: rating }).map((_, i) => <Star className={classes.activeStar} key={i} />)
            :
            Array.from({ length: 5 }).map((_, i) => <OutlinedStar key={i} />)
          }
        </div>
        <div className={classes.discountCell}>
          <div className={classes.discount}>{`${discount}%`}</div>
        </div>
        <div className={classes.statusCell}>
          <div className={cn(classes.status, { [classes.contained]: status === 'sold' || type === 'incoming' })}>
            {(() => {
              switch (type) {
                case 'incoming':
                  return `${balance} DAI`;
                case 'selling':
                  return `+${instalmentSize} DAI`;
                default:
                  return t(tKeys.status[status].getKey());
              }
            })()}
          </div>
        </div>
        <div className={classes.nextInstalmentCell}>
          <div className={classes.nextInstalment}>{nextInstalmentDate}</div>

        </div>
        <div className={classes.amount}>{`${type === 'selling' ? price : dueAmount} DAI`}</div>
        <CircleArrow className={cn(classes.expandIcon, { [classes.isRotated]: expanded })} />
      </div>
    );
  }
}

export default i18nConnect(provideStyles(Header));
