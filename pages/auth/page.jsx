import AuthForm from "./components/auth-form";

export default function AuthPage() {
  return (
    <div className="
      min-h-screen
     bg-slate-100
      flex 
      flex-col
      items-center 
      justify-center">
        <div 
        className="
        sm:max-w-md 
        w-full
        mx-auto
        space-y-4
        ">
        <img 
        src={'/logo.png'}
        alt=""
        className="mx-auto h-[100px] w-[100px]"
        />
        <h1 className="text-3xl font-semibold text-center">Sign in to your account</h1>
        </div>
        <AuthForm />
    </div>

  )
}
