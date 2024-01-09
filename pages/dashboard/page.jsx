import { useParams } from "react-router-dom";
import Sidebar from "../../src/components/sidebar/sidebar";
import Navigation from "../../src/components/ui/navigation";
import { useCurrentUser } from "../../src/hooks/use-current-user";
import { useFolder } from "../../src/hooks/use-folder";
import Path from "../../src/components/path";
import EmptyState from "../../src/components/ui/empty-state";
import { useCurrentState } from "../../src/hooks/use-current-state";
import { useEffect } from "react";
import ContentList from "../../src/components/contents/content-list";

const DashboarPage = () => {
    // let value = useLocation();

    // console.log(value)
    const {user} = useCurrentUser()
    console.log(user)
    const {state, onSet} = useCurrentState()
    const {folderId} = useParams()
    const folders = useFolder(folderId, state, false, user?.userType === "ADMIN")
    const {folder, childFolders, childFiles} = folders;


    useEffect(()=>{
        if(folder && folderId){
            onSet(folder)
        }
    },[folderId, folder, onSet])

    // console.log('folders :', folders)
    // console.log('state :', state?.folder)

    

    return ( 
        <Sidebar >
            <div className="space-y-4 h-full">
                <div className="flex flex-col  space-y-2">
                    <Navigation user={user} folder={folder}/>
                    <Path  folder={folder}/>
                    {(childFolders?.length > 0 || childFiles?.length > 0)  && <ContentList folders={childFolders} files={childFiles} />}
                    {childFolders?.length === 0 && childFiles?.length === 0 && <EmptyState user={user} folder={folder} /> }
                </div>
            </div>
        </Sidebar>
     );
}
 
export default DashboarPage;