

import { useHooks } from "@components/providers/web3"

export const useManageMusic = (...args) =>{
    
    const swrRes = useHooks(hooks => hooks.useManage)(...args)
    
    return {
        manageMusic : swrRes
    }
}