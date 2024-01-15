import PropTypes from 'prop-types'
import { X } from 'lucide-react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import DocViewer, { DocViewerRenderers } from 'react-doc-viewer';

const FilePreviewModal = ({
    isOpen,
    onClose,
    file,
}) => {
    const documents = [{ uri: file.downloadURL, fileType: file?.type }];
  return (
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
                    h-screen
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
                            h-full                                                       
                            text-left 
                            shadow-xl 
                            transition-all
                            w-full
                            sm:w-full 
                            
                            '>
                                <div className=" w-full h-full z-[9999]">
                                    <div className='absolute right-3 top-5  '>
                                    
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
                                            <X size={24}  />
                                        </button>
                                    
                                    </div>
                                    <div className='h-screen max-w-7xl flex items-center justify-center mx-auto'>
                                    <DocViewer
                                      pluginRenderers={DocViewerRenderers}
                                      className='w-full h-full '
                                      config={{
                                        header: {
                                         disableHeader: true,
                                         disableFileName: false,
                                         retainURLParams: false
                                      }}}
                                      theme={{
                                        primary: "#5296d8",
                                        secondary: "#ffffff",
                                        tertiary: "#5296d899",
                                        text_primary: "#ffffff",
                                        text_secondary: "#5296d8",
                                        text_tertiary: "#00000099",
                                        disableThemeScrollbar: false,
                                      }}
                                      documents={documents} />
                                      
                                    </div> 
                                </div>
                                
                            </Dialog.Panel>
                        </Transition>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>

  )
}

FilePreviewModal.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    file: PropTypes.object,
}

export default FilePreviewModal