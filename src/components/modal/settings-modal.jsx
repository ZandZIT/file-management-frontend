
import  { useRef, useState } from 'react'
import Modal from './modal'

import { useForm } from "react-hook-form"
import Input from '../inputs/input'
import Button from '../ui/button'
import PropTypes from 'prop-types'
import { db, storage } from '../../../firebase'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import { doc, updateDoc } from 'firebase/firestore'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useCurrentUser } from '../../hooks/use-current-user'
import Select from '../inputs/select'
import { types } from '../../utils'

const SettingsModal = ({
    currentUser,
    isOpen,
    onClose
}) => {
    const {user: authUser} = useCurrentUser()
    const [isLoading, setIsLoading] = useState(false)
    const {register, handleSubmit, watch, setValue, formState:{errors}} = useForm({
        defaultValues:{
            username: currentUser?.username ,
            image: currentUser?.image,
            type: types.filter(type => type.value === currentUser.userType)[0]
        }
      })
      const image = watch('image')
      const userType = watch('type')
      const fileRef = useRef(null)

      const navigate = useNavigate()

      const onSubmit = async (data) => {
        if(!authUser) return null;
        if(authUser?.userType !== "ADMIN") return navigate('/404')
        try{       
            setIsLoading(true);
            if(!data.image){
                await updateDoc(doc(db, 'users', currentUser?.email),{
                    username: data.username,
                    userType: data.type.value
                })
            }else{
                const imageRef = ref(storage, `users/${currentUser?.email}/profile`);
                await uploadString(imageRef, image, 'data_url').then( async (Spanshot) => {
                    const downloadURL = await getDownloadURL(imageRef)
                    await updateDoc(doc(db, 'users', currentUser?.email),{
                        image: downloadURL,
                        username: data.username,
                        userType: data.type.value
                    })
                });
            }
            
            onClose()
            toast.success("Upadated")
        }catch(error){
            console.log(error)
            toast.error("Something went wrong")
        }finally{
            setIsLoading(false)
        }

    } 

    const addProfile = (e) => {
        const reader = new FileReader();
        if(e.target.files[0]){
            reader.readAsDataURL(e.target.files[0])
        }

        reader.onload = (readerEvent) => {
            setValue('image', readerEvent.target.result)
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
                        Profile
                    </h2>
                    <p className='
                    text-sm text-gray-500 mt-1 leading-6
                    '>
                        Edit your public information
                    </p>
                </div>
                <div className='
                mt-10
                space-y-4'>
                    <Input
                    id="username"
                    disabled={isLoading}
                    errors={errors}
                    label="Username"
                    required
                    register={register}
                    />
                    <Select
                    disabled={isLoading}
                    label={"Select user types"}
                    value={userType}
                    options={types}
                    required
                    onChange={(type)=> { setValue('type', type)}}
                    />
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-6 block">
                            Photo
                        </label>
                        <div className="flex items-center gap-x-4">
                            <img
                            className="rounded-full object-cover h-10 w-10"
                            src={image ? image : "/user-placeholder.png"}
                            alt='image'
                            /> 
                            <input type="file" hidden ref={fileRef} onChange={addProfile} />
                            <Button 
                            onClick={()=> fileRef.current.click()} 
                            disable={isLoading}
                            type="button"
                            secondary
                            >
                                Change
                            </Button>
                            
                        </div>
                    </div>

                    <div className="mt-10">
                        <div className="
                        flex items-center justify-end
                        ">
                            <div className="flex items-center gap-x-2">
                                <Button 
                                disable={isLoading}
                                type="button"
                                secondary
                                onClick={onClose}
                                >
                                    Cancel
                                </Button>
                                <Button 
                                disable={isLoading}
                                type="submit"
                                >
                                    Save
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

SettingsModal.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    currentUser: PropTypes.object
}
export default SettingsModal