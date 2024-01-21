import { useParams } from "react-router-dom";
import Sidebar from "../../src/components/sidebar/sidebar";
import { useCurrentUser } from "../../src/hooks/use-current-user";
import { useFolder } from "../../src/hooks/use-folder";
import { useCurrentState } from "../../src/hooks/use-current-state";
import { useEffect } from "react";
import ContentList from "../../src/components/contents/content-list";
import Loading from "../../src/components/ui/loading";
import Title from "../../src/components/ui/title";
import { clsx } from "clsx";
import { useScrollTop } from "../../src/hooks/use-scroll";

const StaredPage = () => {

    const {user} = useCurrentUser()

    const {state, onSet} = useCurrentState()
    const {folderId} = useParams()
    const folders = useFolder(folderId, state, true)
    const {folder, childFolders, childFiles} = folders;
    const scrolled = useScrollTop()

    // console.log(childFiles, childFolders)

    useEffect(()=>{
        if(folder && folderId){
            onSet(folder)
        }
    },[folderId, folder, onSet])

    // const {files: childFiles, folders: childFolders} = useStaredFiles()
    // console.log(childFiles)
    
    if(!user) return <Loading />

    return ( 
        <Sidebar >
            <div className="relative w-full space-y-4 h-full">
                <div className="flex flex-col gap-4">
                    
                    <div className={clsx(" gap-y-4 flex flex-col justify-center fixed top-0 right-0 left-0 sm:left-12 z-50 p-3 bg-white border-b",
                        scrolled && 'border-b shadow-sm')}>
                        <h4 className="text-lg">Stared</h4>
                        <Title />
                    </div>
                    
                    <div className="mt-[86px]">
                        {(childFolders?.length > 0 || childFiles?.length > 0 )  && <ContentList folders={childFolders} files={childFiles} />}
                        {childFolders?.length === 0 && childFiles?.length === 0 && <div className="text-center text-xs text-gray-500">There is no items saved</div> }
                    </div>
                </div>
            </div>
        </Sidebar>
     );
}
// {childFolders?.length === 0 && childFiles?.length === 0 && <div className="text-center text-xs text-gray-500">There is no items saved</div> }

export default StaredPage;