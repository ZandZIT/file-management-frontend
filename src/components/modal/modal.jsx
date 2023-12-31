import { Dialog, Transition } from '@headlessui/react'
import  { Fragment } from 'react'

import PropTypes from 'prop-types';
import { X } from 'lucide-react';


const Modal = ({
    isOpen,
    onClose,
    children
}) => {
  return (
    <>
        <Transition.Root
        as={Fragment}
        show={isOpen}>
            <Dialog 
            onClose={onClose}
            as="div"
            className="relative z-50">
                <Transition.Child
                    as={Fragment}
                    enter="transition-opacity ease-linear duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-linear duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div
                    className='bg-gray-500 opacity-75 fixed inset-0' />
                </Transition.Child>

                <div className="fixed inset-0">
                    <div className='
                    min-h-full
                    flex flex-col 
                    items-center 
                    justify-center'>
                        <Transition
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel
                            as='div'
                            className='
                            relative 
                            transform 
                            overflow-hidden 
                            rounded-lg 
                            bg-white 
                            px-4 
                            pb-4
                            pt-5 
                            text-left 
                            shadow-xl 
                            transition-all
                            w-full
                            sm:my-8 
                            sm:w-full 
                            sm:max-w-lg 
                            sm:p-6
                            '>
                                <div className=" w-full z-10">
                                    <div className='absolute right-5   '>
                                    
                                        <button
                                        onClick={onClose}
                                        type='button'
                                        className='
                                        rounded-md
                                        text-gray-400
                                        hover:text-gray-500
                                        focus:ring-2
                                        focus:ring-sky-500
                                        border-none
                                        focus:outline-none
                                        bg-white
                                        '>
                                            <X size={20}  />
                                        </button>
                                    
                                    </div>
                                    {children}
                                </div>
                                
                            </Dialog.Panel>
                        </Transition>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
        

    </>
  )
}

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose:  PropTypes.func.isRequired,
    children: PropTypes.element
}

export default Modal