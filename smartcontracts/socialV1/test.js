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
			dApp: A[0]["addr"],
			call: {
				function:"initOwnership",
				args:[{type:"string", value:"transfer_"}]
			},
			fee: 900000
		}
        const ttx = invokeScript(params, A[0]["seed"])
        await broadcast(ttx)
        await waitForTx(ttx.id)
    })

    it ('InvokeTx: addTransfer', async function(){
		const params = {
			dApp: A[0]["addr"],
			call: {
				function:"addUserCall",
				args:[{type:"string", value:"_transfer_"}, {type:"string", value:A[1]["pub"]}]
			},
			fee: 900000
		}
        const ttx = invokeScript(params, A[0]["seed"])
        await broadcast(ttx)
        await waitForTx(ttx.id)
    })


    it ('InvokeTx: transfer()', async function(){
		const params = {
			dApp: A[0]["addr"],
			call: {
				function:"transferCall",
				args:[{type:"string", value: A[3]["addr"]}, {type:"integer", value:10000000}]
			},
            //senderPublicKey:A[1]["pub"],
			fee: 900000
		}
        const ttx = invokeScript(params, A[1]["seed"])
        await broadcast(ttx)
        await waitForTx(ttx.id)
    })

    it ('InvokeTx: incNum', async function(){

		const params = {
			dApp: address(env.accounts[0]),
			call: {
				function:"incNum",
				args:[]
			},

			fee: 900000
		}


        const ttx = invokeScript(params, A[0]["seed"])
        await broadcast(ttx)
        await waitForTx(ttx.id)
    })

})
