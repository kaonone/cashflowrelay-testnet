import * as React from 'react';
import { bind } from 'decko';
import * as cn from 'classnames';
import { connect } from 'react-redux';

import { i18nConnect, ITranslateProps, tKeys as tKeysAll } from 'services/i18n';
import { selectors as userSelectors } from 'services/user';
import { TokenType, IToken, IOrderList } from 'shared/types/models';
import { IAppReduxState } from 'shared/types/app';
import { AngleArrow } from 'shared/view/elements/Icons';

import { StylesProps, provideStyles } from './TokensList.style';
import TokenCard from '../../components/TokenCard/TokenCard';

const tKeys = tKeysAll.features.manageCashFlows;

export type ColumnsTitles = 'name' | 'stake' | 'performance' |
  'rating' | 'nextInstalment' | 'cashFlowBalance' |
  'discount' | 'dueAmount' | 'instalmentSize' | 'price';

const titlesKeys: ColumnsTitles[] = ['name', 'stake', 'performance', 'rating', 'discount'];

const cashFlowTitles = titlesKeys.concat(['cashFlowBalance', 'nextInstalment', 'dueAmount']);

const sellingTitles = titlesKeys.concat(['instalmentSize', 'nextInstalment', 'price']);

interface IOwnProps {
  type: TokenType;
  tokenIds?: string[];
  orders?: IOrderList;
}

interface IStateProps {
  account: string | null;
}

function mapState(state: IAppReduxState): IStateProps {
  return {
    account: userSelectors.selectConfirmedAddress(state),
  };
}

interface IState {
  expandedTokenId: string | null;
}

type IProps = IStateProps & IOwnProps & ITranslateProps & StylesProps;

const isNeedTokenByType: Record<TokenType, (token: IToken) => boolean> = {
  selling: () => true,
  obligations: token => token.isCreatedByMe,
  incoming: token => !token.isCreatedByMe,
};

class TokensList extends React.PureComponent<IProps, IState> {
  public state: IState = { expandedTokenId: null };
  public render() {
    const { classes, t, type, tokenIds, orders, account } = this.props;
    const { expandedTokenId } = this.state;

    const headerTitles = type === 'selling' ? sellingTitles : cashFlowTitles;
    return (
      <div className={classes.root}>
        <div className={classes.header}>
          {headerTitles.map(k =>
            <div className={cn(classes.tokenMetric, classes[k])} key={k}>
              {t(tKeys[k].getKey())}
              <AngleArrow className={classes.sortToggleIcon} />
            </div>)}
          <div className={classes.stubCell} />
        </div>
        <div className={classes.tokens}>
          {tokenIds && tokenIds.map(tokenId => (
            <TokenCard
              key={tokenId}
              account={account}
              className={classes.tokenCard}
              onToggle={this.expandCard}
              expanded={tokenId === expandedTokenId}
              tokenId={tokenId}
              type={type}
              isNeedDisplay={isNeedTokenByType[type]}
            />
          ))}
          {orders && orders.records.map((order, index) => (
            <TokenCard
              key={order.tokenId.toString() + index}
              account={account}
              className={classes.tokenCard}
              onToggle={this.expandCard}
              expanded={order.tokenId.toString() === expandedTokenId}
              tokenId={order.tokenId.toString()}
              marketOrder={order}
              type={type}
              isNeedDisplay={isNeedTokenByType[type]}
              price={order.price}
            />
          ))}
        </div>
        <div className={classes.emptyStub}>{
          type === 'incoming' ? t(tKeys.emptyIncomingList.getKey())
            :
            t(tKeys.emptyOutgoingList.getKey())
        }</div>
      </div>
    );
  }

  @bind
  public expandCard(tokenId: string) {
    this.setState((pState: IState) => ({ expandedTokenId: pState.expandedTokenId === tokenId ? null : tokenId }));
  }
}

export default (
  connect(mapState)(
    i18nConnect(
      provideStyles(TokensList),
    ),
  )
);
