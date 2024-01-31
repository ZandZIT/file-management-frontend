import { deleteDoc, doc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { deleteObject, ref } from "firebase/storage";


export const getDeleteFile = async(file) => {
  try {
    const fileRef = ref(storage, `files/${file.userId}/${file.path}`);
    await deleteObject(fileRef);

    const docRef = doc(db, 'files', file.id);
    await deleteDoc(docRef);
    // console.log("File and document deleted successfully");
    return false; // Return false if deletion is successful
  } catch (error) {
    console.error("Error deleting file", error);
    return true; // Return true if deletion fails
  }
};