import { deleteDoc, doc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { deleteObject, ref } from "firebase/storage";


export const getDeleteDocById = async(type, id, filePath, user) => {
  try{
    const fileRef = ref(storage, `/files/${user.uid}/${filePath}`);
    
    await deleteObject(fileRef)
      .then(async() => {
        const docRef = doc(db, type, id);
        return await deleteDoc(docRef);
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.error("Error deleting document:", error);
  }
};