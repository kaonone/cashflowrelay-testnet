import { tKeys, ITranslateKey } from 'services/i18n';

export function allowedCharactersForCashFlowName(value: string): ITranslateKey | undefined {
  const specificChars = ' .,?!-#$%&*\'"';
  const validationRegExp = new RegExp(`^(\\w|\\d|[${specificChars}])+$`);
  const characters = `[a-z], [A-Z], [${specificChars}]`;
  return !validationRegExp.test(value)
    ? { key: tKeys.shared.validation.allowedCharactersForCashFlowName.getKey(), params: { characters } }
    : undefined;
}
