
import  { useState } from 'react'
import Modal from './modal'
import PropTypes from 'prop-types';

import FileUpload from '../ui/file-upload';
import Loading from '../ui/loading';

const NewFileModal = ({
    currentFolder,
    user,
    isOpen,
    onClose
}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [count, setCount] = useState(0)
    // const {register, handleSubmit, reset, formState:{errors}} = useForm({
    //     defaultValues:{
    //         file: [],
    //     }
    // })
    //   const onSubmit = async(data)=>{
    //     if(!currentFolder) return null
    //     try{
    //         setIsLoading(true)
    //         const path = [...currentFolder.path]
    //         if(currentFolder !== ROOT_FOLDER){
    //             path.push({name: currentFolder.name, id: currentFolder.id})
    //         }
    //         // Create a new folder in the firestores
    //         // Add the document to the collection
    //         await addDoc(collections.folders, {
    //             name: data?.name,
    //             parentId: currentFolder?.id,
    //             userId: user?.uid,
    //             path,
    //             createdAt: serverTimestamp()
    //         });

    //         toast.success("Folder created")
    //         reset()
    //         onClose()            
    //     }catch (error) {
    //         console.error('Error creating user:', error);
    //         toast.error("Something went wrong");
    //     }finally{
    //         setIsLoading(false)
    //     }
    //   }
    
  return (
    <Modal 
    isOpen={isOpen} 
    onClose={onClose}>
        
            <div className='space-y-8 h-[360px] flex flex-col'>
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
                <div className='space-y-4 pb-10 flex-1 items-center justify-center flex'>
                    
                        { isLoading && count ? 
                        <div>
                            <Loading /> 
                            <div className='text-gray-700/70 font-medium text-center tracking-widest text-xs mt-2'>Uploading {count} files</div>
                        </div>
                        : <FileUpload  
                            currentFolder={currentFolder} 
                            user={user} 
                            setCount={setCount}
                            setIsLoading={setIsLoading} />
                        }

                </div>
            </div>
    </Modal>
  )
}

NewFileModal.propTypes = {
    currentFolder: PropTypes.object,
    user: PropTypes.object,
    isOpen: PropTypes.bool,
    onClose: PropTypes.func
}

export default NewFileModal