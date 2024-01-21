import { Popover, Transition } from "@headlessui/react"
import { Bell } from "lucide-react"
import { Fragment } from "react"
import Button from "./ui/button"
import PropTypes from 'prop-types'
import { fileFormat } from "../utils"
import { Link } from "react-router-dom"
import { format } from "date-fns"

const NotificationPopup = ({files}) => {

  return (
    <div className=" w-full max-w-sm relative">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? 'text-white' : 'text-white/90'}
                group inline-flex items-center rounded-md   text-base font-medium hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75`}
            >
                <Button
                secondary>
                    <div className='absolute top-6 right-0 z-50  rounded-full h-5 w-5 bg-rose-500 flex items-center justify-center'>
                        <div className='text-white font-semibold text-[10px]'>{files.length}</div>
                    </div>
                    <Bell  size={16} className="text-gray-500 hover:-rotate-45 transition duration-300 ease-in-out" />
                </Button>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
                <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-full sm:w-96  -translate-x-1/2 transform px-2 sm:px-0 lg:max-w-3xl">
                    <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
                        <div className="bg-gray-50 px-4 py-2 border-b">
                            <div className="py-2 ">
                                <span className="flex items-center">
                                    <span className="text-lg text-gray-900 font-bold ">
                                    Reminder Alert
                                    </span>
                                </span>
                            <span className="block text-xs text-gray-500">
                                Please review and take necessary action
                            </span>
                            </div>
                        </div>
                        <div className="relative  bg-white p-4 overflow-auto h-[240px]">
                            {files.length ? 
                            files?.map((file) => (
                            <div key={file.name} className="group py-2 px-4 rounded-lg cursor-pointer transition-all hover:bg-neutral-200/50">
                                <Link 
                                    className="flex-1 flex  gap-x-4"
                                    to={file.folderId ? `/folders/${file.folderId}` : "/"}
                                    // type={'button'}
                                >
                                    <div>
                                        <img src={file?.image ? file?.image : "/user-placeholder.png"} className="h-8 w-8 rounded-full hover:opacity-70 hover:border hover:shadow-sm shrink-0 object-cover object-center transition" />
                                    </div>
                                    <div className="flex flex-col space-y-1">
                                        <div className="text-xs flex-1 font-medium flex items-center">
                                            <img src={fileFormat(file)?.src} className="h-5 w-5 mr-2" />
                                            <span className="truncate max-w-[250px] text-xs overflow-hidden">{file.name}</span>
                                        </div>
                                        <div className="text-[10px] ml-7 font-semibold text-neutral-700">  
                                            <span className="">Expires at: </span>
                  
                                            {file.expiredAt && format((file.expiredAt)?.toDate(), "PP")}
                                        </div>
                                    </div>
                                </Link>

                            </div>
                        ))
                        : 
                        <div className="">
                            <div className="py-2 ">
                                <span className="flex items-center justify-center">
                                    <span className="text-xs text-gray-900 font-semibold ">
                                    No Reminder Right Now!
                                    </span>
                                </span>
                            <span className="block text-[10px] text-center text-gray-500">
                                You are up to date
                            </span>
                            </div>
                        </div>}
                    </div>
                    
                    </div>
                </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>  )
}

NotificationPopup.propTypes = {
    files: PropTypes.array
}
export default NotificationPopup