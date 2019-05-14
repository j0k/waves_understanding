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
				args:[{type:"string", value:"_user_"}, {type:"string", value:A[1]["pub"]}]
			},
			fee: 900000
		}
        const ttx = invokeScript(params, A[0]["seed"])
        await broadcast(ttx)
        await waitForTx(ttx.id)
    })


    it ('InvokeTx: addUserCallTest', async function(){
		const params = {
			dApp: A[0]["addr"],
			call: {
				function:"addUserCallTest",
				args:[{type:"string", value:"_TEST_"}, {type:"string", value:A[1]["pub"]}, {type:"string", value:"123"}]
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
				args:[{type:"string", value: A[3]["addr"]}, {type:"integer", value:10000000}, {type:"string", value:""}]
			},
            //senderPublicKey:A[1]["pub"],
			fee: 900000
		}
        const ttx = invokeScript(params, A[1]["seed"])
        await broadcast(ttx)
        await waitForTx(ttx.id)
    })

    // addCommonGate(mod:String, gateAddr:String)
    // gate - 3N519rLDvwZkXV8wsSzYKLtSN3cFMzeoy9v
    it ('InvokeTx: addCommonGate', async function(){
		const params = {
			dApp: A[0]["addr"],
			call: {
				function:"addCommonGate",
				args:[{type:"string", value: "_user_"}, {type:"string", value:A[3]["addr"]}]
			},
            senderPublicKey:A[0]["pub"],
			fee: 900000
		}
        const ttx = invokeScript(params, A[0]["seed"])
        await broadcast(ttx)
        await waitForTx(ttx.id)
    })

    it ('InvokeTx: storeOn', async function(){
		const params = {
			dApp: address(env.accounts[0]),
			call: {
				function:"setStoring",
				args:[{type:"string", value:"_owner_"}, {type:"string", value:"_storeOn_"}]
			},
			fee: 900000
		}

        const ttx = invokeScript(params, A[0]["seed"])
        await broadcast(ttx)
        await waitForTx(ttx.id)
    })

    it ('InvokeTx: _user_ gateOn', async function(){
		const params = {
			dApp: address(env.accounts[0]),
			call: {
				function:"setStoring",
				args:[{type:"string", value:"_user_"}, {type:"string", value:"_gateOn_"}]
			},
			fee: 900000
		}

        const ttx = invokeScript(params, A[0]["seed"])
        await broadcast(ttx)
        await waitForTx(ttx.id)
    })

    it ('DataTx: add pubKey acc5 to gate', async function(){
        const params = {
            data: [
                { key: "_user_" + A[4]["pub"], value: true }
            ],
            //senderPublicKey: 'by default derived from seed',
            //timestamp: Date.now(),
            fee: 500000
            }

        const ttx = data(params, A[3]["seed"])
        await broadcast(ttx)
        await waitForTx(ttx.id)
    })

    it ('InvokeTx: transfer from acc5', async function(){
		const params = {
			dApp: A[0]["addr"],
			call: {
				function:"transferCall",
				args:[{type:"string", value: A[3]["addr"]}, {type:"integer", value:5000000}, {type:"string", value:""}]
			},
            //senderPublicKey:A[1]["pub"],
			fee: 900000
		}
        const ttx = invokeScript(params, A[4]["seed"])
        await broadcast(ttx)
        await waitForTx(ttx.id)
    })

    it ('InvokeTx: dbg CheckOnCommonGateway', async function(){
		const params = {
			dApp: A[0]["addr"],
			call: {
				function:"dbgCheckOnCommonGateway",
				args:[{type:"string", value: "_user_"}]
			},
            //senderPublicKey:A[1]["pub"],
			fee: 900000
		}
        const ttx = invokeScript(params, A[4]["seed"])
        await broadcast(ttx)
        await waitForTx(ttx.id)
    })

    it ('InvokeTx: dbg dbgCheckAddrKey', async function(){
		const params = {
			dApp: A[0]["addr"],
			call: {
				function:"dbgCheckAddrKey",
				args:[{type:"string", value: "3N519rLDvwZkXV8wsSzYKLtSN3cFMzeoy9v"}, {type:"string", value:"_user_3ttURoVwrSZK2r1ZTXo8ThvGhH5xwwndBwP15sVQ16qd"}]
			},
            //senderPublicKey:A[1]["pub"],
			fee: 900000
		}
        const ttx = invokeScript(params, A[4]["seed"])
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
