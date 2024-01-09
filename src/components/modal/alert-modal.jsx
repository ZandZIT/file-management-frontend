
import  { useState } from 'react'
import Modal from './modal'
import PropTypes from 'prop-types';

import { useForm } from "react-hook-form"

import Button from '../ui/button';
import { db } from '../../../firebase';
import { deleteDoc, doc } from 'firebase/firestore';
import toast from 'react-hot-toast';

const AlertModal = ({
    data,
    isOpen,
    onClose
}) => {
    const [isLoading, setIsLoading] = useState(false)
    const { handleSubmit} = useForm()
      
    const onSubmit = async()=>{
        if(!data) return null
        try{
            setIsLoading(true)
            await deleteDoc(doc(db, "folders", data.id));
            toast.success("Folder deleted")
            onClose()            
        }catch (error) {
            console.error('Error creating ', error);
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
                        Delete Folder
                    </h2>
                    <p className='
                    text-sm text-gray-500 mt-1 leading-6
                    '>
                        Are you sure?
                    </p>
                </div>
                <div className='
                mt-10
                space-y-4'>
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
                                danger
                                >
                                    <p>Continue</p>
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

AlertModal.propTypes = {
    data: PropTypes.object,
    isOpen: PropTypes.bool,
    onClose: PropTypes.func
}

export default AlertModal