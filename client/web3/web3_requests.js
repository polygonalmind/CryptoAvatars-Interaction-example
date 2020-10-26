
import './web3_init.js'

getTokenOwnerWithWeb3 = function(tokenId) {
  contract.methods.ownerOf(tokenId).call({from: web3Status.get().address}, function(error, result){
    if (error) {
      console.log(error);
    }
    response.set(result)
    console.log(result);
  })
}

getTokenCreatorWithWeb3 = function(tokenId) {
  contract.methods.creatorOf(tokenId).call({from: web3Status.get().address}, function(error, result){
    if (error) {
      console.log(error);
    }
    response.set(result)
    console.log(result);
  })
}

getTokenMetadataWithWeb3 = function(tokenId) {
  contract.methods.tokenURI(tokenId).call({from: web3Status.get().address}, function(error, result){
    if (error) {
      console.log(error);
    }
    response.set(result)
    console.log(result);
  })
}
