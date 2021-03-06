{-# STDLIB_VERSION 3 #-}
{-# CONTENT_TYPE DAPP #-}
{-# SCRIPT_TYPE ACCOUNT #-}

#
# it's not scala language it's RIDE language but git doesn't colorize code in
# .ride format. so this
#

let prefixOwner = "_" + "owner"
let accAddr    = this.bytes.toBase58String()

func fOwnStr(str: String) =  str + prefixOwner

func fIsOwner(addr: String) = {
    match getInteger(this, fOwnStr(addr)){
        case a:Int => a>0
        case _     => false
    }
}

@Callable(i)
func addOwner(addr: String) = {

    let addrCaller = toBase58String(i.caller.bytes)

    let callerIsOwner = fIsOwner(addrCaller)
    let addrInOwners  = fIsOwner(addr)

    if ((accAddr == addrCaller) || (callerIsOwner))
    then (
        if (addrInOwners) then throw("Already is owner")
            else WriteSet([DataEntry(fOwnStr(addr), 1)])
    ) else throw("You don't have privileges to add.")
}

@Callable(i)
func removeOwner(addr: String) = {
    let isOwner = fIsOwner(addr)
    let addrCaller = toBase58String(i.caller.bytes)

    if ((accAddr == addrCaller) || fIsOwner(addrCaller)) then
        ( WriteSet([DataEntry(fOwnStr(addr), 0)]) ) else
    throw("You don't have privileges to remove.")
}

@Verifier(txx)
func verify() = {
    true
}
