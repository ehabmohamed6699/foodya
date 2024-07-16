import React from 'react'
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useEffect, useState } from 'react'
import { FaFacebook } from 'react-icons/fa'

const Modal = (props:any) => {
    

  
    function open() {
      props.setIsOpen(true)
    }
  
    function close() {
      props.setIsOpen(false)
    }
    
    return (
      <>
        <Button
          onClick={()=>{
              if(props.onClick){
                props.onClick()
              }
              open()
          }}
          className={props.buttonStyle}
        >
          {props.content}
        </Button>
  
        <Dialog open={props.isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close} __demoMode>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <DialogPanel
                transition
                className="w-full max-w-2xl flex flex-col items-center rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
              >
                {props.children}
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </>
    )
}

export default Modal