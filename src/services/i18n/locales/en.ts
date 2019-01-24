// tslint:disable:max-line-length
export default {
  shared: {
    menu: {
      myC2FCs: 'My C2FCs',
      marketplace: 'Marketplace',
    },
    validation: {
      isRequired: 'Field is required',
      moreThenOrEqual: 'Should be more then or equal %{value}',
      lessThenOrEqual: 'Should be less then or equal %{value}',
      invalidWalletAddress: 'Invalid wallet address',
    },
    pageNotFound: 'We can’t find this page',
    copiedAtClipboard: 'Copied at clipboard',
  },
  components: {
    fund: {
      commissionLabel: 'Commission',
      policyLabel: 'Policy',
    },
  },
  features: {
    signIn: {
      button: 'Connect to %{address}',
      confirmModal: {
        title: 'Confirm your address',
        beforeAddressDescription: 'You’re signing in with the following address:',
        afterAddressDescription: 'To verify your ownership of this address, we\'ll ask you to sign a confirmation message. Click the Confirm button to continue. If this isn’t the address you’d like to connect to C2FC 0xchanger, click Cancel and select a different address from the wallet menu.',
        buttons: {
          cancel: 'Cancel',
          confirm: 'Confirm',
        },
      },
    },
    signTransaction: {
      title: 'Sign transaction',
      description: 'Scan this QR code with your mobile device to continue transaction',
      openApp: 'Open application',
      copyLink: 'Copy link',
    },
  },
  documents: {},
  modules: {
    marketplace: {
      fundsMarketplace: 'Funds marketplace',
      YouAreInThisFund: 'You’re in this fond',
    },
  },
  services: {
    dataProvider: {
      showMoreButton: 'Show more',
    },
  },
};
