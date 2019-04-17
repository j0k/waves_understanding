{-# STDLIB_VERSION 3 #-}
{-# CONTENT_TYPE DAPP #-}
{-# SCRIPT_TYPE ACCOUNT #-}



let accCreator = this.bytes.toBase58String()
# let accPub     = publicKey(this)

# map [pk]        -> index
func keyInDB(key:String) = {
    match getInteger(this, key){
        case a:Int => a>0
        case _     => false
    }
}

func strInDB(key:String) = {
    match getString(this, key){
        case a:String => a!=""
        case _     => false
    }
}

func strInDBVal(key:String, val:String) = {
    match getString(this, key){
        case a:String => a == val
        case _     => false
    }
}

func add(pubkey:String) = {
    if !strInDB("1") then WriteSet([DataEntry("1", pubkey)])
    else if !strInDB("2") then WriteSet([DataEntry("2", pubkey)])
    else if !strInDB("3") then WriteSet([DataEntry("3", pubkey)])
    else if !strInDB("4") then WriteSet([DataEntry("4", pubkey)])
    else if !strInDB("5") then WriteSet([DataEntry("5", pubkey)])
    else if !strInDB("6") then WriteSet([DataEntry("6", pubkey)])
    else if !strInDB("7") then WriteSet([DataEntry("7", pubkey)])
    else throw("Can't add more then 7 pubkeys")
}

func rem(pubkey:String) = {
    if strInDBVal("1", pubkey) then WriteSet([DataEntry("1", "")])
    else if strInDBVal("2", pubkey) then WriteSet([DataEntry("2", "")])
    else if strInDBVal("3", pubkey) then WriteSet([DataEntry("3", "")])
    else if strInDBVal("4", pubkey) then WriteSet([DataEntry("4", "")])
    else if strInDBVal("5", pubkey) then WriteSet([DataEntry("5", "")])
    else if strInDBVal("6", pubkey) then WriteSet([DataEntry("6", "")])
    else if strInDBVal("7", pubkey) then WriteSet([DataEntry("7", "")])
    else throw("Can't add more then 7 pubkeys")
}

func signedBy(tx:TransferTransaction, key:String) = {
    if strInDB(key) then (
        let pubKey = getString(this, key)
        let signed = match pubKey {
            case a: String => sigVerify(tx.bodyBytes, tx.proofs[0], a.toBytes())
            case _ => false
        }
        signed
    ) else false
}

func checkSignature(tx:TransferTransaction) = {
    signedBy(tx, "1") || signedBy(tx, "2") || signedBy(tx, "3") || signedBy(tx, "4") || signedBy(tx, "5") || signedBy(tx, "6") || signedBy(tx, "7")
}


func inDB(addr:String, mod:String) = {
    match getInteger(this, mod+addr){
        case a:Int => a>0
        case _     => false
    }
}

func addU3(callerA:Address, mod:String, addr:String) = {
    let caller = callerA.bytes.toBase58String()

    if (inDB(caller, mod) || caller == accCreator)
    then (
        let data = DataEntry(mod+addr, 1)
        WriteSet([data])
    )
    else throw("Can't do that.")
}


@Callable(i)
func addU(mod:String, addr:String) = addU3(i.caller, mod,addr)

@Verifier(tx)
func verify() = {

    let creator       = this.bytes.toBase58String()
    let callerAddr = tx.sender.bytes.toBase58String()
    let callerPub  = tx.senderPublicKey

    # let owner0Pub = base58'D3UfSPqNwqLcVehemqb1yTku8gMFDrZgFGXVgjz8nDeG'
    # let owner0Pub = base58'BL2PoAH3sGvKbtqHRfodYLXR3Gw1qBsU4dcksDHJgbec'

    # let owner0Signed  = if(sigVerify(tx.bodyBytes, tx.proofs[0], owner0Pub  )) then 1 else 0
    # let caller0Signed  = if(sigVerify(tx.bodyBytes, tx.proofs[0], callerPub  )) then 1 else 0

    match(tx) {
        case transferTx: TransferTransaction =>
            checkSignature(transferTx)
        case scriptTx: SetScriptTransaction =>
            callerAddr == accCreator
        case dataTx: DataTransaction =>
            callerAddr == accCreator

        case _ => false
    }
}

############################################
{
  [[PromiseStatus]]:  resolved
  [[PromiseValue]]: {
    chainId:84
    fee:1400000
    feeAssetId:null
    id:C8p7L1ajRUwyUDHuWkoAbzWazZAkbyfWAPia9ZN199F6
    proofs:(1)
    script: base64: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
    sender: 3N3ZAMMu3FembCeGzKNcbC57QcyFUPQURdT
    senderPublicKey: 3ZZvmFbqQb8KzonGnzB5mQVKJpfdtvXLBZyoWdTSFy4n
    timestamp: 1555522150934
    type: 13
    version: 1
    }
}
