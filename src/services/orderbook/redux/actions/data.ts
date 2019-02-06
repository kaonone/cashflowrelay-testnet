import * as NS from '../../namespace';

export function hideOrder(tokenId: NS.TokenId): NS.IHideOrder {
  return {
    type: 'ORDERBOOK:HIDE_ORDER',
    payload: tokenId,
  };
}
