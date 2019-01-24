import { isEthereumAddress } from './isEthereumAddress';
import { ITranslateKey, tKeys } from 'services/i18n';

function validate(value: string): ITranslateKey | undefined {
  return isEthereumAddress(value) ? undefined : tKeys.shared.validation.invalidWalletAddress.getKey();
}

export { validate as isEthereumAddress };
