import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { getStaredFilesByUser } from "../actions/get-stared-files";
import { getStaredFoldersByUser } from "../actions/get-stared-folders";

export const useStaredDocs = () => {

  const user = getAuth().currentUser;

  const [files, setfiles] = useState([]);
  const [folders, setfolders] = useState([]);

  useEffect(() => {
  //   const getData = async (user) => {
  //     return await getExpiredFilesByUser(user, isAdmin);
  //   };
  //   getData(getAuth().currentUser).then((doc) => {
  //     setfiles(doc);
  //   });

    const getFiles = getStaredFilesByUser(user, (updatedData) => {
      // console.log("Updating files:", updatedData);
      setfiles(updatedData);
    });

    const getFolders = getStaredFoldersByUser(user, (updatedData) => {
      // console.log("Updating files:", updatedData);
      setfolders(updatedData);
    });

    return () => {
      if(getAuth().currentUser){
        // getFiles when the component unmounts
        getFiles;
        getFolders;
      }
    }
  
  },[user]);

  
  console.log(files, folders)
  

  return { files, folders };
};
