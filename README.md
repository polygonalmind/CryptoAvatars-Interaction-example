# Cryptoavatars connection example
This is an example client project based in meteor, for show how to obtain Cryptoavatars tokens metadata and .vrm assets.
## Table of Contents

* [Cryptoavatars server API](#cryptoavatars-server-api)
  * [Get token metadata](#get-token-metadata)
  * [Get owner of a token](#get-owner-of-a-token)
  * [Get tokens created by address](#get-tokens-created-by-address)
  * [Get tokens owned by address](#get-tokens-owned-by-address)
* [Opensea API](#opensea-api)
* [Blockchain direct interaction](#blockchain-direct-interaction)
  * [Metamask connect & inicialice web3](#metamask-connect-&-inicialice-web3)
  * [Cryptoavatars contract](#cryptoavatars-contract)
  
## Cryptoavatars server API

### Get token metadata
Returns the token metadata in a format compatible with opensea, use :_network if you want to search for a token in a eth network other than the mainnet.
```JS
https://cryptoavatars.io/api/rest/opensea/token/:_tokenId
https://cryptoavatars.io/api/rest/opensea/token/:_tokenId/:_network
```
Parameters:
```JS
_tokenId: Integer
_network: Integer
```
Response format:
```JS
Token metadata format:
{
    name: String,
    description: String,
    tags: [String],
    image: String,          //URL of the thumbnail image
    asset: String,          //URL of the avatar model in .vrm format
    createdAt: Date,        //Date of the avatar creation
    createdBy: String,      //ETH address of the creator of this avatar
    external_url: String    //URL of the item page in https://cryptoavatars.io/
}
```
Example: https://cryptoavatars.io/api/rest/opensea/token/0

### Get owner of a token
Returns the eth address of the owner of a token
```JS
https://cryptoavatars.io/api/rest/token_owner/:_tokenId
```
Parameters:
```JS
_tokenId: Integer
```
Example: https://cryptoavatars.io/api/rest/token_owner/0
### Get tokens created by address
Returns an array of tokenIds created by an address
```JS
https://cryptoavatars.io/api/rest/createdBy/:_address
```
Parameters:
```JS
_address: String
```
Example: https://cryptoavatars.io/api/rest/createdBy/0x08E0A6D5f2212a7071e1aC9D49C20A1078FA63eC
### Get tokens owned by address
Returns an array of tokenIds owned by an address
```JS
https://cryptoavatars.io/api/rest/ownedBy/:_address
```
Parameters:
```JS
_address: String
```
Example: https://cryptoavatars.io/api/rest/ownedBy/0x08E0A6D5f2212a7071e1aC9D49C20A1078FA63eC

## Opensea API
Opensea has a very usefull  API for getting data from the blockchain and opensea sales. Visit https://docs.opensea.io/reference for API docs.

## Blockchain direct interaction

Instead rely in a centraliced server API you want to interact directly with the blockchain.

### Metamask connect & inicialice web3
Metamask is a web explorer extension you can use as a eth provider and as an easy way to connect and verify an eth user address.
```
Warning: The user must have metamask instaled in their web broser, install metamask from https://metamask.io/
```
You can find a working example of a metamask & web3 integration in this project [web3_init.js](https://github.com/polygonalmind/CryptoAvatars-Interaction-example/blob/master/client/web3/web3_init.js)
or follow the metamask docs https://docs.metamask.io/guide/ and the web3 docs https://web3js.readthedocs.io

Note: This example project works with web3js@1.2.9 there will be several changes with the latest versions of web3js, https://web3js.readthedocs.io/en/v1.2.9/

Here is a simple example if you are using web3js@1.2.9, for a more complete one take a look at the [web3](https://github.com/polygonalmind/CryptoAvatars-Interaction-example/blob/master/client/web3) folder in project.
```JS
window.addEventListener('load', () => {
    if (typeof window.ethereum !== 'undefined') {
        //Load web3 with metamask provider
        web3 = new Web3(window.ethereum)
        //Load the contract
        contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
        //Call contract public functions
        contract.methods.tokenURI(0).call({}, function(error, result){
            if (error) { console.log(error) }
            else { console.log(result) }
        })
    }
    //No metamask provider, you can use other providers if you want
    else { console.log("Metamask install needed") }

});
```
To connect to the Cryptoavatar contract you'll need it's address and ABI
[Cryptoavatars ABIs files](https://github.com/polygonalmind/CryptoAvatars-Interaction-example/blob/master/client/web3/abi)

### Cryptoavatars contract
Once you have successfully setup web3 you can call the contract's public functions, you can find a complete list and the complete solidity code of the contract in https://etherscan.io/address/0x996b5Bf6908BEBB348417C8854b26f7cCfc1bbbA#readContract
```JS
//Returns the URI for a given tokenId
function tokenURI(uint256 tokenId) external view returns (string memory)
```
```JS
//Returns the creator of the tokenId
function creatorOf(uint256 tokenId) public view returns (address)
```
```JS
//Returns the owner of the tokenId
function ownerOf(uint256 tokenId) public view returns (address owner);
```
```JS
//Gets the tokenId at a given index of the tokens list of the requested owner.
function tokenOfOwnerByIndex(address owner, uint256 index) public view returns (uint256)
```
```JS
//Gets the tokenId at a given index of all the tokens in this contract
function tokenByIndex(uint256 index) public view returns (uint256)
```
```JS
//Gets the balance of the specified address.
function balanceOf(address owner) public view returns (uint256)
```
```JS
//Returns if an address has minter permissions
function isMinter(address account) public view returns (bool)
```
