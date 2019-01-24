// Copy-Paste from https://github.com/ethereum/web3.js/blob/master/lib/utils/utils.js
const SHA3 = require('crypto-js/sha3');

/**
 * Checks if the given string is an address
 *
 * @method isEthereumAddress
 * @param {String} address the given HEX adress
 * @return {Boolean}
 */
export function isEthereumAddress(address: string): boolean {
  if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
    // check if it has the basic requirements of an address
    return false;
  } else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
    // If it's all small caps or all all caps, return true
    return true;
  } else {
    // Otherwise check each case
    return isChecksumAddress(address);
  }
}

/**
 * Checks if the given string is a checksummed address
 *
 * @method isChecksumAddress
 * @param {String} address the given HEX adress
 * @return {Boolean}
 */
function isChecksumAddress(address: string): boolean {
  // Check each case
  address = address.replace('0x', '');
  const addressHash = sha3(address.toLowerCase());

  for (let i = 0; i < 40; i++) {
    // the nth letter should be uppercase if the nth digit of casemap is 1
    if (
      (parseInt(addressHash[i], 16) > 7 && address[i].toUpperCase() !== address[i]) ||
      (parseInt(addressHash[i], 16) <= 7 && address[i].toLowerCase() !== address[i])
    ) {
      return false;
    }
  }
  return true;
}

function sha3(value: string) {
  return SHA3(value, {
    outputLength: 256,
  }).toString();
}
