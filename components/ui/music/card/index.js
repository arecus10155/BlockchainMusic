

import Link from "next/link"

import { useOwnedMusic } from "@components/hooks/web3/useOwnedMusic"
import { useAccount } from "@components/hooks/web3/useAccount"
import { getAllMusic } from "@content/music/fetcher"

export default function Card({music,disabled,Footer,Audio}){

  
    return(
      
                <div key={music.id} className="bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                  <div className="md:flex">
                    <div className="md:flex-shrink-0 pt-6">
                      <img className={`h-48 w-full object-cover ${disabled && "filter grayscale"} md:w-48`} 
                      src={music.coverImage}
                      alt={music.title} />
                    </div>
                    <div className="p-8">
                      <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                       {music.type}</div>
                     
                    
                      <div  className="block mt-1 text-lg leading-tight font-medium text-black">
                        {music.title}
                        </div>
                   
                     <p className="mt-2 text-black">
                     <span class="bg-yellow-100 text-yellow-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-900">{music.price} ETH</span>
                    
                      &nbsp;&nbsp;
                      <span class="bg-indigo-100 text-indigo-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-200 dark:text-indigo-900"><strong>By</strong>   {music.author}  </span>
                       
                      
                        </p>
                        <br/>

                        {
                    Audio &&
                    <Audio/>
                  }

                  <br/>

                  {
                    Footer &&
                    <Footer/>
                  }

                    </div>
                  </div>
                </div>
           
    )
  
    
    
    
    
}



export function getStaticProps(){
  const {data} = getAllMusic()
  return{
      props: {
        music2 : data
      }
  }
}