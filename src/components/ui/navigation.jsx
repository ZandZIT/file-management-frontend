import { FileUp, FolderPlus } from "lucide-react";
import Button from "./button";
import NewFolderModal from "../modal/new-folder-modal";
import { useState } from "react";

import PropTypes from 'prop-types'
import NewFileModal from "../modal/new-file-modal";
import FilterSlider from "../filter-slider";
import { useSearchParams } from "react-router-dom";
import clsx from "clsx";

const Navigation = ({folder}) => {
    const [newFolderModal, setNewFolderModal] = useState(false)
    const [newFileModal, setNewFileModal] = useState(false)

    const [open, setOpen] = useState(false)
    const onOpen = ()=> setOpen(true)
    const onClose = () => setOpen(false)

    const [searchParams] = useSearchParams()
    const type = searchParams.get('type')

    
    return ( 
        <>
        <NewFolderModal
        currentFolder={folder}
        isOpen={newFolderModal}
        onClose={()=> setNewFolderModal(false)} />
        <NewFileModal
        currentFolder={folder}
        isOpen={newFileModal}
        onClose={()=> setNewFileModal(false)} />
        <FilterSlider
        onClose={onClose}
        isOpen={open}
        />
        <div className="">
            <div className="flex flex-1 items-center justify-between sm:px-4">
                <h4 className=" font-medium">Documents</h4>
                <div className="flex items-center gap-x-4">
                    <div className="sm:flex items-center gap-x-4 hidden">
                    {/* <Button 
                    type='button'
                    secondary
                    onClick={()=>{}}
                    >
                        <Search  size={15} className="text-gray-900" />
                    </Button> */}
                    <Button 
                    type='button'
                    secondary
                    onClick={onOpen}
                    active={!!type}
                    >
                        <img src="/image/file-format/filter.png"   className={clsx("h-4 w-4", type ? "text-gray-400 " : "text-gray-900")} />
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
    folder: PropTypes.object
}
export default Navigation;