import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";


export const getDeleteFolder = async(folder) => {
  try {
    const docRef = doc(db, 'folders', folder.id);
    await deleteDoc(docRef);
    // console.log("File and document deleted successfully");
    return false; // Return false if deletion is successful
  } catch (error) {
    console.error("Error deleting folder:", error);
    return true; // Return true if deletion fails
  }
};