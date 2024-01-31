import Sidebar from "../../components/sidebar/sidebar";

import ContentList from "../../components/contents/content-list";
import Title from "../../components/ui/title";
import { clsx } from "clsx";
import { useScrollTop } from "../../hooks/use-scroll";
import { useStaredDocs } from "../../hooks/use-stared-docs";

const StaredPage = () => {

    const {files, folders} = useStaredDocs()
    const scrolled = useScrollTop()

    return ( 
        <Sidebar >
            <div className="relative w-full space-y-4 h-full">
                <div className="flex flex-col gap-4">
                    
                    <div className={clsx(" gap-y-4 flex flex-col justify-center fixed top-0 right-0 left-0 sm:left-12 z-50 p-3 bg-white border-b",
                        scrolled && 'border-b shadow-sm')}>
                        <h4 className="text-lg">Stared</h4>
                        <Title />
                    </div>
                    
                    <div className="mt-[86px]">
                        {( folders?.length > 0 || files?.length > 0 )  && <ContentList folders={folders} files={files} />}
                        { (folders?.length === 0 &&  files?.length === 0) && <div className="text-center text-xs text-gray-500 mt-10">There is no items saved</div> }
                    </div>
                </div>
            </div>
        </Sidebar>
     );
}
// {childFolders?.length === 0 && files?.length === 0 && <div className="text-center text-xs text-gray-500">There is no items saved</div> }

export default StaredPage;