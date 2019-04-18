{-# STDLIB_VERSION 3 #-}
{-# CONTENT_TYPE DAPP #-}
{-# SCRIPT_TYPE ACCOUNT #-}


#
# it's not scala language it's RIDE language but git doesn't colorize code in
# .ride format. so this
#

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
    let contractCreator = this.bytes.toBase58String()
    let caller = callerA.bytes.toBase58String()

    if (inDB(caller, mod) || caller == contractCreator)
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
    let creator    = this.bytes.toBase58String()
    

    match(tx) {
        case transferTx: TransferTransaction =>
            checkSignature(transferTx)
        case scriptTx: SetScriptTransaction =>
            callerAddr == creator
        case dataTx: DataTransaction =>
            callerAddr == creator

        case _ => false
    }
}
