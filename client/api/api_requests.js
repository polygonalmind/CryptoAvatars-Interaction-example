import { CONTRACT_ADDRESS_MAINNET } from '../web3/abi/contractABImainnet.js'
const CRYPTOAVATARS_API_URL = "https://cryptoavatars.io/api/rest"
//const CRYPTOAVATARS_API_URL = "http://localhost:3000/rest";

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4)
        {
          if (xmlHttp.status == 200) {
            callback(null, JSON.parse(xmlHttp.responseText));
          }
          else {
            callback(JSON.parse(xmlHttp.responseText), null);
          }
        }

    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
};

getTokenMetadataFromCryptoavatarsAPI = function(tokenId) {
  httpGetAsync(CRYPTOAVATARS_API_URL+"/opensea/token/"+tokenId, function(error, result){
    if (error) {
      console.log(error);
    }
    if (result) {
      console.log(result);
      response.set(result)
    }
  })
};
getTokenOwnerFromCryptoavatarsAPI = function(tokenId) {
  httpGetAsync(CRYPTOAVATARS_API_URL+"/token_owner/"+tokenId, function(error, result){
    if (error) {
      console.log(error);
    }
    if (result) {
      console.log(result);
      response.set(result)
    }
  })
};
getCreatedByFromCryptoavatarsAPI = function(address) {
  httpGetAsync(CRYPTOAVATARS_API_URL+"/createdBy/"+address, function(error, result){
    if (error) {
      console.log(error);
    }
    if (result) {
      console.log(result);
      response.set(result)
    }
  })
};
getOwnedByFromCryptoavatarsAPI = function(address) {
  httpGetAsync(CRYPTOAVATARS_API_URL+"/ownedBy/"+address, function(error, result){
    if (error) {
      console.log(error);
    }
    if (result) {
      console.log(result);
      response.set(result)
    }
  })
};

getTokenMetadataFromOpenseaAPI = function(tokenId) {
  httpGetAsync("https://api.opensea.io/api/v1/asset/"+CONTRACT_ADDRESS_MAINNET+"/"+tokenId+"/", function(error, result){
    if (error) {
      console.log(error);
    }
    if (result) {
      console.log(result);
      response.set(result)
    }
  })
};

getTokensFromOpenseaAPI = function(token_ids = [], owner=null, offset=0, limit=20) {
  let query = "https://api.opensea.io/api/v1/assets?asset_contract_address="+CONTRACT_ADDRESS_MAINNET+"&order_direction=desc&offset="+offset+"&limit="+limit

  for (var i = 0; i < token_ids.length; i++) {
    query += "&token_ids="+token_ids[i]
  }
  if (owner) {
      query += "&owner="+owner
  }
  httpGetAsync(query, function(error, result){
    if (error) {
      console.log(error);
    }
    if (result) {
      console.log(result);
      response.set(result)
    }
  })
};
