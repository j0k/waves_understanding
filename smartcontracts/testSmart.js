// 
// dump test
// create test https://ide.wavesplatform.com/
//

const wid0Seed   = "cherry horror forget flip banana veteran miss party stick ice tone garlic"
const wid1Seed   = "junior width barrel minor double gloom mercy august wolf ring pottery lottery"
const wid2Seed   = "zebra brass father net echo adjust certain carbon tissue yellow antenna whisper"
const newAccSeed = "initial mutual north guilt coral muscle hub vacant hen champion message army"

const wid0Addr = address(wid0Seed)
const wid0PubKey = publicKey(wid0Seed)

const wid1Addr = address(wid1Seed)
const wid1PubKey = publicKey(wid1Seed)

const wid2Addr = address(wid2Seed)
const wid2PubKey = publicKey(wid2Seed)

const newAccAddr = address(newAccSeed)
const newAccPubKey = publicKey(newAccSeed)

describe('Wallet test suite', () => {
    it('deploys dapp script', async function(){
        const ttx = setScript({ script: compile(file("smartAcc.ride")), fee:2000000}, wid0Seed)
        await broadcast(ttx)
        await waitForTx(ttx.id)
    })

    it('deploys dapp script from right newAcc', async function(){
        const ttx = setScript({
            script: compile(file("smartAcc.ride")),
            //senderPublicKey:wid0PubKey,
            fee:2000000}, wid0Seed)
        await broadcast(ttx)
        await waitForTx(ttx.id)
    })

    it ('wid0 делегирует право тратить wid1', async function(){
        const params = {
            data: [
                { key: '_fin_'+wid1Addr, value: 1 }
            ],
            //senderPublicKey: 'by default derived from seed',
            //timestamp: Date.now(),
            fee: 500000
            }

        const ttx = data(params, wid0Seed)
        await broadcast(ttx)
        await waitForTx(ttx.id)
    })

    it ('wid0 делегирует право тратить wid2', async function(){
        const params = {
            data: [
                { key: '_fin_'+wid2Addr, value: 1 }
            ],
            //senderPublicKey: 'by default derived from seed',
            //timestamp: Date.now(),
            fee: 500000
            }

        const ttx = data(params, wid0Seed)
        await broadcast(ttx)
        await waitForTx(ttx.id)
    })

    it ('wid1 тратит деньги wid0 в пользу третье стороны', async function(){
        const params = {
            amount: 100000000,
            recipient: newAccAddr,
            //feeAssetId: undefined
            //assetId: undefined
            //attachment: undefined
            senderPublicKey: wid0PubKey,
            //timestamp: Date.now(),
            fee: 100000,
        }
    })

    it ('wid0 отнимает право тратить у wid1', async function(){

    })

    it ('wid0 делегирует право тратить wid3', async function(){

    })

    it ('wid2 тратит деньги wid0 в пользу третьей стороны', async function(){

    })
})
