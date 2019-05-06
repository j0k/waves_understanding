
A = []
for (var i in env.accounts){
    seed = env.accounts[i]
    A.push(
        {
            "seed" : seed,
            "addr" : address(seed),
            "pub"  : publicKey(seed)
            }
        );
}

console.log(A)


describe('Wallet test suite', () => {
    it('deploys dapp script', async function(){
        const ttx = setScript({ script: compile(file("social.ride")), fee:2000000}, A[0]["seed"])
        await broadcast(ttx)
        await waitForTx(ttx.id)
    })

    it ('InvokeTx: initOwnership', async function(){
		const params = {
			dappAddress: A[0]["addr"],
			call: {
				function:"initOwnership",
				args:[]
			},
			fee: 900000
		}


        const ttx = invokeScript(params, A[0]["seed"])
        await broadcast(ttx)
        await waitForTx(ttx.id)
    })

})
