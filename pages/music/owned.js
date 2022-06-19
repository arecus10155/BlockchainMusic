import { BaseLayout } from "@components/ui/layout"
import {Breadcrumbs, Button} from "@components/ui/common"
import { OwnedMusicCard } from "@components/ui/music"
import { useOwnedMusic } from "@components/hooks/web3/useOwnedMusic"
import { useAccount } from "@components/hooks/web3/useAccount"
import { getAllMusic } from "@content/music/fetcher"

export default function OwnedMusic({music}){
    const { account } = useAccount()
    const { ownedMusic } = useOwnedMusic(music, account.data)


    return (
        <BaseLayout>
          
           <br/><br/>
           <Breadcrumbs/>
           <br/><br/>
          
          
{
    

    ownedMusic.data?.map(music1=>
        <OwnedMusicCard key={music1.id} music={music1}>



        </OwnedMusicCard>


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