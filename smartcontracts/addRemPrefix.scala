{-# STDLIB_VERSION 3 #-}
{-# CONTENT_TYPE DAPP #-}
{-# SCRIPT_TYPE ACCOUNT #-}

#
# it's not scala language it's RIDE language but git doesn't colorize code in
# .ride format. so this
#

let prefixOwner = "_owner_"
let prefixUser  = "_user_"

#
# we will use it in test phase
#
let accAddr    = this.bytes.toBase58String()

func fModStr(mod:String, str: String) =  mod+str

func fWithMod(mod: String, addr: String) = {
    match getInteger(this, fModStr(mod, addr)) {
        case a:Int => a>0
        case _     => false
    }
}

func addPrefixUser(prefix: String, addr: String, addrCaller:String) = {
    let callerWithMod = fWithMod(prefix, addrCaller)
    let addrWithMod   = fWithMod(prefix, addr)

    if ((accAddr == addrCaller) || (callerWithMod))
    then (
        if (addrWithMod) then throw("Already have that modifier: "+prefix)
            else WriteSet([DataEntry(fModStr(prefix, addr), 1)])
    ) else throw("You don't have privileges to add:"+prefix)
}

# if there is no user with such addr - function will fill that key-value property with 0
# [*] how to replace addrCaller with @argv i
func removePrefixUser(prefix:String, addr: String, addrCaller:String) = {
    let withMod    = fWithMod(prefix, addr)

    if ((accAddr == addrCaller) || fWithMod(prefix, addrCaller)) then
        ( WriteSet([DataEntry(fModStr(prefix, addr), 0)]) ) else
    throw("You don't have privileges to remove:"+prefix)
}

@Callable(i)
func addOwner(addr: String)    = addPrefixUser(prefixOwner, addr, toBase58String(i.caller.bytes))

@Callable(i)
func removeOwner(addr: String) = removePrefixUser(prefixOwner, addr, toBase58String(i.caller.bytes))

@Callable(i)
func addUser(addr: String)     = addPrefixUser(prefixUser, addr, toBase58String(i.caller.bytes))

@Callable(i)
func removeUser(addr: String) = removePrefixUser(prefixUser, addr, toBase58String(i.caller.bytes))


@Verifier(txx)
func verify() = {
    true
}
