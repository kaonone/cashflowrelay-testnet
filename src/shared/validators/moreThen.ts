import { tKeys, ITranslateKey } from 'services/i18n';

export function moreThen(value: number, currentValue: number): ITranslateKey | undefined {
  return currentValue > value ? undefined : {
    key: tKeys.shared.validation.moreThen.getKey(),
    params: { value },
  };
}
