import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './api/api_requests.js'
import './web3/web3_requests.js'
import './main.html';

response = new ReactiveVar(null)


Template.requestCryptoavatarsApi.events({
  'click #getTokenMetadataWithAPI'(event, instance) {
    const id = parseInt(document.getElementById('tokenId').value);
    getTokenMetadataFromCryptoavatarsAPI(id)
  },
  'click #getTokenOwnerWithAPI'(event, instance) {
    const id = parseInt(document.getElementById('tokenId').value);
    getTokenOwnerFromCryptoavatarsAPI(id)
  },
  'click #getCreatedByWithAPI'(event, instance) {
    const address = document.getElementById('address').value;
    getCreatedByFromCryptoavatarsAPI(address)
  },
  'click #getOwnedByWithAPI'(event, instance) {
    const address = document.getElementById('address').value;
    getOwnedByFromCryptoavatarsAPI(address)
  },
});

Template.requestBlockchain.helpers({
  web3Status: function() {
    return web3Status.get()
  },
});

Template.response.helpers({
  response: function() {
    return JSON.stringify(response.get(), null, 2)
  }
});

Template.requestBlockchain.events({
  'click #connectwallet'(event, instance) {
    try {
      connectwallet()
    } catch (e) {
      console.log(e);
    } finally {
    }
  },
  'click #getTokenMetadataWithETH'(event, instance) {
    const id = parseInt(document.getElementById('tokenId').value);
    getTokenMetadataWithWeb3(id)
  },
  'click #getTokenOwnerWithETH'(event, instance) {
    const id = parseInt(document.getElementById('tokenId').value);
    getTokenOwnerWithWeb3(id)
  },
  'click #getTokenCreatorWithETH'(event, instance) {
    const id = parseInt(document.getElementById('tokenId').value);
    getTokenCreatorWithWeb3(id)
  },
});


Template.requestOpenseaApi.events({
  'click #getTokenMetadataWithOpensea'(event, instance) {
    const id = parseInt(document.getElementById('tokenId').value);
    getTokenMetadataFromOpenseaAPI(id)
  },
  'click #getTokensFromOpenseaAPI'(event, instance) {
    const address = document.getElementById('address').value;
    getTokensFromOpenseaAPI([], address, 0, 20)
  },
});
