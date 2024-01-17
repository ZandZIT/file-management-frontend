
import  { useState } from 'react'
import Modal from './modal'
import PropTypes from 'prop-types';

import FileUpload from '../ui/file-upload';
import Loading from '../ui/loading';
import Button from '../ui/button';
import DateSelect from '../ui/date-picker';

const NewFileModal = ({
    currentFolder,
    isOpen,
    onClose
}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [count, setCount] = useState(0)
    const [state, setState] = useState(1);
    const [startDate, setStartDate] = useState(new Date())

  return (
    <Modal 
    isOpen={isOpen} 
    onClose={onClose}>
        <div className='space-y-8 h-[420px] flex flex-col'>
            <div className='
            border-b pb-4 border-gray-900/10
            '>  
                <h2 className='
                font-semibold
                text-gray-900
                leading-7
                '>
                    Add File
                </h2>
                <p className='
                text-sm text-gray-500 mt-1 leading-6
                '>
                    Upload a new file
                </p>
            </div>
            {state === 1 && 
            <div className='h-full flex flex-col transition-all ease-in-out justify-between'>
                <DateSelect 
                startDate={startDate}
                setStartDate={setStartDate}
                />
                <div className='ml-auto'>
                    <Button 
                    onClick={()=> setState(state + 1)}
                    type={'button'}
                    >
                        <div>Next</div>
                    </Button>
                </div>
            </div>}
            {state === 2 && 
            (<div className='space-y-4 flex-1 items-center justify-center flex flex-col '>
                
                    { isLoading && count ? 
                    <div>
                        <Loading /> 
                        <div className='text-gray-700/70 font-medium text-center tracking-widest text-xs mt-2'>Uploading {count} files</div>
                    </div>
                    : 
                    (<>
                        <FileUpload  
                        expiredDate={startDate}
                        currentFolder={currentFolder} 
                        setCount={setCount}
                        setState={setState}
                        onClose={onClose}
                        setIsLoading={setIsLoading} />
                        <div className='mr-auto'>
                            <Button 
                            secondary
                            onClick={()=> setState(state - 1)}
                            type={'button'}
                            >
                                <div>Back</div>
                            </Button>
                        </div>
                    </>)
                    
                    }

            </div>)}
        </div>
    </Modal>
  )
}

NewFileModal.propTypes = {
    currentFolder: PropTypes.object,
    isOpen: PropTypes.bool,
    onClose: PropTypes.func
}

export default NewFileModal