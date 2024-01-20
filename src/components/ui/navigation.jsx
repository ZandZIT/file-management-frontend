import { FileUp, Filter, FolderPlus } from "lucide-react";
import Button from "./button";
import NewFolderModal from "../modal/new-folder-modal";
import { useState } from "react";

import PropTypes from 'prop-types'
import NewFileModal from "../modal/new-file-modal";
import FilterSlider from "../filter-slider";
import { useSearchParams } from "react-router-dom";
import { useReminderFiles } from "../../hooks/use-reminder-files";
import NotificationPopup from "../notification-popup";

const Navigation = ({folder}) => {
    const [newFolderModal, setNewFolderModal] = useState(false)
    const [newFileModal, setNewFileModal] = useState(false)

    const [open, setOpen] = useState(false)
    const onOpen = ()=> setOpen(true)
    const onClose = () => setOpen(false)

    const [searchParams] = useSearchParams()
    const type = searchParams.get('type')

    const {childFiles} = useReminderFiles()

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
                    {/* <button 
                    className="relative w-8 h-8"
                    type='button'
                    onClick={()=>{}}
                    >   <div className='absolute top-0 right-2 z-50  rounded-full h-4 w-4 bg-rose-500 flex items-center justify-center'>
                            <div className='text-white font-semibold text-[10px]'>{childFiles.length}</div>
                        </div>
                        <Bell  size={20} className="text-gray-900 hover:-rotate-45 transition duration-300 ease-in-out" />
                    </button> */}
                    <NotificationPopup  files={childFiles}/>
                    <Button 
                    type='button'
                    secondary
                    onClick={onOpen}
                    active={!!type}
                    >
                        <Filter size={15} className="text-gray-500" />
                        {/* <img src="/image/file-format/filter.png"   className={clsx("h-4 w-4", type ? "text-gray-400 " : "text-gray-900")} /> */}
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