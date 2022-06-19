

import items from "./index.json"

export const getAllMusic = () => {
    return {
        data: items,
        musicMap: items.reduce((a,m,i)=>{
            a[m.id] = m
            a[m.id].index = i
            return a
        },{})

    }
}