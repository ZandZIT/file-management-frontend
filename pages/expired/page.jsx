import Sidebar from "../../src/components/sidebar/sidebar";

import ExpiredFileBox from "../../src/components/contents/expired-file-box";
import { useExpiredFiles } from "../../src/hooks/use-expired-files";

const ExpiredPage = () => {
    const {childFiles} = useExpiredFiles();
    return ( 
        <Sidebar >
            <div className="space-y-4 h-full">
                <div className="flex flex-col  space-y-2">
                    <div className="border-b py-4 px-6">
                        <h4 className="text-lg">Expired</h4>
                    </div>
                    <div className="mt-10">
                        <div className="space-y-4 px-4 py-2">
                        <div className="grid grid-cols-3  text-xs font-medium px-4 gap-x-4 py-2 border-b">
                            <h4>
                            Name
                            </h4>
                            <h4>
                            Expired at
                            </h4>
                            
                        </div>
                            <div className="flex flex-col">
                            { 
                                childFiles.length ? childFiles?.map((file) => <ExpiredFileBox key={file.id} file={file} />)
                                : <div className="text-xs text-center mt-4 ">No File</div>
                            }
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        </Sidebar>
     );
}
 
export default ExpiredPage;