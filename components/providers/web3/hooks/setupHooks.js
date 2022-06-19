import { handler as createUseAccount } from "./useAccount";
import { handler as createOwnedMusicHook } from "./useOwnedMusic";
import { handler as createManageHook } from "./useManageMusic";

export const setupHooks = (web3={}, provider={}, contract={}) => {

    return {
        useAccount: createUseAccount(web3,provider),
        useOwnedMu: createOwnedMusicHook(web3,contract),
        useManage: createManageHook(web3,contract)
    }
    
}