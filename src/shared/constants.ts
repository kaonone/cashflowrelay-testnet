import * as moment from 'moment';
import { BigNumber } from '0x.js';

// tslint:disable:max-line-length
export const mainContractName = 'C2FCFull';
export const messageForSignature = 'Signing this message proves to CashflowRelay you are in control of your account and allows CashflowRelay to operate with heightened security while never storing any sensitive account information';

export const DECIMAL = 18;
export const DEFAULT_ORDER_EXPIRATION_DURATION = new BigNumber(moment.duration(7, 'day').asSeconds());
export const NULL_ADDRESS = '0x0000000000000000000000000000000000000000';
export const ZERO = new BigNumber(0);
