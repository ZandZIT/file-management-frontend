import { useState } from "react"
import FileUpload from "./file-upload"
import PropTypes from 'prop-types'

const EmptyState = ({user, folder}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [count, setCount] = useState(0)

  return (
    <div className=" h-[620px] ">
        <div className="flex items-center h-full justify-center"> 
            <div className="bg-slate-100/50 border shadow-sm h-[420px] w-[420px]  rounded-full ">
                <FileUpload user={user} currentFolder={folder}  setCount={setCount} setIsLoading={setIsLoading}/>
            </div>
        </div>
    </div>
  )
}

EmptyState.propTypes = {
  user: PropTypes.object,
  folder: PropTypes.object

}

export default EmptyState