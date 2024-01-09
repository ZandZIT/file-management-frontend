import { Route, Routes } from "react-router-dom"
import DashboarPage from "../pages/dashboard/page"
import AuthPage from '../pages/auth/page'
import ToastProvider from "./components/providers/toast-provider"
import { auth } from "../firebase"
import { useAuthState } from 'react-firebase-hooks/auth';
import Loading from "./components/ui/loading"
import UsersPage from "../pages/users/page"
import StaredPage from "../pages/stared/page"
import Unauthorized from "./components/ui/unauthorized"

const App = () => {
  const [user, loading] = useAuthState(auth); 

  if(loading){
    return (
      <Loading large="large" />
    )
  }

  return (
    <div className=" max-h-screen">
      <ToastProvider/>
      {
        !user ? <AuthPage />
        : <>
            <Routes>
                <Route path="/" element={<DashboarPage />} />
                <Route path="/stared" element={<StaredPage />} />
                <Route path="/folders/:folderId" element={<DashboarPage />} />
                <Route path="/users" element={<UsersPage />} /> 
                <Route path="/404" element={<Unauthorized />} /> 
            </Routes>
          </>
      }
    </div>
  )
}

export default App