

import { BaseLayout } from "@components/ui/layout"
import { MusicCard, MusicList } from "@components/ui/music"
import { getAllMusic } from "@content/music/fetcher"
import { WalletBar } from "@components/ui/web3"
import { useAccount } from "@components/hooks/web3/useAccount"
import {Breadcrumbs, Button} from "@components/ui/common"
import { OrderModal,MakeOffer } from "@components/ui/order"
import { useState } from "react"
import { useWeb3 } from "@components/providers"
import { useOwnedMusic } from "@components/hooks/web3/useOwnedMusic"


export default function Home({music}) { 

  const {web3, contract} = useWeb3()
  const [selectedMusic, setSelectedMusic] = useState(null);
  const [selectedMusic2, setSelectedMusic2] = useState(null);
  const {account} = useAccount()
  const { ownedMusic } = useOwnedMusic(music, account.data)

  const canPurchaseMusic = !!(account.data)
  
  const purchaseMusic =  async order => {
    const hexMusicID = web3.utils.utf8ToHex(selectedMusic.id)
  
    //hexMusicID = 0x31343130343734000000000000000000

    //address = 0xC7097D83c01Cf6F250324ebdA9E1D518E3fd5A51

    // 31343130343734000000000000000000C7097D83c01Cf6F250324ebdA9E1D518E3fd5A51

    //f12b152277f85f53f8cd6c5af78e98e55f049727a987b45c394e932113cb49c8

    const orderHash = web3.utils.soliditySha3(
      { type: "bytes16", value:hexMusicID},
      { type: "address", value:account.data}
    )

    const value = web3.utils.toWei(String(order.price))


    try{
      await contract.methods.purchaseMusic(
        hexMusicID,
        selectedMusic.id,
        orderHash,
        order.author,
        order.author
      ).send({from:account.data, value})

    }catch{

      console.error("Purchase failed")

    }

  }

  const purchaseMusic2 =  async order => {
    const hexMusicID = web3.utils.utf8ToHex(selectedMusic2.id)
  
    //hexMusicID = 0x31343130343734000000000000000000

    //address = 0xC7097D83c01Cf6F250324ebdA9E1D518E3fd5A51

    // 31343130343734000000000000000000C7097D83c01Cf6F250324ebdA9E1D518E3fd5A51

    //f12b152277f85f53f8cd6c5af78e98e55f049727a987b45c394e932113cb49c8

    const orderHash = web3.utils.soliditySha3(
      { type: "bytes16", value:hexMusicID},
      { type: "address", value:account.data}
    )

    const value = web3.utils.toWei(String(order.price))


    try{
      await contract.methods.makeOffer(
        hexMusicID,
        selectedMusic2.id,
        orderHash,
        order.author,
        order.author
      ).send({from:account.data, value})

    }catch{

      console.error("Purchase failed")

    }

  }

  return (
    <BaseLayout>
            
           <div className="py-4 rounded-md">
           <WalletBar address={account.data}/>
           </div>

           <br/><br/>
           <Breadcrumbs/>
           <br/><br/>
          
            <MusicList 
            music={music} 
            >
            {

            (music)=>
                
                
                <MusicCard
                              
                music={music}
                key={music.id}
                disabled={!canPurchaseMusic}
                Audio={()=>{

                 
                  const owned = ownedMusic.lookup[music.id]
                 

                  if(owned){  
                    if(Object.values(owned)[15]=="pending"){
                      return (
                      <audio controls id='player2'>
                      <source  src={music.link2} type="audio/mp3" />
                      Your browser does not support the audio element.
                      </audio>
                      )
                    }else if(Object.values(owned)[15]=="rejected"){
                      return (
                        <audio controls id='player2'>
                        <source  src={music.link2} type="audio/mp3" />
                        Your browser does not support the audio element.
                        </audio>
                        )
                    }
                    else{
                    return (
                      <audio controls id='player2'>
                      <source  src={music.link} type="audio/mp3" />
                      Your browser does not support the audio element.
                      </audio>
                    )
                    }
                  }else{

                  return(
                    <audio controls id='player2'>
                    <source  src={music.link2} type="audio/mp3" />
                    Your browser does not support the audio element.
                </audio>
                  )
                  }
                }
                } 
                Footer={()=>{

                  const owned = ownedMusic.lookup[music.id]

                  
                   
                  
                  if(!canPurchaseMusic){
                      return(<button type="button" disabled={true} class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Please Connect MetaMask</button>)
                  }
                  else if(owned){
                    console.log(Object.values(owned))
                    
                    if(Object.values(owned)[15]=="pending"){
                    return (
                      // <span class="bg-yellow-100 text-yellow-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-900">Owned</span> 
                      <button type="button" disabled={true} class="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Pending...</button>
                    )
                    }else if(Object.values(owned)[15]=="rejected"){
                      return(
                        <div>
                     <button onClick={()=> setSelectedMusic(music)}
                    invisible={!canPurchaseMusic} type="button" class="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Purchase</button>

                    <button onClick={()=> setSelectedMusic2(music)}
                    invisible={!canPurchaseMusic} type="button" class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Make Offer</button>
                    {/* <Button onClick={()=> setSelectedMusic(music)}
                    invisible={!canPurchaseMusic}
                    >
                      Purchase
                    </Button> */}
                  </div>
                      )

                    }
                    else{
                      return (
                        // <span class="bg-yellow-100 text-yellow-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-900">Owned</span> 
                        <button type="button" disabled={true} class="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Owned</button>
                      )
                    }
                  }else{

                  return(
                  <div>
                     <button onClick={()=> setSelectedMusic(music)}
                    invisible={!canPurchaseMusic} type="button" class="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Purchase</button>

<button onClick={()=> setSelectedMusic2(music)}
                    invisible={!canPurchaseMusic} type="button" class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Make Offer</button>
                    {/* <Button onClick={()=> setSelectedMusic(music)}
                    invisible={!canPurchaseMusic}
                    >
                      Purchase
                    </Button> */}
                  </div>
                  )
                  }
                }
                } 
                />

          
          }
          </MusicList>

            { selectedMusic &&
            <OrderModal 
            music={selectedMusic}
            onSubmit={purchaseMusic}
            onClose={()=> setSelectedMusic(null)} 
            address={account.data}
            />

            }

{ selectedMusic2 &&
            <MakeOffer 
            music={selectedMusic2}
            onSubmit={purchaseMusic2}
            onClose={()=> setSelectedMusic2(null)} 
            address={account.data}
            />

            }
        
        <br/><br/><br/><br/><br/><br/>
    </BaseLayout>
  )
}


export function getStaticProps(){
  const {data} = getAllMusic()
  return{
      props: {
        music : data
      }
  }
}