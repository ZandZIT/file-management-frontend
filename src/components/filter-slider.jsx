
import {Fragment} from 'react'

import { X } from 'lucide-react'
import {Dialog, Transition} from '@headlessui/react'
import PropTypes from 'prop-types'
import Filter from './filter'
import { filter } from '../utils'

const FilterSlider = ({
    isOpen,
    onClose
}) => {
  
  
  return (
    <>
        <Transition.Root
        as={Fragment}
        show={isOpen}>
            <Dialog
            className="relative z-50"
            onClose={onClose}
            as="div">
                {/* Background overlay */}
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
                    className='
                    fixed 
                    inset-0
                    bg-black 
                    opacity-40'/>
                </Transition.Child>

                {/* <div className='
                fixed 
                inset-0
                overflow-hidden
                '> */}
                    <Transition.Child
                        as={Fragment}
                        enter="transition ease-in-out duration-300 transform"
                        enterFrom="translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="translate-x-0"
                        leaveTo="translate-x-full"
                    >
                        <div className='
                        w-full max-w-xs fixed inset-y-0 right-0  bg-white
                        '>
                            <Dialog.Panel
                            className="
                            ">
                                <div className='
                                flex 
                                flex-col 
                                min-h-full 
                                py-6 
                                '>
                                    <div className="sm:px-6 px-4">
                                        <div className='flex items-center justify-end'>
                                        
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
                                            '>
                                                <X size={20} />
                                            </button>
                                        
                                        </div>
                                        <div className='flex flex-col '>
                                            <Filter 
                                            data={filter}
                                            valueKey='type' />
                                        </div>
                                        

                                    </div>

                                </div>

                            </Dialog.Panel>

                        </div>
                    </Transition.Child>  
                    

                {/* </div> */}
            </Dialog>
        </Transition.Root> 
    </>
  )
}

FilterSlider.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func
}
export default FilterSlider