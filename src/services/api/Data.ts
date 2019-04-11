import { bind } from 'decko';
import * as R from 'ramda';

import { Resource, DataByResource, IListResponse, ListRequestUnion, ID } from 'shared/types/models';
import { delay } from 'shared/helpers';
import BaseApi from './BaseApi';

function makeMocks<T extends { id: ID }>(values: T[]): T[] {
  const coef = Math.ceil(Math.random() * 5 + 10);
  return R.flatten<T>(Array.from<T[]>({ length: coef }).fill(values)).map((item, index) => ({ ...item, id: index }));
}

const mockByResource: { [key in Resource]: Array<DataByResource[key]> } = {
  incoming: makeMocks([{ id: 1 }, { id: 1 }]),
};

class Data extends BaseApi {
  @bind
  public async loadList<T extends Resource>(request: ListRequestUnion): Promise<IListResponse<T>> {
    console.log('>> loadList request', request);
    const { pagination: p } = request;
    await delay(1000);
    const allDate = mockByResource[request.resource] as Array<DataByResource[T]>;
    const data = p
      ? allDate.slice((p.current - 1) * p.perPage, p.current * p.perPage)
      : allDate;

    const response = {
      data,
      total: allDate.length,
    };
    console.log('>> loadList response', response);

    return response;
  }
}

export default Data;
