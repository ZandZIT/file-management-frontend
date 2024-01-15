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
import Title from "../../src/components/ui/title";
import { useScrollTop } from "../../src/hooks/use-scroll";
import clsx from "clsx";

const DashboarPage =() => {

    const {user} = useCurrentUser()
    const {state, onSet} = useCurrentState()
    const {folderId} = useParams()
    
    const {folder, childFolders, childFiles} = useFolder(folderId, state, false, user?.userType === "ADMIN")

    const scrolled = useScrollTop()
    useEffect(()=>{
        if(folder && folderId){
            onSet(folder)
        }
    },[folderId, folder, onSet])

    // if(user.uid) {
    //    const expired = await getAllFilesByUser(user)
    //    console.log(expired)
    // }

    return ( 
        <Sidebar >
            <div className="relative w-full space-y-4 h-full">
                <div className="flex flex-col gap-4">
                    
                    <div className={clsx(" gap-y-4 flex flex-col justify-center fixed top-0 right-0 left-12 z-50 p-3 bg-white border-b",
                        scrolled && 'border-b shadow-sm')}>
                        <Navigation user={user} folder={folder}/>
                        <Path  folder={folder}/>
                        <Title />
                    </div>
                    
                    <div className="mt-36">
                    {(childFolders?.length > 0 || childFiles?.length > 0 )  && <ContentList folders={childFolders} files={childFiles} />}
                    {childFolders?.length === 0 && childFiles?.length === 0 && <EmptyState user={user} folder={folder} /> }
                    </div>
                </div>
            </div>
        </Sidebar>
     );
}
 
export default DashboarPage;