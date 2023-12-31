import { Route, Routes } from "react-router-dom"
import DashboarPage from "../pages/dashboard/page"
import AuthPage from '../pages/auth/page'
import ToastProvider from "./components/providers/toast-provider"
import { auth } from "../firebase"
import { useAuthState } from 'react-firebase-hooks/auth';
import Loading from "./components/ui/loading"
import UsersPage from "../pages/users/page"

const App = () => {
  const [user, loading] = useAuthState(auth); 

  if(loading){
    return (
      <Loading />
    )
  }

  return (
    <div className=" min-h-screen">
      <ToastProvider/>
      {
        !user ? <AuthPage />
        : <>
            <Routes>
                <Route path="/files" element={<DashboarPage />} />
                <Route path="/users" element={<UsersPage />} />
            </Routes>
          </>
      }
    </div>
  )
}

export default App