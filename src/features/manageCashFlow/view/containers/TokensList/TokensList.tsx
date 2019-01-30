import * as React from 'react';
import { bind } from 'decko';
import * as cn from 'classnames';

import { TokenType } from 'shared/types/models';
import { i18nConnect, ITranslateProps, tKeys as tKeysAll } from 'services/i18n';
import { AngleArrow } from 'shared/view/elements/Icons';
import { incomingMock, obligationsMock } from 'shared/helpers/mocks';

import { StylesProps, provideStyles } from './TokensList.style';
import TokenCard from '../../components/TokenCard/TokenCard';

const tKeys = tKeysAll.features.manageCashFlows;

export type ColumnsTitles = 'name' | 'payersRating' | 'performance' |
  'rating' | 'nextInstalment' | 'cashFlowBalance' |
  'discount' | 'dueAmount' | 'instalmentSize' | 'price';

const titlesKeys: ColumnsTitles[] = ['name', 'payersRating', 'performance', 'rating', 'discount'];

const cashFlowTitles = titlesKeys.concat(['cashFlowBalance', 'nextInstalment', 'dueAmount']);

const sellingTitles = titlesKeys.concat(['instalmentSize', 'nextInstalment', 'price']);

interface IOwnProps {
  type: TokenType;
}

interface IState {
  expandedTokenId: number | null;
}

type IProps = IOwnProps & ITranslateProps & StylesProps;

class TokensList extends React.PureComponent<IProps, IState> {
  public state: IState = { expandedTokenId: null };
  public render() {
    const { classes, t, type } = this.props;
    const { expandedTokenId } = this.state;

    const headerTitles = type === 'selling' ? sellingTitles : cashFlowTitles;
    return (
      <div className={classes.root}>
        <div className={classes.header}>
          {headerTitles.map(k =>
            <div className={cn(classes.tokenMetric, classes[k])} key={k}>
              {!(type === 'obligations' && k === 'payersRating') &&
                <>
                  {t(tKeys[k].getKey())}
                  <AngleArrow className={classes.sortToggleIcon} />
                </>
              }
            </div>)}
          <div className={classes.stubCell} />
        </div>
        <div className={classes.tokens}>
          {(type === 'obligations' ? obligationsMock : incomingMock).map(token => (
            <div key={token.id} className={classes.tokenCard}>
              <TokenCard
                onToggle={this.expandCard}
                expanded={token.id === expandedTokenId}
                token={token}
                type={type}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  @bind
  public expandCard(tokenId: number) {
    this.setState((pState: IState) => ({ expandedTokenId: pState.expandedTokenId === tokenId ? null : tokenId }));
  }
}

export default i18nConnect(provideStyles(TokensList));
