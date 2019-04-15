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
