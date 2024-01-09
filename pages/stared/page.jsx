import { useParams } from "react-router-dom";
import Sidebar from "../../src/components/sidebar/sidebar";
import { useCurrentUser } from "../../src/hooks/use-current-user";
import { useFolder } from "../../src/hooks/use-folder";
import Path from "../../src/components/path";
import EmptyState from "../../src/components/ui/empty-state";
import { useCurrentState } from "../../src/hooks/use-current-state";
import { useEffect } from "react";
import ContentList from "../../src/components/contents/content-list";

const StaredPage = () => {
    // let value = useLocation();

    // console.log(value)

    const {state, onSet} = useCurrentState()
    const {folderId} = useParams()
    const folders = useFolder(folderId, state, true)
    const {folder, childFolders, childFiles} = folders;

    const {user} = useCurrentUser()

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
                    <div className="border-b py-4 px-6">
                        <h4 className="text-lg">Stared</h4>
                    </div>
                    <div className="mt-10">
                        <Path  folder={folder}/>
                        {(childFolders?.length > 0 || childFiles?.length > 0)  && <ContentList folders={childFolders} files={childFiles} />}
                        {childFolders?.length === 0 && childFiles?.length === 0 && <EmptyState user={user} folder={folder} /> }
                    </div>
                </div>
            </div>
        </Sidebar>
     );
}
 
export default StaredPage;