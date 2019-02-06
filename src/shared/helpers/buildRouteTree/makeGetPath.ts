import * as qs from 'query-string';
import * as pathToRegexp from 'path-to-regexp';
import { IPathItem, GetPathFunc, IQueryParams } from './namespace';
import makeGetRoutePath from './makeGetRoutePath';

export default function makeGetPath(path: IPathItem[]): GetPathFunc {
  const withParams = path.some(({ isParam }) => isParam);
  const routePath: string = makeGetRoutePath(path)();

  if (withParams) {
    return (params: Record<string, string>, queryParams?: IQueryParams): string => {
      const queryString = queryParams ? `?${qs.stringify(queryParams)}` : '';
      return `${pathToRegexp.compile(routePath)(params)}${queryString}`;
    };
  }

  return (queryParams?: IQueryParams): string => {
    const queryString = queryParams ? `?${qs.stringify(queryParams)}` : '';
    return `${routePath}${queryString}`;
  };
}
