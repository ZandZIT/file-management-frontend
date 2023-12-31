import Sidebar from "../../src/components/sidebar/sidebar";
import Header from "../../src/components/ui/header";

const DashboarPage = () => {
    return ( 
        <Sidebar >
            <div className="space-y-4 ">
                <div className="flex flex-col  space-y-4">
                    <Header />
                </div>
            </div>
        </Sidebar>
     );
}
 
export default DashboarPage;