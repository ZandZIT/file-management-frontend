import PropTypes from "prop-types";
import ContentActions from "./content-actions";
import { Link } from "react-router-dom";
import { format } from "date-fns";

const FolderBox = ({folder}) => {
  return (
    <div className=" group border-b py-2 px-4 cursor-pointer transition-all hover:bg-neutral-200/50">
        <div className="flex items-center justify-between gap-y-2 gap-x-6">
            <Link 
            className="flex-1 w-full grid grid-cols-4 items-center  gap-x-4"
            to={`/folders/${folder.id}`}
            type={'button'}
            >
                <div className="text-xs font-medium  flex items-center">
                    <img src="/image/file-format/folder.png" className="h-5 w-5 mr-2 " />
                    <span className="">{folder.name}</span>
                </div>
                <div className="">
                    <img src={folder?.image ? folder?.image : "/user-placeholder.png"} className="h-8 w-8 rounded-full hover:opacity-70 hover:border hover:shadow-sm shrink-0 object-cover object-center  transition" />
                </div>
                <div className="text-xs text-neutral-500 ">
                    {folder.createdAt && format((folder.createdAt)?.toDate(), "PP")}
                </div>
                
            </Link>
            <ContentActions current={folder}/>            
        </div>
        
    </div>)
};

FolderBox.propTypes = {
  folder: PropTypes.object,
};
export default FolderBox;
// 