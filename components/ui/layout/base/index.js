
import { Web3Provider } from "@components/providers"
import { Navbar, Footer } from "@components/ui/common"
export default function BaseLayout({children}) {

    return (
        <>
 

        <div className="max-w-7xl mx-auto px-4">
          <Navbar />
          <div className="fit">
            {children}
          </div>
        </div>
        {/*------ FOOTER STARTS ------*/}
        <Footer />
        {/*------ FOOTER ENDS ------*/}
     
    </>
    )

}