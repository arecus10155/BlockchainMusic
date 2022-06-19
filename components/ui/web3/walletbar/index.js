



export default function WalletBar({address}){
    return(
      <section className="text-white">
      {/* <div className="p-8">
        <h1 className="text-2xl">Hello, {address}</h1>
        <h2 className="subtitle mb-5 text-xl">I hope you are having a great day!</h2>
      
      </div> */}


      <div class="p-6 max-w-3xl bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Hello, {address}</h5>
    </a>
    
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">L-music is a brand-new streaming platform built for all musicians</p>
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">I hope you are having a great day!</p>

</div>
    </section>
    )
}