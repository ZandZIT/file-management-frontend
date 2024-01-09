import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import ContentActions from "./content-actions";
import { formatFileSize } from "../../utils";

const iconMap = [
    {
        type: "jpg" ,
        src: '/image/file-format/png.png'
    },
    {
        type:  "png",
        src: '/image/file-format/png.png'
    },
    {
        type:  "jpeg" ,
        src: '/image/file-format/png.png'
    },
    {
        type: "pdf",
        src: '/image/file-format/pdf.png'
    },
    {
        type: "doc",
        src: '/image/file-format/doc.png'
    },
    {
        type: "docx",
        src: '/image/file-format/doc.png'
    },
    {
        type: "ppt",
        src: '/image/file-format/ppt.png'
    },
    {
        type: "xlsx",
        src: '/image/file-format/sheets.png'
    },
    {
        type: "mp4",
        src: '/image/file-format/video.png'
    },

]

const FileBox = ({file}) => {
  const fileFormat = iconMap.find(icon => icon.type === file.name.split('.')[1])
  
  return (
    <div className="group border-b py-2 px-4 cursor-pointer transition-all hover:bg-neutral-200/50">
        <div className="flex items-center justify-between gap-y-2 gap-x-6">
            <Link 
            className="flex-1 w-full grid grid-cols-4 items-center  gap-x-4"
            to={file.downloadURL}
            type={'button'}
            target="_blank"
            >
                <div className="flex flex-col space-y-1 ">
                    <div className="text-xs font-medium flex items-center">
                        <img src={fileFormat?.src} className="h-5 w-5 mr-2 " />
                        <span className="truncate overflow-hidden">{file.name}</span>
                    </div>
                    <div className="text-[10px] ml-7 text-neutral-500">{formatFileSize(file?.size)}</div>
                </div>
                <div className="">
                    <img src={file?.image ? file?.image : "/user-placeholder.png"} className="h-8 w-8 rounded-full hover:opacity-70 hover:border hover:shadow-sm shrink-0 object-cover object-center transition" />
                </div>
                <div className="text-xs text-neutral-500 ">
                    {file.createdAt && format((file.createdAt)?.toDate(), "PP")}
                </div>
                
            </Link>
            <ContentActions current={file}/>
        </div>        
    </div>)
};

FileBox.propTypes = {
  file: PropTypes.object,
};
export default FileBox;
// 