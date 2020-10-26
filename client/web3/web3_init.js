import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';

import { CRYPTO_AVATARS_ABI_ROPSTEN, CONTRACT_ADDRESS_ROPSTEN } from './abi/contractABIropsten.js'
import { CRYPTO_AVATARS_ABI_MAINNET, CONTRACT_ADDRESS_MAINNET } from './abi/contractABImainnet.js'
import { CRYPTO_AVATARS_ABI_MATIC, CONTRACT_ADDRESS_MATIC } from './abi/contractABImatic.js'

var Web3 = require('web3');

web3 = null;
web3Status = new ReactiveVar({ init: false, provided: false, network: 'Unknown', networkId: -1, address: undefined });
contract = null;

//Change the eth network
function changeNet(netId) {
  let web3Stat = web3Status.get();
  switch (netId) {
      case 1:
          web3Stat.network = 'Ethereum main net';
          contract = new web3.eth.Contract(CRYPTO_AVATARS_ABI_MAINNET, CONTRACT_ADDRESS_MAINNET);
          break;
      case 2:
          web3Stat.network = 'Morden';
          break;
      case 3:
          web3Stat.network = 'Ropsten';
          contract = new web3.eth.Contract(CRYPTO_AVATARS_ABI_ROPSTEN, CONTRACT_ADDRESS_ROPSTEN);
          break;
      case 4:
          web3Stat.network = 'Rinkeby';
          break;
      case 5:
          web3Stat.network = 'Goerli';
          break;
      case 42:
          web3Stat.network = 'Kovan';
          break;
      case 137:
          web3Stat.network = 'Matic';
          contract = new web3.eth.Contract(CRYPTO_AVATARS_ABI_MATIC, CONTRACT_ADDRESS_MATIC);
          break;
      case 80001:
          web3Stat.network = 'Mumbai';
          break;
      default:
          web3Stat.network = 'Unknown';
  }
  web3Stat.networkId = netId;
  web3Status.set(web3Stat);
}

//Connect metamask wallet
connectwallet = function() {
  ethereum.request({ method: 'eth_requestAccounts' });
}

//Account connected or changed
ethereum.on('accountsChanged', function (accounts) {
  if (accounts && accounts[0] && web3.eth.defaultAccount != accounts[0]) {
      web3.eth.defaultAccount = accounts[0];
  }
  if (web3Status.get().address != accounts[0]) {
    let aux = web3Status.get()
    aux.address = accounts[0]
    web3Status.set(aux)
  }

});

//ETH network changed
ethereum.on('chainChanged', (chainId) => {
  changeNet(parseInt(chainId.substring(2)))
});


Meteor.startup(() => {
    //web3 load on start
    window.addEventListener('load', () => {
        let web3Stat = web3Status.get();
        //Load web3 with metamask provider
        if (typeof window.ethereum !== 'undefined') {
            web3 = new Web3(window.ethereum);
            web3Stat.provided = true
            web3Stat.init = true;
            web3Status.set(web3Stat);
            //Get initial network
            web3.eth.net.getId(function(err, netId) {
              if (err) {
                console.log(err);
              }
              else{
                changeNet(netId)
              }
            })
        }
        //No metamask provider, you can use other providers if you want
        else {
            console.log("Metamask install needed");
            web3Stat.init = false;
            web3Status.set(web3Stat);
        }

    });
});
