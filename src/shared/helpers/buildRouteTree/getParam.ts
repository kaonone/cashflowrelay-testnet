import { IParam, PARAM_OPTIONS_SYMBOL, IRawRouteTree } from './namespace';

export default function getParam<B extends IRawRouteTree | null>(
  rawTree: B,
): B extends null ? IParam : NonNullable<B> & IParam {
  return {
    ...(rawTree as any),
    [PARAM_OPTIONS_SYMBOL]: {},
  };
}
