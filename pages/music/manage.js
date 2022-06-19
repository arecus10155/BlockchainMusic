import { BaseLayout } from "@components/ui/layout"
import {Breadcrumbs, Button} from "@components/ui/common"
import { OwnedMusicCard } from "@components/ui/music"
import { useAccount } from "@components/hooks/web3/useAccount"
import { getAllMusic } from "@content/music/fetcher"
import { useManageMusic } from "@components/hooks/web3/useManageMusic"
import { useWeb3 } from "@components/providers"

export default function ManageMusic({music}){
    const {web3, contract} = useWeb3()
    const { account } = useAccount()
    const { manageMusic } = useManageMusic(music, account.data)

    async function acceptBuyerOffer(musicHash,buyerAddress,price) {
        

       const value = web3.utils.toWei(String(price))     
        try{
          await contract.methods.acceptOffer(
            musicHash,
            buyerAddress
          ).send({from:account.data, value})
    
        }catch{
    
          console.error("Accept offer failed")
    
        }
    
      }

      async function rejectBuyerOffer(musicHash,buyerAddress,price) {
        
        
        const value = web3.utils.toWei(String(price))     
         try{
           await contract.methods.rejectOffer(
             musicHash,
             buyerAddress
           ).send({from:account.data, value})
     
         }catch{
     
           console.error("Accept offer failed")
     
         }
     
       }

    return (
        <BaseLayout>
          
           <br/><br/>
           <Breadcrumbs/>
           <br/><br/>
       
          
{
    

    manageMusic.data?.map(music1=>
<div key={music1.id} className="bg-white border shadow overflow-hidden sm:rounded-lg mb-3">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {music1.title1}{music1.title}
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
          {music1.price} ETH
          </p>
        </div>
  
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Music ID
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {music1.id}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Proof
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {music1.proof}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Owned Address
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {music1.owned}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Status
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {music1.state}
              </dd>
            </div>
            <div>
              {(music1.state == "pending") ?

              <div className="pb-5 pt-5">
            <button type="button" onClick={() => acceptBuyerOffer(music1.proof,music1.owned,music1.price)} class="ml-11  text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Accept</button>
            <button type="button" onClick={() => rejectBuyerOffer(music1.proof,music1.owned,music1.price)} class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Reject</button> 
            </div >
            :
               <div></div>
              }
           
            </div>
           
          </dl>
        </div>
      </div>


        )
}

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