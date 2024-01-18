import Sidebar from "../../src/components/sidebar/sidebar";
import { useCurrentUser } from "../../src/hooks/use-current-user";

import ContentList from "../../src/components/contents/content-list";
import Loading from "../../src/components/ui/loading";
import { useStaredFiles } from "../../src/hooks/use-stared-files";

const StaredPage = () => {

    const {user} = useCurrentUser()

    // const {state, onSet} = useCurrentState()
    // const {folderId} = useParams()
    // const folders = useFolder(folderId, state, true)
    // const {folder, childFolders, childFiles} = folders;

    // console.log(childFiles, childFolders)

    // useEffect(()=>{
    //     if(folder && folderId){
    //         onSet(folder)
    //     }
    // },[folderId, folder, onSet])

    const {files: childFiles, folders: childFolders} = useStaredFiles()
    console.log(childFiles)

    if(!user) return <Loading />

    return ( 
        <Sidebar >
            <div className="space-y-4 h-full">
                <div className="flex flex-col  space-y-2">
                    <div className="border-b py-4 px-6">
                        <h4 className="text-lg">Stared</h4>
                    </div>
                    <div className="mt-10">
                        {/* <Path  folder={folder}/> */}
                        {(childFolders?.length > 0 || childFiles?.length > 0)  && <ContentList folders={childFolders} files={childFiles} />}
                        {childFolders?.length === 0 && childFiles?.length === 0 && <div className="text-center text-xs text-gray-500">There is no items saved</div> }
                    </div>
                </div>
            </div>
        </Sidebar>
     );
}
 
export default StaredPage;