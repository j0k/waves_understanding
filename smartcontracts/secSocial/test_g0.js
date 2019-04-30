//
// dump test
// create test https://ide.wavesplatform.com/
//

const wid0Seed     = env.accounts[0]
const wid1Seed     = env.accounts[1]
const wid2Seed     = env.accounts[2]
const widThirdSeed = env.accounts[3]
const widGuideSeed = env.accounts[4]

const wid0Addr = address(wid0Seed)
const wid0PubKey = publicKey(wid0Seed)

const wid1Addr = address(wid1Seed)
const wid1PubKey = publicKey(wid1Seed)

const wid2Addr = address(wid2Seed)
const wid2PubKey = publicKey(wid2Seed)

const widThirdAddr = address(widThirdSeed)
const widThirdPubKey = publicKey(widThirdSeed)

const widGuideAddr = address(widGuideSeed)
const widGuidePubKey = publicKey(widGuideSeed)


describe('Wallet test suite', () => {
    it('deploys dapp script', async function(){
        const ttx = setScript({ script: compile(file("contract.ride")), fee:2000000}, wid1Seed)
        await broadcast(ttx)
        await waitForTx(ttx.id)
    })

    it ('wid1 переводит средства test acc', async function(){
        const params = {
            amount: 100000000,
            recipient: widGuideAddr,
            senderPublicKey: wid1PubKey,
            fee: 500000,
        }

		var ttx = transfer(params, wid1Seed)
		ttx2 = signTx(ttx, wid0Seed)
		await broadcast(ttx)
        await waitForTx(ttx.id)
    })

    it ('DataTx: test data tx', async function(){
        const params = {
            data: [
                { key: 'transfer_'+1, value: wid1PubKey }
            ],
            fee: 500000
            }

        const ttx = data(params, wid0Seed)
        await broadcast(ttx)
        await waitForTx(ttx.id)
    })

    it ('DataTx: set acc1 pubkey to Guide as an OK addr', async function(){
        const params = {
            data: [
                { key: wid1PubKey, value: 1 }
            ],
            fee: 500000
            }

        const ttx = data(params, widGuideSeed)
        await broadcast(ttx)
        await waitForTx(ttx.id)
    })

})
