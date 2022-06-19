import { Button, Modal } from "@components/ui/common";
import { useState,useEffect } from "react";

const defaultOrder = {
    price: "",
    address: "",
    author:""
}

const _createFormState = (isDisabled = false, message = "") => ({isDisabled,message})

const createFormState = ({price,address,author}, hasAgreedTos) => {

    if(isNaN(price)){
        return _createFormState(true, "Price is not valid.")
    }else if(price == ""){
        return _createFormState(true, "Price is empty.")
    }
    else if(!address){
        return _createFormState(true)
    }else if(!author){
        return _createFormState(true, "Error Can't detect Author address.")
    }else if(!hasAgreedTos){
        return _createFormState(true, "You need to agree with accept Terms of Service.")
    }

    return _createFormState()
}



export default function MakeOffer({music , onClose, address, onSubmit}) {

    const [isOpen,setIsOpen] = useState(false)
    const [order,setOrder] = useState(defaultOrder)
    const [hasAgreedTos,setHasAgreedTos] = useState(false)
  

    useEffect(()=>{
        if(!!music){
            setIsOpen(true)
            setOrder({
                ...defaultOrder,
                address: address,
                author: music.AuthorAd
            })
        
        }
    },[music])

    const closeModal = () => {
        setIsOpen(false)
        setOrder(defaultOrder)
        setHasAgreedTos(false)
        onClose()
    }

    const formState = createFormState(order, hasAgreedTos)



    return (
        
        <Modal isOpen={isOpen}>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="mb-7 text-lg font-bold leading-6 text-gray-900" id="modal-title">
                  {music.title}
                </h3>
                <div className="mt-1 relative rounded-md">
                  <div className="mb-1">
                    <label className="mb-2 font-bold">Price</label> <span class="bg-yellow-100 text-yellow-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-900">{order.price} Eth</span>
                    <div className="text-xs text-gray-700 flex">
                   
                    </div>
                  </div>
                  <div>
        
    <input type="text" onChange={({target:{value}}) => {
        setOrder({
            ...order,
            price: value.trim()
        })
    }} name="price" id="small-input" class="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
</div>
                  
                  <br/>
                
                </div>
                <div className="mt-2 relative rounded-md">
                  <div className="mb-1">
                    <label className="mb-2 font-bold">Address</label>
                  </div>
                  {address}
                  <p className="text-xs text-gray-700 mt-1">
                  <br/>
                  <strong>TO</strong>
                  <br/>
                  <br/>
                  </p>
                </div>
                <div className="my-2 relative rounded-md">
                  <div className="mb-1">
                    <label className="mb-2 font-bold">Musician</label>
                  </div>
                  {order.author}
                </div>

                <br/><br/>
                <div className="text-xs text-gray-700 flex">
                  <label className="flex items-center mr-2">
                    <input
                      checked={hasAgreedTos}
                      onChange={({target:{checked}})=>{
                          setHasAgreedTos(checked)

                      }}
                      type="checkbox"
                      className="form-checkbox" />
                  </label>
                  <span>By checking this box, I agree to L-Music &apos;Terms of Service&apos;</span>
                </div>

                {
                    formState.message && 
                    <div className="p-4 my-3 text-red-700 bg-red-200 rounded-lg text-sm">
                        {formState.message}
                    
                    </div>
                }

              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex">
            {/* <Button
             disabled ={formState.isDisabled}
             onClick={()=>{
                onSubmit(order)
             }

             }
            >
              Submit
            </Button> */}
            <button type="button"disabled ={formState.isDisabled}
             onClick={()=>{
                onSubmit(order)
             }

             }
              class="text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 mr-2 mb-2">
  <svg class="w-4 h-4 mr-2 -ml-1 text-[#626890]" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="ethereum" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z"></path></svg>
  Pay with Ethereum
</button>
            {/* <Button
              onClick = {closeModal}
              variant="red">
              Cancel
            </Button> */}


            <button type="button" onClick = {closeModal} class="text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 mr-2 mb-2">
            
  Cancel
</button>
          </div>
        </div>
      </Modal>
    )
}