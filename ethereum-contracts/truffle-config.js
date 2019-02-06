/*
 * NB: since truffle-hdwallet-provider 0.0.5 you must wrap HDWallet providers in a 
 * function when declaring them. Failure to do so will cause commands to hang. ex:
 * ```
 * mainnet: {
 *     provider: function() { 
 *       return new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/<infura-key>') 
 *     },
 *     network_id: '1',
 *     gas: 4500000,
 *     gasPrice: 10000000000,
 *   },
 */

const HDWalletProvider = require("truffle-hdwallet-provider");
require('dotenv').config()  // Stores environment-specific variable from '.env' to process.env


module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  	compilers: {
		solc: {
	  	version: "0.5.2"  // Change this to whatever you need
		}
  	},
	networks: {
		development: {
			host: "127.0.0.1",
        	port: 8545,
        	network_id: "*"
		},
		
		kovan: {
	      provider: function () {
                 
	          return new HDWalletProvider(process.env.METAMASK_MNEMONIC, "https://kovan.infura.io/v3/" + process.env.INFURA_API_KEY)
	      },
	      network_id: 42,
	      gas: 7000000
	    },
	    mainnet: {
	      provider: function () {
	          return new HDWalletProvider(process.env.METAMASK_MNEMONIC, "https://mainnet.infura.io/v3/" + process.env.INFURA_API_KEY)
	      },
	      network_id: 1,
	      gas: 6000000,
	      gasPrice: 30000000000
	    }
	},
	mocha: {
	   reporter: 'eth-gas-reporter',
	   reporterOptions: {
	     gasPrice: 21
	   }
	},
};


