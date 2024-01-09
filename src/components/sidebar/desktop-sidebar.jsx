import { UserPlus } from "lucide-react";
import { useRoutes } from "../../hooks/use-routes";
import Logo from "../logo";
import Avater from "../ui/avater";
import SidebarItem from "./sidebar-item";
import  { useState } from "react";
import RegisterModal from "../modal/register-modal";
import SettingsModal from "../modal/settings-modal";

import PropTypes from 'prop-types'


const DesktopSidebar = ({
    currentUser
}) => {
    const [registerModal, setRegisterModal] = useState(false)
    const [settingsModal, setSettingsModal] = useState(false)

    const routes = useRoutes()
    

    return ( 
    <>
      <RegisterModal
      isOpen={registerModal}
      onClose={()=> setRegisterModal(false)} />
      <SettingsModal
      currentUser={currentUser}
      isOpen={settingsModal}
      onClose={()=> setSettingsModal(false)} />
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
                              label={item.label}
                              active={item?.active}
                              href={item.href}
                              icon={item.icon}
                              onClick={item.onClick}
                              />
                        )
                      })
                    }
                    { 
                      currentUser.type === "ADMIN" &&
                      <SidebarItem    
                      label={"Add member"}
                      icon={UserPlus}
                      onClick={()=> setRegisterModal(true)}
                      />
                    }
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