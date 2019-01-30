import { bind } from 'decko';
import HttpActions from './HttpActions';

import Data from './Data';

import BaseApi from './BaseApi';

class Api {
  public data: Data;

  private actions: HttpActions;

  constructor(public baseUrl: string, public version: string = 'v1') {
    this.actions = new HttpActions(`${baseUrl}/${version}`);

    this.data = new Data(this.actions);
  }

  @bind
  public setToken(token: string | null) {
    const apiSet: BaseApi[] = [this.data];

    apiSet.forEach(item => item.token = token);
  }
}

export default Api;
