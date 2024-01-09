
import  { useState } from 'react'
import Modal from './modal'
import PropTypes from 'prop-types';

import { useForm } from "react-hook-form"

import Input from '../inputs/input';
import Button from '../ui/button';
import { db } from '../../../firebase';
import { doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';

const UpdateFolderModal = ({
    childFolder,
    isOpen,
    onClose
}) => {

    const [isLoading, setIsLoading] = useState(false)
    const {register, handleSubmit, reset, formState:{errors}} = useForm({
        defaultValues:{
            name: childFolder.name,
        }
    })
      const onSubmit = async(data)=>{
        if( !childFolder) return null
        try{
            setIsLoading(true)
            
            // Update the document to the collection
            await updateDoc(doc(db, "folders", childFolder.id), {
                name: data?.name,
                createdAt: serverTimestamp()
            });

            toast.success("Folder updated")
            reset()
            
            onClose()            
        }catch (error) {
            console.error('Error creating user:', error);
            toast.error("Something went wrong");
        }finally{
            setIsLoading(false)
        }
      }
    
  return (
    <Modal 
    isOpen={isOpen} 
    onClose={onClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='space-y-8'>
                <div className='
                border-b pb-4 border-gray-900/10
                '>  
                    <h2 className='
                    font-semibold
                    text-gray-900
                    leading-7
                    '>
                        Add Folder
                    </h2>
                    <p className='
                    text-sm text-gray-500 mt-1 leading-6
                    '>
                        Create a new folder
                    </p>
                </div>
                <div className='
                mt-10
                space-y-4'>
                    <Input
                    id="name"
                    disabled={isLoading}
                    errors={errors}
                    label="Name"
                    required
                    register={register}
                    type={'name'}
                    />

                    <div className="mt-10">
                        <div className="
                        flex items-center justify-end
                        ">
                            <div className="flex items-center gap-x-2">
                                <Button 
                                onClick={onClose}
                                disable={isLoading}
                                type="button"
                                secondary
                                >
                                    <p>Cancel</p>
                                </Button>
                                <Button 
                                disable={isLoading}
                                type="submit"
                                >
                                    <p>Create</p>
                                </Button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </form>
    </Modal>
  )
}

UpdateFolderModal.propTypes = {
    childFolder: PropTypes.object,
    isOpen: PropTypes.bool,
    onClose: PropTypes.func
}

export default UpdateFolderModal