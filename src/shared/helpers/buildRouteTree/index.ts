import { isRawRouteTree, isParamGuard, IRawRouteTree, RouteTree, IPathItem, IRoutable } from './namespace';
import makeGetPath from './makeGetPath';
import makeGetRoutePath from './makeGetRoutePath';
import { ROUTES_PREFIX } from 'core/constants';

export { default as getParam } from './getParam';

type Tree<T extends IRawRouteTree> = RouteTree<T> & { root(): string };

// TODO watch for https://github.com/Microsoft/TypeScript/issues/10727 to fix any types
export default function buildRouteTree<T extends IRawRouteTree>(rawTree: T): Tree<T> {
  const resultTree = (function loop(tree: IRawRouteTree, path: IPathItem[] = []): RouteTree<T> {
    const prefix: IPathItem[] = ROUTES_PREFIX ? [{
      isParam: false,
      value: ROUTES_PREFIX!.replace('/', ''),
    }] : [];

    return Object
      .entries(tree)
      .reduce<RouteTree<any>>((acc: RouteTree<T>, [key, value]) => {
        const xPath: IPathItem[] = [...path, { value: key, isParam: isParamGuard(value) }];

        const routeData: IRoutable = {
          getRoutePath: makeGetRoutePath(prefix.concat(xPath)),
          getRedirectPath: makeGetPath(prefix.concat(xPath)),
          getElementKey: () => key,
        };
        if (!isRawRouteTree(value)) {
          return { ...(acc as any), [key]: routeData };
        }
        return {
          ...(acc as any),
          [key]: {
            ...(loop(value, xPath) as any),
            ...routeData,
          },
        };
      }, {} as RouteTree<T>);
  })(rawTree);

  const root = () => ROUTES_PREFIX || '/';

  return { ...resultTree, root } as Tree<T>;
}
