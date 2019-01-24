import { tKeys, ITranslateKey } from 'services/i18n';

export function isRequired(value: any): ITranslateKey | undefined {
  return !value ? tKeys.shared.validation.isRequired.getKey() : undefined;
}
