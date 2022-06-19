

import { MusicCard } from "@components/ui/music"


export default function List({music,children}){
    return(
        <section className="grid grid-cols-2 gap-4 mb-5">
              {music.map(music =>children(music))}
            </section>
    )
}