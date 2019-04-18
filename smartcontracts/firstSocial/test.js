//
// dump test
// create test https://ide.wavesplatform.com/
//

const wid0Seed     = "liar blade feature warm crew bottom resist rule region parade unit share"
const wid1Seed     = "fork laptop organ hotel dune diet renew velvet source caution empty already"
const wid2Seed     = "alert solid almost unfold inmate library fresh rescue any behind thumb cannon"
const widThirdSeed = "miracle swarm battle brown embrace curious south print cheese deposit bridge catalog"

const wid0Addr = address(wid0Seed)
const wid0PubKey = publicKey(wid0Seed)

const wid1Addr = address(wid1Seed)
const wid1PubKey = publicKey(wid1Seed)

const wid2Addr = address(wid2Seed)
const wid2PubKey = publicKey(wid2Seed)

const widThirdAddr = address(widThirdSeed)
const widThirdPubKey = publicKey(widThirdSeed)

describe('Wallet test suite', () => {
    it('deploys dapp script', async function(){
        const ttx = setScript({ script: compile(file("scriptV1.ride")), fee:2000000}, wid0Seed)
        await broadcast(ttx)
        await waitForTx(ttx.id)
    })

    it ('InvokeTx: wid0 делегирует право тратить wid1', async function(){
		// dappAddress: address(env.accounts[1]), call:{function:"withdraw",args:[{type:"integer", value:100000000},{type:"string", value: address(env.accounts[0])}], payment:[]
		// func addUser(mod:String, pubKey:String) = add(pubKey, mod)
		const params = {
			dappAddress: wid0Addr,
			call: {
				function:"addUser",
				args:[{type:"string", value:"transfer_"}, {type:"string", value: wid1PubKey}]
			},
			fee: 900000
		}


        const ttx = invokeScript(params, wid0Seed)
        await broadcast(ttx)
        await waitForTx(ttx.id)
    })

	it ('InvokeTx: wid0 делегирует право владеть wid1', async function(){
		// dappAddress: address(env.accounts[1]), call:{function:"withdraw",args:[{type:"integer", value:100000000},{type:"string", value: address(env.accounts[0])}], payment:[]
		// func addUser(mod:String, pubKey:String) = add(pubKey, mod)
		const params = {
			dappAddress: wid0Addr,
			call: {
				function:"addUser",
				args:[{type:"string", value:"owner_"}, {type:"string", value: wid1PubKey}]
			},
			fee: 900000
		}


        const ttx = invokeScript(params, wid0Seed)
        await broadcast(ttx)
        await waitForTx(ttx.id)
    })

    // it ('DataTx: wid0 делегирует право тратить wid1', async function(){
    //     const params = {
    //         data: [
    //             { key: 'transfer_'+1, value: wid1PubKey }
    //         ],
    //         //senderPublicKey: 'by default derived from seed',
    //         //timestamp: Date.now(),
    //         fee: 500000
    //         }

    //     const ttx = data(params, wid0Seed)
    //     await broadcast(ttx)
    //     await waitForTx(ttx.id)
    // })

	it ('InvokeTx: wid0 делегирует право тратить wid2', async function(){
		// dappAddress: address(env.accounts[1]), call:{function:"withdraw",args:[{type:"integer", value:100000000},{type:"string", value: address(env.accounts[0])}], payment:[]
		// func addUser(mod:String, pubKey:String) = add(pubKey, mod)
		const params = {
			dappAddress: wid0Addr,
			call: {
				function:"addUser",
				args:[{type:"string", value:"transfer_"}, {type:"string", value: wid2PubKey}]
			},
			fee: 900000
		}


        const ttx = invokeScript(params, wid0Seed)
        await broadcast(ttx)
        await waitForTx(ttx.id)
    })

    it ('wid1 тратит деньги wid0 в пользу третье стороны', async function(){
        const params = {
            amount: 100000000,
            recipient: widThirdAddr,
            senderPublicKey: wid0PubKey,
            fee: 500000,
        }

		var ttx = transfer(params, wid1Seed)
		ttx2 = signTx(ttx, wid0Seed)
		await broadcast(ttx2)
        await waitForTx(ttx2.id)
    })

	it ('InvokeTx: wid1 тратит деньги wid0 в пользу третье стороны', async function(){
		const params = {
			dappAddress: wid0Addr,
			call: {
				function:"transfer",
				args:[{type:"string", value:widThirdAddr}, {type:"integer", value: 50000000}]
			},
			fee: 900000
		}

        const ttx = invokeScript(params, wid0Seed)
		//ttx2 = signTx(ttx, wid0Seed)
        await broadcast(ttx)
        await waitForTx(ttx.id)
    })


    it ('wid0 отнимает право тратить у wid1', async function(){
		// dappAddress: address(env.accounts[1]), call:{function:"withdraw",args:[{type:"integer", value:100000000},{type:"string", value: address(env.accounts[0])}], payment:[]
		// func addUser(mod:String, pubKey:String) = add(pubKey, mod)
		const params = {
			dappAddress: wid0Addr,
			call: {
				function:"remUser",
				args:[{type:"string", value:"transfer_"}, {type:"string", value: wid1PubKey}]
			},
			fee: 900000
		}


        const ttx = invokeScript(params, wid0Seed)
        await broadcast(ttx)
        await waitForTx(ttx.id)
    })

	it ('wid0 отнимает право владеть у wid1', async function(){
		// dappAddress: address(env.accounts[1]), call:{function:"withdraw",args:[{type:"integer", value:100000000},{type:"string", value: address(env.accounts[0])}], payment:[]
		// func addUser(mod:String, pubKey:String) = add(pubKey, mod)
		const params = {
			dappAddress: wid0Addr,
			call: {
				function:"remUser",
				args:[{type:"string", value:"owner_"}, {type:"string", value: wid1PubKey}]
			},
			fee: 900000
		}


        const ttx = invokeScript(params, wid0Seed)
        await broadcast(ttx)
        await waitForTx(ttx.id)
    })

    it ('wid0 делегирует право тратить wid2', async function(){      
		    true
    })

    it ('wid2 тратит деньги wid0 в пользу третьей стороны', async function(){
		    true
    })
})
