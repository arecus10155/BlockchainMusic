import { normalizeOwnedMusic } from "@utils/normalize"
import useSWR from "swr"
import { useWeb3 } from "@components/providers"


export const handler = (web,contra) => (music, account) => {

    const { contract, web3 } = useWeb3()
    const  swrRes = useSWR(()=>

        ( web3 && contract && account) ? `web3/useMu/${account}` : null,
        async ()=>{

            const ownedMusic = []
            const totalMusic = 0
            try{
                totalMusic = await contract.methods.getMusicCount().call()
          
              }catch{
          
                console.error("Cannot get totalMusic")
          
              }

            for(let i=0; i < totalMusic; i++){
                const musicOwn = ""
                
               
                try{
                   
                    const manageMusicHash = await contract.methods.getMusicAtIndex(i).call()
                    const manageMusic =  await contract.methods.getMusicByHash(manageMusicHash).call()
                    
                    


                    if(manageMusic.author == account){


                        for(let j=0; j < music.length; j++){
                           
                            if(manageMusic.musicID == music[j].id){
                                musicOwn = music[j]
                            }
                            
                        }
                        console.log(musicOwn)
                        const normalized = normalizeOwnedMusic(web3)(musicOwn,manageMusic)
                        ownedMusic.push(normalized)
                    
                    }


                }catch{
              
                  console.error("Cannot get manageMusic")
              
                }
            }
            
            return ownedMusic
        }
    )


    return {
    
        ...swrRes
    
    }
}