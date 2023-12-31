import { FileUp, Filter, FolderPlus, Search } from "lucide-react";
import Button from "./button";

const Header = () => {
    return ( 
        <div className="py-4">
            <div className="flex flex-1 items-center justify-between px-4">
                <h4 className=" font-medium">Documents</h4>
                <div className="flex items-center gap-x-4">
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
                    <Button 
                    type='button'
                    secondary
                    onClick={()=>{}}
                    >
                        <div className="flex items-center">
                        <FolderPlus  size={15} className="text-gray-900 mr-2" />
                            <p className="text-xs">New Folder</p>
                        </div>
                    </Button>
                    <Button 
                    type='button'
                    
                    onClick={()=>{}}
                    >
                        <div className="flex items-center">
                        <FileUp  size={15} className="text-white mr-2" />
                            <p className="text-xs">Upload</p>
                        </div>
                    </Button>
                </div>
            </div>
        </div>
     );
}
 
export default Header;