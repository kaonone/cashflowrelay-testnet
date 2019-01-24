import { bind } from 'decko';
import EventEmitter from 'events';
import { delay } from 'redux-saga';

import { ABIRequest, ITransaction } from 'shared/types/models';
import BaseApi from './BaseApi';

const ee = new EventEmitter();

class Transactions extends BaseApi {
  @bind
  public async generateABI(request: ABIRequest): Promise<string> {
    console.log('>>> generate ABI request', request);
    await delay(1000);
    const mockTxid = `${request.uuid}:${request.type}`;
    setTimeout(() => ee.emit('transaction-completed', { txid: mockTxid }), 3000);
    return `Abi for ${mockTxid}`;
  }

  @bind
  public subscribeOnTransaction(_uuid: string, emitter: (data: ITransaction) => void): () => void {
    ee.on('transaction-completed', emitter);
    return () => ee.removeListener('transaction-completed', emitter);
  }
}

export default Transactions;
