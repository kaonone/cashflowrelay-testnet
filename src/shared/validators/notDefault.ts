import { tKeys, ITranslateKey } from 'services/i18n';

export function notDefault<T>(defaultValue: T, currentValue: T): ITranslateKey | undefined {
  return defaultValue !== currentValue ? undefined : tKeys.shared.validation.notDefault.getKey();
}
