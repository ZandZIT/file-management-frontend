
import  { useState } from 'react'
import Modal from './modal'
import PropTypes from 'prop-types';

import { useForm } from "react-hook-form"

import Input from '../inputs/input';
import Button from '../ui/button';
import { auth, db } from '../../../firebase';
import { doc, setDoc } from 'firebase/firestore';
import Select from '../inputs/select';
import {  types } from '../../utils';
import toast from 'react-hot-toast';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const RegisterModal = ({
    isOpen,
    onClose
}) => {
    const [isLoading, setIsLoading] = useState(false)

    const {register, handleSubmit, setValue, watch, reset, formState:{errors}} = useForm({
        defaultValues:{
            email: "",
            password: "",
            type: types[1],
        }
    })
    // const image = watch('image')
    // const imageref = useRef(null)

    const userType = watch('type')
      const onSubmit = async(data)=>{
        try{
            setIsLoading(true)
            // Create a new user in Firebase Authentication
            await createUserWithEmailAndPassword(auth, data.email, data.password);
            // const user = userCredential.user;

            // Use the email as the document ID in the Firestore "users" collection
            const userRef = doc(db, 'users', data.email);

            // Create a new document with user details
            await setDoc(userRef, {
            email: data?.email,
            username: data?.email?.split('@')[0],
            userType: data?.type.value,
            });
            toast.success("User created")
            reset()
            onClose()            
        }catch (error) {
            console.error('Error creating user:', error);
            toast.error("Something went wrong");
        }finally{
            setIsLoading(false)
        }
      }
    
    // const addImageToPost = (e) => {
    //     const reader = new FileReader();
    //     if(e.target.files[0]){
    //         reader.readAsDataURL(e.target.files[0])
    //     }
    
    //     reader.onload = (readerEvent) => {
    //         setValue('image', readerEvent.target.result, {
    //                 shouldValidate: true
    //         })
    //     }
    // }
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
                        Add member
                    </h2>
                    <p className='
                    text-sm text-gray-500 mt-1 leading-6
                    '>
                        Set user information
                    </p>
                </div>
                <div className='
                mt-10
                space-y-4'>
                    <Input
                    id="email"
                    disabled={isLoading}
                    errors={errors}
                    label="Email"
                    required
                    register={register}
                    type={'email'}
                    />
                    <Input
                    id="password"
                    disabled={isLoading}
                    errors={errors}
                    label="Password"
                    required
                    register={register}
                    type={'password'}
                    />
                    
                    <Select
                    disabled={isLoading}
                    label={"Select user types"}
                    value={userType}
                    options={types}
                    required
                    onChange={(type)=> { setValue('type', type)}}
                    />
                        

                    {/* <div className="space-y-2">
                        <label className="text-sm font-medium leading-6 block">
                            Photo
                        </label>
                        <div className="flex items-center gap-x-4">
                            <img
                            className="rounded-full h-10 w-10"
                            src={image ? image : "/user-placeholder.png"}
                            alt='image'
                            /> 
                            <input type="file" hidden ref={imageref} onChange={addImageToPost} />
                            <Button 
                            onClick={()=> imageref.current.click()} 
                            disable={isLoading}
                            type="button"
                            secondary
                            >
                                Change
                            </Button>
                            
                        </div>
                    </div> */}

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

RegisterModal.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func
}

export default RegisterModal