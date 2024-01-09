import PropTypes from "prop-types";
import FolderBox from "./folder-box";
import FileBox from "./file-box";


const ContentList = ({ folders, files }) => {

  return (
    <div className="space-y-4 px-4 py-2">
      
      <div className="flex flex-col">
      { 
        folders.map((folder) => <FolderBox key={folder.id} folder={folder} />)
      }
      { 
        files.map((file) => <FileBox key={file.id} file={file} />)
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
