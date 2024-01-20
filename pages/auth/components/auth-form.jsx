
import  {  useState  } from 'react'
import { useForm, } from 'react-hook-form'


import Button from '../../../src/components/ui/button'
import Input from '../../../src/components/inputs/input'
import { auth } from '../../../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'


const AuthForm = () => {

  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState:{
        errors
    }
  } = useForm({
    defaultValues:{
        email: '',
        password: ''
    }
  })

  const onSubmit = async(data) => {
    try{
      setIsLoading(true)
      await signInWithEmailAndPassword(auth, data.email,data. password).then(()=>{
        navigate('/')
      }).catch(()=>{
        toast.error("Invalid credential!")
    })
    }catch(error){
      console.log(error)
      toast.error("Somethong went wrong")
    }finally{
      setIsLoading(false)
    }
  }

//   const socialAction = (action: string) => {
//       signIn(action, {redirect: false})
//       .then(callback => {
//         if(callback?.error) toast.error("Invalid credentials!")
//         if(callback?.ok) {
//           toast.success("Logged in")
//         }
//       })
//   }

  return (
    <div className="mt-4 sm:max-w-md w-full ">
      <div className=" relative bg-white rounded-md shadow px-4 sm:px-6 py-6">
          <form 
          className="space-y-4"
          onSubmit={handleSubmit(onSubmit)}>
           
            <Input 
            disabled={isLoading} 
            id='email' 
            label='Email' 
            required 
            type='email' 
            register={register} 
            errors={errors} />
            <Input 
            disabled={isLoading} 
            id='password' 
            label='Password' 
            required 
            type='password' 
            register={register} 
            errors={errors} />
            <div className='flex items-center justify-end'>
              <Button 
              type="submit">
                Sign in 
              </Button>
            </div>
          </form>
      </div>
    </div>
    
  )
}

export default AuthForm