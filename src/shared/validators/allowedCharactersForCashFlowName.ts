import { tKeys, ITranslateKey } from 'services/i18n';

export function allowedCharactersForCashFlowName(value: string): ITranslateKey | undefined {
  const validationRegExp = new RegExp(`^(\\w| )+$`);
  return !validationRegExp.test(value)
    ? tKeys.shared.validation.allowedCharactersForCashFlowName.getKey()
    : undefined;
}
