import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../../firebase";
import Sidebar from "../../components/sidebar/sidebar";
import UsersList from "./components/user-list";
import { collection } from "firebase/firestore";
import { useCurrentUser } from "../../hooks/use-current-user";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Loading from "../../components/ui/loading";

const UsersPage = () => {
    const {user, loading} = useCurrentUser()

    const navigate = useNavigate()

    const [value ] = useCollection(
        collection(db, 'users'),
        {
          snapshotListenOptions: { includeMetadataChanges: true },
        }
    );

    useEffect(()=>{
        if(user.uid && user.userType !== "ADMIN") return navigate('/unauthorized');
    },[ user, navigate])
    

    if(loading) return <Loading large="large" />
    
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
                    <div className="">
                        <UsersList users={value?.docs} />
                    </div>
                </div>
            </div>
        </Sidebar>
     );
}
 
export default UsersPage;