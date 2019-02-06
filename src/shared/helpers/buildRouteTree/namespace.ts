export const PARAM_OPTIONS_SYMBOL = Symbol.for('isParam');

export interface IParam {
  [PARAM_OPTIONS_SYMBOL]: IParamOptions;
}

export interface IParamOptions {
  isRequired?: boolean;
}

export function isParamGuard(data: any): data is IParam {
  return !!data && !!data[PARAM_OPTIONS_SYMBOL];
}

export interface IQueryParams {
  [param: string]: string;
}

export interface IPathItem {
  value: string;
  isParam: boolean;
}

export interface IRoutable extends IRoutableBase {
  getRedirectPath: GetPathFunc;
}

export type GetPathFunc = IGetPath<string, true>['getRedirectPath'] & IGetPath<string, null>['getRedirectPath'];

export interface IRawRouteTree {
  [routeKey: string]: IRawRouteBranch;
}

type IRawRouteBranch = IRawRouteTree | IParam | (IRawRouteTree & IParam) | null;

export function isRawRouteTree(value: IRawRouteBranch): value is IRawRouteTree {
  const isOnlyParam: boolean = isParamGuard(value) && !Object.keys(value).length;
  const isNull = value === null;
  return !isNull && !isOnlyParam;
}

export type RouteTree<T, Acc extends string = never, WithParam extends true | null = null> = {
  [P in Extract<keyof T, string>]:
  & RouteTree<T[P], AccumulateParamKey<T[P], Acc, P>, CheckWithParams<T[P], WithParam>>
  & IGetPath<AccumulateParamKey<T[P], Acc, P>, CheckWithParams<T[P], WithParam>>
  & IRoutableBase;
};

type AccumulateParamKey<T, Acc extends string, Cur extends string> =
  T extends IParam ? Acc | Cur : Acc;

type CheckWithParams<T, Prev extends true | null> =
  Prev extends true ? true :
  T extends IParam ? true : null;

type IGetPath<P extends string, WithParam extends true | null> = WithParam extends true
  ? { getRedirectPath(params: Record<P, string>, queryParams?: Record<string, string>): string }
  : { getRedirectPath(queryParams?: Record<string, string>): string; };

interface IRoutableBase {
  getRoutePath(): string;
  getElementKey(): string;
}
