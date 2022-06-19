
import { useEffect } from "react"
import useSWR from "swr"

const adminAddresses = {
    "0xde3CDFC07dF3CF350a333AD84170d0818a8038DF":true,
    "0x6e8c0C3E598ba1C22016198C45b1114d46Aa2857":true
}

export const handler = (web3,provider) => () => {

    // const[account,setAccount]  = useState(null)

    const { data , mutate, ...rest} = useSWR(()=>
        web3 ? "web3/accounts" : null,
        async () => {

            const accounts = await web3.eth.getAccounts()
            return accounts[0]
        }
    )

    useEffect(() => {
        provider &&
        window.ethereum.on("accountsChanged",
         accounts => mutate(accounts[0] ?? null)
        )
    },[provider])


    return{
        account:{
            data,
            isAdmin: (data && adminAddresses[data]) ?? false,  
            mutate,...rest
        }
    }
}