import { FileUp, Filter, FolderPlus, Search } from "lucide-react";
import Button from "./button";
import NewFolderModal from "../modal/new-folder-modal";
import { useState } from "react";

import PropTypes from 'prop-types'
import NewFileModal from "../modal/new-file-modal";

const Navigation = ({user, folder}) => {
    const [newFolderModal, setNewFolderModal] = useState(false)
    const [newFileModal, setNewFileModal] = useState(false)



    return ( 
        <>
        <NewFolderModal
        currentFolder={folder}
        user={user}
        isOpen={newFolderModal}
        onClose={()=> setNewFolderModal(false)} />
        <NewFileModal
        currentFolder={folder}
        user={user}
        isOpen={newFileModal}
        onClose={()=> setNewFileModal(false)} />
        <div className="my-4">
            <div className="flex flex-1 items-center justify-between px-4">
                <h4 className=" font-medium">Documents</h4>
                <div className="flex items-center gap-x-4">
                    <div className="sm:flex items-center gap-x-4 hidden">
                    <Button 
                    type='button'
                    secondary
                    onClick={()=>{}}
                    >
                        <Search  size={15} className="text-gray-900" />
                    </Button>
                    <Button 
                    type='button'
                    secondary
                    onClick={()=>{}}
                    >
                        <Filter  size={15} className="text-gray-900" />
                    </Button>
                    </div>
                    <Button 
                    type='button'
                    secondary
                    onClick={()=> setNewFolderModal(true)}
                    >
                        <div className="flex items-center">
                        <FolderPlus  size={15} className="text-gray-900 mr-2" />
                            <p className="text-xs">New Folder</p>
                        </div>
                    </Button>
                    <Button 
                    type='button'
                    
                    onClick={()=> setNewFileModal(true)}
                    >
                        <div className="flex items-center">
                        <FileUp  size={15} className="text-white mr-2" />
                            <p className="text-xs">Upload</p>
                        </div>
                    </Button>
                </div>
            </div>
        </div>
        </>
     );
}
 
Navigation.propTypes = {
    user: PropTypes.object,
    folder: PropTypes.object
}
export default Navigation;