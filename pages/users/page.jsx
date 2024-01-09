import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../firebase";
import Sidebar from "../../src/components/sidebar/sidebar";
import UsersList from "./components/user-list";
import { collection } from "firebase/firestore";
import Loading from "../../src/components/ui/loading";

const UsersPage = () => {
    const [value, loading ] = useCollection(
        collection(db, 'users'),
        {
          snapshotListenOptions: { includeMetadataChanges: true },
        }
    );
    
    // if(loading){
    //     return <Loading />
    // }
    return ( 
        <Sidebar>
            <div className="space-y-4 ">
                <div className="flex flex-col  space-y-4">
                    <div className="border-b py-4 px-6">
                        <h4 className="text-lg">All Users</h4>
                    </div>
                    <div className="mt-10">
                        <UsersList users={value?.docs} />
                    </div>
                </div>
            </div>
        </Sidebar>
     );
}
 
export default UsersPage;