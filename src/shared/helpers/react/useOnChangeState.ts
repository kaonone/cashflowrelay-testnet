import { useState, useEffect } from 'react';

type Predicate<T> = (prevValue: T, value: T) => boolean;
type Handler<T> = (prevValue: T, value: T) => void;

export default function useOnChangeState<T extends any>(value: T, predicate: Predicate<T>, handler: Handler<T>) {
  const [prevValue, setPrevValue] = useState(value);

  useEffect(() => {
    if (predicate(prevValue, value)) {
      handler(prevValue, value);
    }
    setPrevValue(value);
  }, [value]);
}
