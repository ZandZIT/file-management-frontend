import { LogOut, UserPlus } from "lucide-react";
import { useRoutes } from "../../hooks/use-routes";
import Logo from "../logo";
import Avater from "../ui/avater";
import SidebarItem from "./sidebar-item";
import  { useState } from "react";
import RegisterModal from "../modal/register-modal";
import SettingsModal from "../modal/settings-modal";

import PropTypes from 'prop-types'
import AlertModal from "../modal/alert-modal";
import { getAuth } from "firebase/auth";


const DesktopSidebar = ({
    currentUser
}) => {
    const [registerModal, setRegisterModal] = useState(false)
    const [settingsModal, setSettingsModal] = useState(false)
    const [alertModal, setAlertModal] = useState(false);

    const routes = useRoutes()
    
    const onAction = ()=>{
      if(getAuth().currentUser){
          getAuth().signOut();
      }
    }

    return ( 
    <>
      <RegisterModal
      isOpen={registerModal}
      onClose={()=> setRegisterModal(false)} />
      <SettingsModal
      currentUser={currentUser}
      isOpen={settingsModal}
      onClose={()=> setSettingsModal(false)} />
      <AlertModal
        title={"Sign Out"}
        description={"Are you sure?"}
        onAction={onAction}
        onClose={()=> setAlertModal(false)}
        isOpen={alertModal}
        />
        <div className="
          hidden
          sm:fixed
          sm:inset-y-0
          sm:left-0
          sm:z-40
          sm:w-12
          sm:bg-white
          sm:border-r-[1px]
          sm:flex
          sm:flex-col
          sm:justify-between
          sm:pb-6
          ">
            <nav className="
              flex
              flex-col 
              justify-between
              ">
                <div className="border-b flex items-center justify-center mb-4">
                  <Logo />
                </div>
                <ul role="list"
                className="flex flex-col items-center space-y-1">
                    {
                      routes.map((item)=> {
                        return (currentUser?.userType === "ADMIN" ||
                        item?.allAccess) && (
                            <SidebarItem 
                              key={item.label}
                              count={item.count}
                              label={item.label}
                              active={item?.active}
                              href={item.href}
                              icon={item.icon}
                              />
                        )
                      })
                    }
                    { 
                      currentUser.userType === "ADMIN" &&
                      <SidebarItem    
                      label={"Add member"}
                      icon={UserPlus}
                      onClick={()=> setRegisterModal(true)}
                      />
                    }
                    <SidebarItem    
                      label={"Sign Out"}
                      icon={LogOut}
                      onClick={()=> setAlertModal(true)}
                     />
                </ul>
    
            </nav>
            <nav className="
            mx-auto
            ">
              <div 
              onClick={()=> setSettingsModal(true)}>
                <Avater currentUser={currentUser} />
              </div>
            </nav>
        </div>
    </> );
}

DesktopSidebar.propTypes = {
    currentUser: PropTypes.object
}
 
export default DesktopSidebar;