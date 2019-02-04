import { ICommunication } from 'shared/types/redux';

export default function isSucceededByState<T>(prev: ICommunication<T>, next: ICommunication<T>): boolean {
  return prev.isRequesting && !next.isRequesting && !next.error;
}
