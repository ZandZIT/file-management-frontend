import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useAdmin } from "./use-admin";
import { getReminderFilesByUser } from "../../actions/get-reminder-files";

export const useReminderFiles = () => {
  const { isAdmin } = useAdmin();
  const user = getAuth().currentUser;

  const [childFiles, setChildFiles] = useState([]);

  useEffect(() => {
  //   const getData = async (user) => {
  //     return await getReminderFilesByUser(user, isAdmin);
  //   };
  //   getData(getAuth().currentUser).then((doc) => {
  //     setChildFiles(doc);
  //   });

    const unsubscribe = getReminderFilesByUser(user, isAdmin, (updatedData) => {
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
