{-# STDLIB_VERSION 3 #-}
{-# CONTENT_TYPE DAPP #-}
{-# SCRIPT_TYPE ACCOUNT #-}

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

func add(pubkey:String, mod:String) = {
    if !strInDB(mod+"1") then WriteSet([DataEntry(mod+"1", pubkey)])
    else if !strInDB(mod+"2") then WriteSet([DataEntry(mod+"2", pubkey)])
    else if !strInDB(mod+"3") then WriteSet([DataEntry(mod+"3", pubkey)])
    else if !strInDB(mod+"4") then WriteSet([DataEntry(mod+"4", pubkey)])
    else if !strInDB(mod+"5") then WriteSet([DataEntry(mod+"5", pubkey)])
    else if !strInDB(mod+"6") then WriteSet([DataEntry(mod+"6", pubkey)])
    else if !strInDB(mod+"7") then WriteSet([DataEntry(mod+"7", pubkey)])
    else throw("Can't add more then 7 pubkeys under modifier:"+mod)
}

func rem(pubkey:String, mod:String) = {
    if strInDBVal(mod+"1", pubkey) then WriteSet([DataEntry(mod+"1", "")])
    else if strInDBVal(mod+"2", pubkey) then WriteSet([DataEntry(mod+"2", "")])
    else if strInDBVal(mod+"3", pubkey) then WriteSet([DataEntry(mod+"3", "")])
    else if strInDBVal(mod+"4", pubkey) then WriteSet([DataEntry(mod+"4", "")])
    else if strInDBVal(mod+"5", pubkey) then WriteSet([DataEntry(mod+"5", "")])
    else if strInDBVal(mod+"6", pubkey) then WriteSet([DataEntry(mod+"6", "")])
    else if strInDBVal(mod+"7", pubkey) then WriteSet([DataEntry(mod+"7", "")])
    else throw("Can't add more then 7 pubkeys under modifier:"+mod)
}

func signedBy(tx:Transaction, key:String) = {
    if strInDB(key) then (
        let pubKey = getString(this, key)
        let signed = match pubKey {
            case a: String => sigVerify(tx.bodyBytes, tx.proofs[0], a.toBytes())
            case _ => false
        }
        signed
    ) else false
}

# checkSignature(tx, "owner_")
func checkSignature(tx:Transaction, mod:String) = {
    signedBy(tx, mod+"1") || signedBy(tx, mod+"2") || signedBy(tx, mod+"3") ||
    signedBy(tx, mod+"4") || signedBy(tx, mod+"5") || signedBy(tx, mod+"6") || signedBy(tx, mod+"7")
}


@Callable(i)
func addUser(mod:String, pubKey:String) = add(pubKey, mod)

@Callable(i)
func remUser(mod:String, pubKey:String) = rem(pubKey, mod)

@Verifier(tx)
func verify() = {
    let creatorAddr = this.bytes.toBase58String()
    let txAddr      = tx.sender.bytes.toBase58String()
    let txPubKey    = tx.senderPublicKey.toBase58String()

    #tx.senderPublicKey
    match(tx) {
        case transferTx: TransferTransaction =>
            txAddr == creatorAddr || checkSignature(transferTx, "transfer_") || checkSignature(transferTx, "owner_")
        case scriptTx: SetScriptTransaction =>
            txAddr == creatorAddr || checkSignature(scriptTx, "owner_")
        case dataTx: DataTransaction =>
            txAddr == creatorAddr || checkSignature(dataTx,   "owner_")
        case invokeTx: InvokeScriptTransaction =>
            txAddr == creatorAddr || checkSignature(invokeTx, "owner_")

        case _ => false
    }
}
