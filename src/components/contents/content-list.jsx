import PropTypes from "prop-types";
import FolderBox from "./folder-box";
import FileBox from "./file-box";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";


const ContentList = ({ folders, files }) => {

  const [searchParams] = useSearchParams()
  const type = searchParams.get('type')
  const [fileItems, setFileItems] = useState(files)
  const isFile = type && type !== "folder";


  useEffect(()=>{
    if(isFile) setFileItems(files?.filter(file => file.type == type))
  },[type, isFile, files])

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
