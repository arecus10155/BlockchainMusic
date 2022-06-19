import { normalizeOwnedMusic } from "@utils/normalize"
import useSWR from "swr"
import { useWeb3 } from "@components/providers"


export const handler = (web,contract) => (music, account) => {

    const { contract, web3 } = useWeb3()
    const swrRes = useSWR(()=>

        ( web3 && contract && account) ? `web3/useOwnedMu/${account}` : null,
        async ()=>{

            const ownedMusic = []

            

            for(let i=0; i < music.length; i++){
                const musicOwn = music[i]
            
            
               
                const hexMusicId = web3.utils.utf8ToHex(musicOwn.id)
      
                const musicHash = web3.utils.soliditySha3(
                    {type:"bytes16",value:hexMusicId},
                    {type:"address",value:account}
                )
                
                const ownMusic = await contract.methods.getMusicByHash(musicHash).call()
                
               console.log(ownMusic)

                if(ownMusic.owner !== "0x0000000000000000000000000000000000000000"){
                    const normalized = normalizeOwnedMusic(web3)(musicOwn,ownMusic)
                    ownedMusic.push(normalized)
                    
                    
                }
                


            }
            
            return ownedMusic
        }
    )


    return {
    
        ...swrRes,
        lookup: swrRes.data?.reduce((a,c)=>{
            a[c.id] = c
            return a
        },{}) ?? {}
    
    }
}