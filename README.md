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
