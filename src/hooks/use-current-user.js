import { db } from "../../firebase";
import { doc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import { getAuth } from "firebase/auth";


export const useCurrentUser = ()=>{

    const [value, loading] = useDocument(doc(db, "users", getAuth().currentUser?.uid), {
      snapshotListenOptions: { includeMetadataChanges: true },
    });
    return {user:{...value?.data(), uid: value?.id},
            loading};
}