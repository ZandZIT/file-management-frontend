import PropTypes from "prop-types";
import FolderBox from "./folder-box";
import FileBox from "./file-box";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../ui/button";


const ContentList = ({ folders, files }) => {

  const [searchParams, setSearchParams] = useSearchParams()
  const type = searchParams.get('type')
  const [fileItems, setFileItems] = useState(files)
  const isFile = type && type !== "folder";

  
  const onClear = () => {
        setSearchParams({})
  }

  useEffect(()=>{
    if(isFile) setFileItems(files?.filter(file => file.type == type))
    else{
      setFileItems(files)
    }
  },[type, isFile, files])

  if(( type && !isFile && !folders.length) || (type && isFile && !fileItems.length)) 
   return (
    <div className="flex flex-col items-center space-y-4 mt-10 ">
      <div className="text-xs text-center text-gray-500">
      No match found
      </div>
      <Button 
      onClick={onClear}
      secondary>
        Remove Filter
      </Button>
    </div>)

  return (
    <div className="space-y-4 px-4 py-2">
      
      <div className="flex flex-col">
      { 
      (!type || !isFile) &&
        folders?.map((folder) => <FolderBox key={folder.id} folder={folder} />)
      }
      { 
      (!type || isFile) &&
        fileItems?.map((file) => <FileBox key={file.id} file={file} />)
      }
      
      </div>
      
    </div>
  );
};

ContentList.propTypes = {
    folders: PropTypes.array,
    files: PropTypes.array

}
export default ContentList;
