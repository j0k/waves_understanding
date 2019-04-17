{-# STDLIB_VERSION 3 #-}
{-# CONTENT_TYPE DAPP #-}
{-# SCRIPT_TYPE ACCOUNT #-}

let accCreator = this.bytes.toBase58String()
func pref(pr:String, s:String) = pr+s

func inDB(addr:String, mod:String) = {
    match getInteger(this, mod+addr){
        case a:Int => a>0
        case _     => false
    }
}



@Callable(i)
func addU(mod:String, addr:String) = {
    let caller = i.caller.bytes.toBase58String()

    if (inDB(caller, mod) || caller == accCreator)
    then (
        let data = DataEntry(mod+addr, 1)
        WriteSet([data])
    )
    else throw("Can't do that.")
}

@Callable(i)
func remU(mod:String, addr:String) = {
    let caller = i.caller.bytes.toBase58String()

    if (inDB(caller, mod) || caller == accCreator)
    then (
        let data = DataEntry(mod+addr, 0)
        WriteSet([data])
    )
    else throw("Can't do that.")
}




# on the next step we can create DB of our own modifiers

@Callable(i)
func sendWaves(amount: Int, toAddr: String) = {
    let caller = toBase58String(i.caller.bytes)

    if (amount < 0)
        then throw("Can't withdraw negative amount")
    else (
        if (inDB(caller, "_finance_") || caller == accCreator)  then
            TransferSet([ScriptTransfer(addressFromString(toAddr).value(), amount, unit)])

        else throw("You don't have privileges to make transfers.")
    )
}


# @Verifier(txx)
# func verify() = {
#     true
# }
