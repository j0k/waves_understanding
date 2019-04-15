{-# STDLIB_VERSION 3 #-}
{-# CONTENT_TYPE DAPP #-}
{-# SCRIPT_TYPE ACCOUNT #-}

#
# it's not scala language it's RIDE language but git doesn't colorize code in
# .ride format. so this
#

@Callable(i)
func addOwner(addrAddOwner: String) = {
    let myAddr = this.bytes.toBase58String()
    let addrCaller = toBase58String(i.caller.bytes)
    let addrCallerOwner = toBase58String(i.caller.bytes) + "_owner"
    let keyQueryOwner = addrAddOwner + "_owner"

    let callerIsOwner = match getInteger(this, addrCallerOwner){
        case a:Int => 1
        case _ => 0
    }

    let ownerAlreadyExist = match getInteger(this, keyQueryOwner){
        case a:Int => 1
        case _ => 0
    }

    if ((myAddr == addrCaller) || (callerIsOwner==1) || (ownerAlreadyExist==1)) then (
        WriteSet([DataEntry(keyQueryOwner, 1)])
    ) else throw("Nothing to do")
}

@Verifier(txx)
func verify() = {
    true
}
