# Howto

## keep your balance > 0 WAVES to be able to transfer
get waves in TESTNET https://wavesexplorer.com/testnet/faucet

## workflow

deploy current ride file
```
deploy(compile(env.file()))
```

example of f calling from ride smartcontract script
```
broadcast(invokeScript({dappAddress: address(env.accounts[1]), call:{function:"addOwner",args:[{type:"string", value: "3N9rbxmRVKoUJbuR7R4Fj26wsxmQ1UUBHz1"}]}, payment: []}))

- env.accounts[1] // check
- args.value
```

transfer 1 wave from current active account
```
broadcast(transfer({recipient:address(env.accounts[2]), amount:100000000, fee:500000}))
```

withdraw 2 waves from account
```
broadcast(invokeScript({dappAddress: address(env.accounts[1]), call:{function:"withdraw",args:[{type:"integer", value:100000000},{type:"string", value: address(env.accounts[0])}], payment:[]}))
```

## links
1. https://docs.wavesplatform.com/en/waves-api-and-sdk/waves-node-rest-api/example-transactions.html
2. video https://www.youtube.com/watch?v=k7gK7FgUFiU
3. ride v1 https://habr.com/ru/post/447790/
4. ride v2 https://habr.com/ru/post/447808/
5. https://docs.wavesplatform.com/en/smart-contracts/video-tutorials-and-articles.html
6. https://ide.wavesplatform.com/
7. https://github.com/j0k/waves_understanding/blob/master/smartcontracts/addRemWithdraw.ride
8. https://docs.wavesplatform.com/en/smart-contracts/ride-language/creating-and-deploying-a-script-manually.html
9. https://cdn.rawgit.com/wavesplatform/waves-documentation/master/en/doc.html#SetAssetScriptTransaction
10. https://docs.wavesplatform.com/en/smart-contracts/ride-language/standard-library.html#SetScriptTransaction
11. https://documenter.getpostman.com/view/2733299/waves-full-node/RVnWiKZJ
12. https://nodes.wavesplatform.com/api-docs/index.html#!/addresses/scriptInfo_1
13. https://github.com/AlekseiPupyshev/RIDE4DAPPS-MVPS/blob/master/the0dao.scala
14. https://testnet.ide.wavesplatform.com/
15. https://silkmind.com/wallet2console/
16. https://wavesexplorer.com/testnet/address/3MrJcvDviHvAXJrEEi45Gpj88VgduRVem8V
17. also you can use devnet instead of testnet in case you have discussed it with waves
