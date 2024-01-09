import PropTypes from "prop-types";
import FolderBox from "./folder-box";
import FileBox from "./file-box";

const ContentList = ({ folders, files }) => {
  return (
    <div className="space-y-4 px-4 py-2">
      <div className="grid grid-cols-4  text-xs font-medium px-4 gap-x-4">
        <h4>
          Name
        </h4>
        <h4>
          Owner
        </h4>
        <h4>
          Created at
        </h4>
         
      </div>
      <div className="flex flex-col border-t ">
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
