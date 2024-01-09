
import  { useState } from 'react'
import Modal from './modal'
import PropTypes from 'prop-types';

import { useForm } from "react-hook-form"

import Input from '../inputs/input';
import Button from '../ui/button';
import { db } from '../../../firebase';
import { doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';

const UpdateNameModal = ({
    isFile,
    data,
    isOpen,
    onClose
}) => {

    const [isLoading, setIsLoading] = useState(false)
    const {register, handleSubmit, reset, formState:{errors}} = useForm({
        defaultValues:{
            name: data.name,
        }
    })
      const onSubmit = async(value)=>{
        if( !value) return null
        try{
            setIsLoading(true)
            
            // Update the document to the collection
            await updateDoc(doc(db, isFile ? "files" : "folders", data.id), {
                name: value?.name,
                createdAt: serverTimestamp()
            });

            toast.success("Updated")
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
                        Update {isFile ? "File" : "Folder"} 
                    </h2>
                    <p className='
                    text-sm text-gray-500 mt-1 leading-6
                    '>
                        Set a new name for this {isFile ? "file" : "folder"} 
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
                                    <p>Save</p>
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

UpdateNameModal.propTypes = {
    data: PropTypes.object,
    isFile: PropTypes.bool,
    isOpen: PropTypes.bool,
    onClose: PropTypes.func
}

export default UpdateNameModal