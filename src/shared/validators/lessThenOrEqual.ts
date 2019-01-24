import { tKeys, ITranslateKey } from 'services/i18n';

export function lessThenOrEqual(value: number, currentValue: number): ITranslateKey | undefined {
  return currentValue <= value ? undefined : {
    key: tKeys.shared.validation.lessThenOrEqual.getKey(),
    params: { value },
  };
}
