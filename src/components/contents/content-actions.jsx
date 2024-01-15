import { Menu, Transition } from '@headlessui/react'
import clsx from 'clsx'
import {  Download, Eye, MoreVertical, PencilLine, Star, Trash } from 'lucide-react'
import { Fragment, useState, } from 'react'
import PropTypes from 'prop-types'
import UpdateNameModal from '../modal/update-name-modal'
import AlertModal from '../modal/alert-modal'
import toast from 'react-hot-toast'
import { getTotalFilesByUser } from '../../../actions/get-total-files'
import { getDeleteDocById } from '../../../actions/get-delete-doc'
import { getRenameDocById } from '../../../actions/get-rename-doc'
import FilePreviewModal from '../modal/file-preview-modal'

  

export default function ContentActions({current}) {
  const [renameModal, setRenameModal] = useState(false)
  const [alertModal, setAlertModal] = useState(false)
  const [previewModal, setPreviewModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const links = [
    { action: () => setRenameModal(true), label: 'Rename', icon: PencilLine },
    { action: (current) => handleStar(current), label: 'Star', icon: Star },
    { action: ()=>{}, label: 'Download', icon: Download },
    // { action: ()=>{}, label: 'Share', icon: Share },
    { action: ()=> setAlertModal(true), label: 'Delete', icon: Trash },
  ]


  const handleStar = async(data) => {
    if(data?.type){
      await getRenameDocById("files", data);
    
    }else{
      await getRenameDocById("folders", data);
    }
  }

  const onDelete = async()=>{
    if(!current) return null
    try{
        setIsLoading(true)
        if(current?.type){
          await getDeleteDocById("files", current.id).then((doc)=> {
            toast.success("File deleted")
          });
        }else{
          const totalNumberOfFiles = await getTotalFilesByUser(current)
          if(totalNumberOfFiles > 0){
            return toast.error("Delete all the files within the folder")
          }
          await getDeleteDocById("folders", current.id).then((doc)=> {
            toast.success("Folder deleted")
          });
        }
        setAlertModal(false)     
    }catch (error) {
        console.error('Error creating ', error);
        toast.error("Something went wrong");
    }finally{
        setIsLoading(false)
    }
  }


  
  return (
    <>
    <UpdateNameModal
    isFile={current?.size ? true : false}
    data={current}
    isOpen={renameModal}
    onClose={()=> setRenameModal(false)}
    />
    {<FilePreviewModal
    file={current}
    isOpen={previewModal}
    onClose={()=> setPreviewModal(false)}
    />}
    <AlertModal
    disabled={isLoading}
    isOpen={alertModal}
    onAction={onDelete}
    onClose={()=> setAlertModal(false)}
    />
    <div className="absolute right-8 ">
      <div className="flex items-center gap-x-1">
          {current.type && 
          <button  type="button" onClick={()=> setPreviewModal(true)} className="hidden group-hover:md:flex h-8 w-8 items-center justify-center hover:bg-neutral-300/50 rounded-full z-20">
              {<Eye className="h-4 w-4" />}
          </button> }
          <button onClick={()=>handleStar(current)}  className="hidden group-hover:md:flex h-8 w-8 items-center justify-center hover:bg-neutral-300/50 rounded-full z-20">
              {current.star ? <Star className="h-4 w-4 fill-black" /> : <Star className="h-4 w-4 " />}
          </button>
          <button  type="button" onClick={()=> setRenameModal(true)} className="hidden group-hover:md:flex h-8 w-8 items-center justify-center hover:bg-neutral-300/50 rounded-full z-20">
              {<PencilLine className="h-4 w-4" />}
          </button> 
          <button onClick={()=> setAlertModal(true)} className="hidden group-hover:md:flex h-8 w-8 items-center justify-center hover:bg-neutral-300/50 rounded-full z-20">
              {<Trash className="h-4 w-4 text-rose-500" />}
          </button>
      </div>
      <div className="relative block md:hidden">
        <Menu as="div" className=" inline-block text-left">
          <div>
              <Menu.Button className="flex w-8 h-8  items-center justify-center rounded-full hover:bg-gray-300/40  text-sm font-medium text-white  focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900/75">
                  <MoreVertical
                  className=" h-5 w-5 text-gray-500  rounded-full "
                  aria-hidden="true"
                  />
              </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="z-30 absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
              <div className="px-1 py-1 ">
              {links.map(({icon: Icon, action, label }) => (
              <Menu.Item
                  as="a"
                  key={label}
                  className=""
              >
                  <button
                      onClick={() =>action(current)}
                      className={clsx("group font-medium flex w-full items-center rounded-md px-2 py-2 text-xs bg-transparent hover:bg-neutral-200/50 transition",
                      label === "Delete" ? "text-rose-500" : "text-gray-900 ")}
                    >
                      <Icon
                      className={clsx("mr-2 h-4 w-4 ",
                      label === "Delete" ? "text-rose-500" : "text-gray-700 " )}
                      />
                      
                      {label}
                    </button>
              </Menu.Item>
          ))}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
    
    </>
  )
}

ContentActions.propTypes = {
  current: PropTypes.object
}
