import { useEffect, useState } from "react";
import { useCurrentUser } from "./use-current-user";
import { onSnapshot, orderBy, query, where } from "firebase/firestore";
import { collections } from "../../firebase";
import { getDataWithUserDetail } from "../utils";


export const useStaredFiles = ()=>{
    const { user } = useCurrentUser();
    const [files, setFiles] = useState([]);
    const [folders, setFolders] = useState([]);

    useEffect(() => {
      // Pass a callback to receive the updated data
      const getStaredFiles = () => {
        try {
          const q = query(
            collections.files,
            where("userId", "==", user.uid),
            where("star", "==", true),
            orderBy("createdAt")
          );
          onSnapshot(q, async (snapshot) => {
            const data = await getDataWithUserDetail(snapshot);
            setFiles(data);
            // console.log(data)
          });
        } catch (error) {
          console.error(error);
        }
      };

      if (user.uid && !files.length) {
        getStaredFiles();
      }
    }, [user, files]);

    useEffect(() => {
    // Pass a callback to receive the updated data
    const getStaredFolders = ()=>{
        try{
          const q = query(
            collections.folders,
            where("userId", "==", user.uid),
            where("star", "==", true),
            orderBy("createdAt")
          );
          onSnapshot(q, async (snapshot) => {
            const data = await getDataWithUserDetail(snapshot);
            setFolders(data)            
          });
        } catch (error) {
          console.error(error);
        }
        
    }

    if (user.uid && !folders.length) {
        getStaredFolders();
    }
    }, [user, folders]);

    useEffect(()=>{
        if(files.length) return
    },[files])

    useEffect(() => {
      if (folders.length) return;
    }, [folders]);

    return {files, folders};
}