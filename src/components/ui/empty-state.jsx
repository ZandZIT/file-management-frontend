import { useState } from "react"
import PropTypes from 'prop-types'
import NewFileModal from "../modal/new-file-modal"

const EmptyState = ({folder}) => {
  const [newFileModal, setNewFileModal] = useState(false)

  return (
    <>
    <NewFileModal
        currentFolder={folder}
        isOpen={newFileModal}
        onClose={()=> setNewFileModal(false)} />
    <div className=" h-[600px] ">
        <div className="flex items-center h-full justify-center"> 
            <button 
            onClick={()=> setNewFileModal(true)}
            className="bg-slate-100/50 border shadow-sm h-[360px] w-[360px] flex flex-col items-center justify-center rounded-full ">
              <img src="/empty-state.jpg" className=" object-cover rounded-full  bg-transparent h-48 w-48" alt="" />
              <p className="text-gray-400 text-xs">Click here to upload a file</p>
            </button>
        </div>
    </div>
    </>
  )
}

EmptyState.propTypes = {
  folder: PropTypes.object

}

export default EmptyState