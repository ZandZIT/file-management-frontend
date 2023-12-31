import { useCurrentUser } from "../../hooks/use-current-user";
import Loading from "../ui/loading";
import DesktopSidebar from "./desktop-sidebar"
import PropTypes from 'prop-types';

const Sidebar = ({
    children
  }) => {
    const {user, loading} = useCurrentUser()
    
    if(loading){
      return <Loading />
    }
    
    return (
        <>
        {
          user && 
          <div className="h-full">
            <DesktopSidebar currentUser={user}/>
            <main 
            className="
            sm:pl-12
            h-full
            ">
            {children}
            </main>
          </div>
        }
        </>

    )
  }
Sidebar.propTypes = {
  children: PropTypes.element
}
  
export default Sidebar