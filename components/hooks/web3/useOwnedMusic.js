

import { useHooks } from "@components/providers/web3"

export const useOwnedMusic = (...args) =>{
    
    const swrRes = useHooks(hooks => hooks.useOwnedMu)(...args)
    
    return {
        ownedMusic : swrRes
    }
}