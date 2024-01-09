import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import { doc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";


export const useCurrentUser = ()=>{
    const [user] = useAuthState(auth);
    const [value, loading] = useDocument(doc(db, "users", user?.email), {
      snapshotListenOptions: { includeMetadataChanges: true },
    });
    return {user:{...value?.data(), uid: value?.id},
            loading};
}