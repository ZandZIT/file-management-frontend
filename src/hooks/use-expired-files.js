import { useEffect, useState } from "react";
import { getExpiredFilesByUser } from "../actions/get-expired-files";
import { getAuth } from "firebase/auth";
import { useAdmin } from "./use-admin";

export const useExpiredFiles = () => {
  const { isAdmin } = useAdmin();
  const user = getAuth().currentUser;

  const [childFiles, setChildFiles] = useState([]);

  useEffect(() => {
  //   const getData = async (user) => {
  //     return await getExpiredFilesByUser(user, isAdmin);
  //   };
  //   getData(getAuth().currentUser).then((doc) => {
  //     setChildFiles(doc);
  //   });

    const unsubscribe = getExpiredFilesByUser(user, isAdmin, (updatedData) => {
      // console.log("Updating files:", updatedData);
      setChildFiles(updatedData);
    });

    return () => {
      if(getAuth().currentUser){
        // Unsubscribe when the component unmounts
        unsubscribe;
      }
    }
  
  },[isAdmin, user]);

  

  

  return { childFiles };
};
