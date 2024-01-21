import Sidebar from "../../src/components/sidebar/sidebar";

import ExpiredFileBox from "../../src/components/contents/expired-file-box";
import { useExpiredFiles } from "../../src/hooks/use-expired-files";
import clsx from "clsx";
import { useScrollTop } from "../../src/hooks/use-scroll";

const ExpiredPage = () => {
    const {childFiles} = useExpiredFiles();
    const scrolled = useScrollTop()

    return ( 
        <Sidebar >
            <div className="relative w-full space-y-4 h-full">
                <div className="flex flex-col gap-4">
                    
                    <div className={clsx(" gap-y-4 flex flex-col justify-center fixed top-0 right-0 left-0 sm:left-12 z-50 p-3 bg-white border-b",
                        scrolled && 'border-b shadow-sm')}>
                        <h4 className="text-lg">Expired Files</h4>
                        <div className="grid grid-cols-3  text-xs font-medium px-4 gap-x-4 py-2 ">
                            <h4>
                            Name
                            </h4>
                            <h4>
                            Expired at
                            </h4>
                            
                         </div>
                    </div>
                    
                    <div className="mt-[104px] px-4">
                        { 
                            childFiles.length ? childFiles?.map((file) => <ExpiredFileBox key={file.id} file={file} />)
                            : <div className="text-xs text-center text-gray-500 mt-10 ">No File</div>
                        }
                    </div>
                </div>
            </div>
        </Sidebar>
     );
}

export default ExpiredPage;